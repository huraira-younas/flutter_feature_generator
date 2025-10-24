Bundled templates are grouped into sets: `full`, `api`, `ui`.


Placeholders available:
- {{feature_name}} -> snake_case
- {{FeatureName}} -> PascalCase
- {{featureName}} -> camelCase
- {{project_name}} -> pubspec name or 'project'


You can override templates by setting `flutterFeatureGenerator.templatesSource` to `workspace` and creating `tool/templates` in your workspace with matching structure.