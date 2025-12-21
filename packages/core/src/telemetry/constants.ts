/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export const SERVICE_NAME = 'agent-cli';

export const EVENT_USER_PROMPT = 'agent-cli.user_prompt';
export const EVENT_TOOL_CALL = 'agent-cli.tool_call';
export const EVENT_API_REQUEST = 'agent-cli.api_request';
export const EVENT_API_ERROR = 'agent-cli.api_error';
export const EVENT_API_CANCEL = 'agent-cli.api_cancel';
export const EVENT_API_RESPONSE = 'agent-cli.api_response';
export const EVENT_CLI_CONFIG = 'agent-cli.config';
export const EVENT_EXTENSION_DISABLE = 'agent-cli.extension_disable';
export const EVENT_EXTENSION_ENABLE = 'agent-cli.extension_enable';
export const EVENT_EXTENSION_INSTALL = 'agent-cli.extension_install';
export const EVENT_EXTENSION_UNINSTALL = 'agent-cli.extension_uninstall';
export const EVENT_FLASH_FALLBACK = 'agent-cli.flash_fallback';
export const EVENT_RIPGREP_FALLBACK = 'agent-cli.ripgrep_fallback';
export const EVENT_NEXT_SPEAKER_CHECK = 'agent-cli.next_speaker_check';
export const EVENT_SLASH_COMMAND = 'agent-cli.slash_command';
export const EVENT_IDE_CONNECTION = 'agent-cli.ide_connection';
export const EVENT_CHAT_COMPRESSION = 'agent-cli.chat_compression';
export const EVENT_INVALID_CHUNK = 'agent-cli.chat.invalid_chunk';
export const EVENT_CONTENT_RETRY = 'agent-cli.chat.content_retry';
export const EVENT_CONTENT_RETRY_FAILURE =
  'agent-cli.chat.content_retry_failure';
export const EVENT_CONVERSATION_FINISHED = 'agent-cli.conversation_finished';
export const EVENT_MALFORMED_JSON_RESPONSE =
  'agent-cli.malformed_json_response';
export const EVENT_FILE_OPERATION = 'agent-cli.file_operation';
export const EVENT_MODEL_SLASH_COMMAND = 'agent-cli.slash_command.model';
export const EVENT_SUBAGENT_EXECUTION = 'agent-cli.subagent_execution';
export const EVENT_AUTH = 'agent-cli.auth';

// Performance Events
export const EVENT_STARTUP_PERFORMANCE = 'agent-cli.startup.performance';
export const EVENT_MEMORY_USAGE = 'agent-cli.memory.usage';
export const EVENT_PERFORMANCE_BASELINE = 'agent-cli.performance.baseline';
export const EVENT_PERFORMANCE_REGRESSION = 'agent-cli.performance.regression';
