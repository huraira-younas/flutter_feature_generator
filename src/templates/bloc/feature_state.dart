part of '{{feature_name}}_bloc.dart';

class {{feature_class}}State extends BaseBlocState {
  const {{feature_class}}State({
    super.loading,
    super.error,
  });

  factory {{feature_class}}State.empty() {
    return const {{feature_class}}State(
      loading: null,
      error: null,
    );
  }

  @override
  {{feature_class}}State copyWith({
    CustomState? loading,
    CustomState? error,
  }) {
    return {{feature_class}}State(
      loading: loading ?? this.loading,
      error: error ?? this.error,
    );
  }

  @override
  List<Object?> get props => [error, loading];
}