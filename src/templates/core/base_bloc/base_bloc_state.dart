part of 'base_bloc.dart';

class CustomState extends Equatable {
  final String message;
  final String title;

  const CustomState({required this.message, required this.title});

  @override
  List<Object?> get props => [message, title];
}

abstract class BaseBlocState extends Equatable {
  final CustomState? loading;
  final CustomState? error;

  const BaseBlocState({required this.error, required this.loading});
  BaseBlocState copyWith({CustomState? error, CustomState? loading});

  @override
  List<Object?> get props => [error, loading];
}
