import * as vscode from "vscode";
import * as path from "path";
import {
  replacePlaceholders,
  isDartWorkspace,
  readProjectName,
  ensureCoreFiles,
  collectFiles,
  ensureDir,
} from "./utils";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "flutterFeatureGenerator.generateFeature",
    async (uri: vscode.Uri) => {
      const workspaceFolder = uri
        ? vscode.workspace.getWorkspaceFolder(uri)
        : vscode.workspace.workspaceFolders?.[0];

      if (!workspaceFolder || !(await isDartWorkspace(workspaceFolder))) {
        vscode.window.showErrorMessage(
          "Please use this command inside a Flutter project."
        );
        return;
      }

      await ensureCoreFiles(workspaceFolder, context);
      const featureName = await vscode.window.showInputBox({
        prompt: "Enter the name of the feature (e.g., user_profile)",
        validateInput: (value) => {
          if (!/^[a-z_]+$/.test(value)) {
            return "Please enter a valid snake_case name (e.g., user_profile)";
          }
          return null;
        },
      });

      if (!featureName) {
        return;
      }

      const templateChoice = await vscode.window.showQuickPick(
        ["full", "bloc", "repository", "views"],
        {
          placeHolder: "Select a template for your feature",
        }
      );

      if (!templateChoice) {
        return;
      }

      const templatesToGenerate =
        templateChoice === "full"
          ? ["bloc", "repository", "views", "locator.dart"]
          : [templateChoice, "locator.dart"];

      const config = vscode.workspace.getConfiguration(
        "flutterFeatureGenerator"
      );

      const templatesSource = config.get<string>(
        "templatesSource",
        "extension"
      );

      const openAfter = config.get<boolean>("openGeneratedFiles", true);
      const projectName = await readProjectName(workspaceFolder);

      let templatesRoot: vscode.Uri;
      const workspaceTemplates = vscode.Uri.joinPath(
        workspaceFolder.uri,
        "tool",
        "templates"
      );

      try {
        await vscode.workspace.fs.stat(workspaceTemplates);
        if (templatesSource === "workspace") {
          templatesRoot = workspaceTemplates;
        } else {
          templatesRoot = vscode.Uri.file(
            context.asAbsolutePath("src/templates")
          );
        }
      } catch {
        templatesRoot = vscode.Uri.file(
          context.asAbsolutePath("src/templates")
        );
      }

      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: `Generating ${featureName} (${templateChoice})`,
          cancellable: false,
        },
        async (progress) => {
          progress.report({ message: "Scanning templates..." });
          try {
            const targetRoot = vscode.Uri.joinPath(
              workspaceFolder.uri,
              "lib",
              "features",
              featureName
            );
            await ensureDir(targetRoot);

            for (const template of templatesToGenerate) {
              const templateBaseDir = vscode.Uri.joinPath(
                templatesRoot,
                template
              );
              try {
                await vscode.workspace.fs.stat(templateBaseDir);
              } catch {
                vscode.window.showErrorMessage(
                  `Template not found: ${template}`
                );
                continue;
              }

              const files = await collectFiles(templateBaseDir);

              for (const f of files) {
                const relPath = path.relative(templateBaseDir.fsPath, f.fsPath);
                let outRel = relPath.replace(/feature/g, featureName);
                const outPath = vscode.Uri.joinPath(
                  targetRoot,
                  template.toLowerCase(),
                  outRel
                );

                progress.report({ message: `Creating ${outRel}` });
                await ensureDir(vscode.Uri.joinPath(outPath, ".."));

                let content = await vscode.workspace.fs.readFile(f);
                let contentStr = replacePlaceholders(
                  content.toString(),
                  featureName,
                  projectName
                );

                try {
                  await vscode.workspace.fs.stat(outPath);
                  const backup = vscode.Uri.joinPath(
                    outPath,
                    "../",
                    path.basename(outPath.fsPath) + ".new"
                  );
                  await vscode.workspace.fs.writeFile(
                    backup,
                    Buffer.from(contentStr, "utf8")
                  );
                  vscode.window.showWarningMessage(
                    `File exists: ${outRel} — wrote to ${path.basename(
                      backup.fsPath
                    )}`
                  );
                } catch {
                  await vscode.workspace.fs.writeFile(
                    outPath,
                    Buffer.from(contentStr, "utf8")
                  );
                }
              }
            }

            if (openAfter) {
              const primary = vscode.Uri.joinPath(
                targetRoot,
                "views",
                `${featureName}_screen.dart`
              );
              try {
                await vscode.workspace.fs.stat(primary);
                const doc = await vscode.workspace.openTextDocument(primary);
                await vscode.window.showTextDocument(doc);
              } catch {}
            }

            vscode.window.showInformationMessage(
              `Generated feature: ${featureName}`
            );
          } catch (err: any) {
            vscode.window.showErrorMessage(`Generation failed: ${err.message}`);
            console.error(err);
          }
        }
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
