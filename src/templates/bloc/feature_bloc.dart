import 'package:{{project_name}}/utils/base_bloc/base_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part '{{feature_name}}_event.dart';
part '{{feature_name}}_state.dart';

class {{feature_class}}Bloc extends BaseBloc<{{feature_class}}Event, {{feature_class}}State> {
  {{feature_class}}Bloc() : super({{feature_class}}State.empty()) {
    // on<{{feature_class}}Started>(_onStarted);
  }

  // Example handler
  // Future<void> _onStarted({{feature_class}}Started event, Emitter<{{feature_class}}State> emit) async {
  //   _emit(emit, loading: true);
  //   // your logic
  //   _emit(emit);
  // }
}