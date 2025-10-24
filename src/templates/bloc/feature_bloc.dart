import 'package:{{project_name}}/features/{{feature_name}}/repository/{{feature_name}}_repository.dart';
import 'package:{{project_name}}/core/base_bloc/base_bloc.dart';

part '{{feature_name}}_event.dart';
part '{{feature_name}}_state.dart';

class {{feature_class}}Bloc extends BaseBloc<{{feature_class}}Event, {{feature_class}}State> {
  final {{feature_class}}Repository _repo;
  {{feature_class}}Bloc(this._repo) : super({{feature_class}}State.empty()) {
    on<{{feature_class}}Event>(handler((emit, event) {}));
  }
}