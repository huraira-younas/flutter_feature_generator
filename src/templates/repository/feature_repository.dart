import '{{feature_name}}_interface.dart';
import '{{feature_name}}_client.dart';

class {{feature_class}}Repository implements {{feature_class}}Interface {
  final _client = {{feature_class}}Client();

  {{feature_class}}Repository({required this.client});

  // TODO: Implement repository methods
}
