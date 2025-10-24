part of '{{feature_name}}_bloc.dart';

sealed class {{feature_class}}Event extends BaseBlocEvent {
  const {{feature_class}}Event({
    required super.name,
    super.onSuccess,
    super.onError,
  });

  @override
  List<Object?> get props => [name];
}