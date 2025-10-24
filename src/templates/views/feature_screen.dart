import 'package:{{project_name}}/common/widgets/custom_label_widget.dart';
import 'package:flutter/material.dart';

class {{feature_class}}Screen extends StatelessWidget {
  const {{feature_class}}Screen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: CustomLabelWidget(
          text: "{{feature_class}} is in development",
          icon: Icons.work_outline_outlined,
          title: "In Development",
        ),
      ),
    );
  }
}
