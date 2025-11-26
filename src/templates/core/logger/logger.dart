import 'package:flutter/foundation.dart' show kDebugMode;
import 'dart:convert' show JsonEncoder;
import 'dart:developer' show log;

enum LogLevel { info, debug, warn, error, success, trace }

class Logger {
  static bool isEnabled = kDebugMode;
  static bool showTimestamp = true;

  static void success({
    required dynamic message,
    StackTrace? stackTrace,
    required String tag,
  }) => _logWithLevel(stackTrace, message, LogLevel.success, tag);

  static void debug({
    required dynamic message,
    StackTrace? stackTrace,
    required String tag,
  }) => _logWithLevel(stackTrace, message, LogLevel.debug, tag);

  static void error({
    required dynamic message,
    StackTrace? stackTrace,
    required String tag,
  }) => _logWithLevel(stackTrace, message, LogLevel.error, tag);

  static void trace({
    required dynamic message,
    StackTrace? stackTrace,
    required String tag,
  }) => _logWithLevel(stackTrace, message, LogLevel.trace, tag);

  static void info({
    required dynamic message,
    StackTrace? stackTrace,
    required String tag,
  }) => _logWithLevel(stackTrace, message, LogLevel.info, tag);

  static void warn({
    required dynamic message,
    StackTrace? stackTrace,
    required String tag,
  }) => _logWithLevel(stackTrace, message, LogLevel.warn, tag);

  static void _logWithLevel(
    StackTrace? stackTrace,
    dynamic message,
    LogLevel level,
    String tag,
  ) => _log(level: level, message: message, tag: tag, stackTrace: stackTrace);

  static String _formatPadding(int message) {
    return message.toString().padLeft(2, '0');
  }

  static void _log({
    required dynamic message,
    required LogLevel level,
    StackTrace? stackTrace,
    required String tag,
  }) {
    if (!isEnabled) return;

    final now = DateTime.now();
    final timestamp = showTimestamp
        ? '(${_formatPadding(now.hour)}:${_formatPadding(now.minute)}:${_formatPadding(now.second)}) '
        : '';

    final formattedMessage = _formatMessage(message);
    final levelTag = _getLevelTag(level);
    final emoji = _getEmoji(level);
    final color = _getColor(level);

    final fullText = '[${tag.toUpperCase()}] $formattedMessage';
    log(
      '$color$levelTag $timestamp$emoji $fullText\x1B[0m',
      stackTrace: stackTrace,
    );
  }

  static String _formatMessage(dynamic message) {
    if (message is Map || message is List) {
      const encoder = JsonEncoder.withIndent('  ');
      return encoder.convert(message);
    }

    return message.toString();
  }

  static String _getLevelTag(LogLevel level) {
    switch (level) {
      case LogLevel.info:
        return '[INFO]   ';
      case LogLevel.debug:
        return '[DEBUG]  ';
      case LogLevel.warn:
        return '[WARN]   ';
      case LogLevel.error:
        return '[ERROR]  ';
      case LogLevel.success:
        return '[SUCCESS]';
      case LogLevel.trace:
        return '[TRACE]  ';
    }
  }

  static String _getEmoji(LogLevel level) {
    switch (level) {
      case LogLevel.info:
        return 'ℹ️';
      case LogLevel.debug:
        return '🐛';
      case LogLevel.warn:
        return '⚠️';
      case LogLevel.error:
        return '❌';
      case LogLevel.success:
        return '✅';
      case LogLevel.trace:
        return '📍';
    }
  }

  static String _getColor(LogLevel level) {
    switch (level) {
      case LogLevel.debug:
        return '\x1B[34m';
      case LogLevel.success:
        return '\x1B[32m';
      case LogLevel.warn:
        return '\x1B[33m';
      case LogLevel.error:
        return '\x1B[31m';
      case LogLevel.info:
        return '\x1B[36m';
      case LogLevel.trace:
        return '\x1B[35m';
    }
  }
}
