import * as vscode from "vscode";
import * as path from "path";

export async function isDartWorkspace(
  folder: vscode.WorkspaceFolder
): Promise<boolean> {
  try {
    const pubspecUri = vscode.Uri.joinPath(folder.uri, "pubspec.yaml");
    await vscode.workspace.fs.stat(pubspecUri);
    return true;
  } catch {
    return false;
  }
}

export async function readProjectName(
  folder: vscode.WorkspaceFolder
): Promise<string> {
  try {
    const pubspecUri = vscode.Uri.joinPath(folder.uri, "pubspec.yaml");
    const content = await vscode.workspace.fs.readFile(pubspecUri);
    const pubspec = content.toString();
    const match = /^name:\s*(.*)/m.exec(pubspec);
    if (match) {
      return match[1].trim();
    }
  } catch (e) {
    console.error(e);
  }
  return "flutter_project";
}

export async function collectFiles(dir: vscode.Uri): Promise<vscode.Uri[]> {
  const files: vscode.Uri[] = [];
  const entries = await vscode.workspace.fs.readDirectory(dir);
  for (const [name, type] of entries) {
    const entryUri = vscode.Uri.joinPath(dir, name);
    if (type === vscode.FileType.File) {
      files.push(entryUri);
    } else if (type === vscode.FileType.Directory) {
      files.push(...(await collectFiles(entryUri)));
    }
  }
  return files;
}

export async function ensureDir(dir: vscode.Uri): Promise<void> {
  try {
    await vscode.workspace.fs.stat(dir);
  } catch {
    const parent = vscode.Uri.joinPath(dir, "..");
    await ensureDir(parent);
    await vscode.workspace.fs.createDirectory(dir);
  }
}

function toPascalCase(str: string): string {
  return str
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function replacePlaceholders(
  content: string,
  featureName: string,
  projectName: string
): string {
  const featureClassName = toPascalCase(featureName);
  return content
    .replace(/{{feature_class}}/g, featureClassName)
    .replace(/{{feature_name}}/g, featureName)
    .replace(/{{project_name}}/g, projectName);
}

export async function ensureCoreFiles(
  workspaceFolder: vscode.WorkspaceFolder,
  context: vscode.ExtensionContext
): Promise<void> {
  const coreDir = vscode.Uri.joinPath(workspaceFolder.uri, "lib", "core");

  try {
    await vscode.workspace.fs.stat(coreDir);
  } catch {
    await ensureDir(coreDir);
  }

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "Setting up core files",
      cancellable: false,
    },
    async (progress) => {
      progress.report({ message: "Creating core directory..." });

      const templateCoreDir = vscode.Uri.file(
        context.asAbsolutePath("src/templates/core")
      );
      const files = await collectFiles(templateCoreDir);
      const projectName = await readProjectName(workspaceFolder);

      for (const file of files) {
        const relPath = path.relative(templateCoreDir.fsPath, file.fsPath);
        const outPath = vscode.Uri.joinPath(coreDir, relPath);

        progress.report({ message: `Creating ${relPath}` });
        await ensureDir(vscode.Uri.joinPath(outPath, ".."));

        const content = await vscode.workspace.fs.readFile(file);
        let contentStr = replacePlaceholders(
          content.toString(),
          "core",
          projectName
        );

        await vscode.workspace.fs.writeFile(
          outPath,
          Buffer.from(contentStr, "utf8")
        );
      }
    }
  );
}
