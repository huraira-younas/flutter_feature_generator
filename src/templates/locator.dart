import 'repository/{{feature_name}}_repository.dart';
import 'bloc/{{feature_name}}_bloc.dart';
import 'package:get_it/get_it.dart';

void setup{{feature_class}}Locator() {
  final GetIt di = GetIt.instance;

  if (!di.isRegistered<{{feature_class}}Repository>()) {
    di.registerLazySingleton(() => {{feature_class}}Repository());
  }

  if (!di.isRegistered<{{feature_class}}Bloc>()) {
    di.registerLazySingleton(() => {{feature_class}}Bloc(di<{{feature_class}}Repository>()));
  }
}
