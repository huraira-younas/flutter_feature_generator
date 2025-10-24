# Flutter Feature Generator (VS Code Extension)

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/your-publisher-name.flutter-feature-generator.svg)](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.flutter-feature-generator)

Generate Flutter feature scaffolds (views, bloc, repository, models, widgets) from templates directly inside VS Code.

This extension helps you to create new features in your Flutter project with a predefined structure, saving you time and effort.

## Features

- **Generate Feature Scaffolds**: Quickly create a new feature with all the necessary files and folders, including BLoC, repository, and view.
- **Bundled Templates**: Comes with a set of templates for different feature types (Full, API, UI-only).
- **Customizable Templates**: You can use your own templates by configuring the extension to load them from your workspace.
- **Template Variables**: Use variables like `{{feature_name}}`, `{{FeatureName}}`, `{{featureName}}`, and `{{project_name}}` in your templates to automatically insert the feature name and other details.
- **Quick Pick Menu**: An easy-to-use quick pick menu to select the template type.
- **Progress UI and Logs**: Shows the progress of the feature generation and provides logs for debugging.
- **Configurable**: Configure the extension to fit your needs, such as the templates path and whether to open generated files automatically.

## Usage

1.  Open the command palette by pressing `Ctrl+Shift+P`.
2.  Type "Generate Flutter Feature" and press `Enter`.
3.  Alternatively, you can right-click on a folder in the Explorer and select "Generate Flutter Feature".
4.  Enter the name of the feature you want to create.
5.  Select the template type from the quick pick menu.

## Commands

This extension contributes the following command to the command palette:

- `flutterFeatureGenerator.generateFeature`: Generate Flutter Feature

## Configuration

This extension contributes the following settings:

- `flutterFeatureGenerator.templatesSource`: Where to load templates from. 'extension' loads bundled templates. 'workspace' loads from `<workspace>/tool/templates` if present. (Default: `extension`)
- `flutterFeatureGenerator.openGeneratedFiles`: Automatically open the primary generated screen after creation. (Default: `true`)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.