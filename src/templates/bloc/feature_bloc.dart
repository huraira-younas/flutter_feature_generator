import 'package:{{project_name}}/utils/base_bloc/base_bloc.dart';

part '{{feature_name}}_event.dart';
part '{{feature_name}}_state.dart';

class {{feature_class}}Bloc extends BaseBloc<{{feature_class}}Event, {{feature_class}}State> {
  {{feature_class}}Bloc() : super({{feature_class}}State.empty()) {
    on<{{feature_class}}Event>(handler((emit, event) {}));
  }
}