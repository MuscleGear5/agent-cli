/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const LLAMA_SERVER_HOST = '70.48.108.127';
const LLAMA_SERVER_PORT = 8888;
const LLAMA_SERVER_URL = `http://${LLAMA_SERVER_HOST}:${LLAMA_SERVER_PORT}`;

/**
 * Check if OPENAI_BASE_URL points to our remote Llama server
 */
export function isRemoteLlamaServer(): boolean {
  const baseUrl = process.env['OPENAI_BASE_URL'];
  if (!baseUrl) return false;
  try {
    const url = new URL(baseUrl);
    return url.hostname === LLAMA_SERVER_HOST;
  } catch {
    return false;
  }
}

export class LlamaServerManager {
  private debugMode: boolean;

  constructor(debugMode?: boolean) {
    this.debugMode = debugMode ?? process.env['DEBUG'] === 'true';
  }

  async ensureServerRunning(): Promise<void> {
    const debugMode = this.debugMode;
    if (debugMode) {
      console.log(
        '[LlamaServerManager] Ensuring Llama server is running with correct context...',
      );
    }

    try {
      // Kill existing server
      await this.executeCommand('ssh remote-pc "pkill llama-server || true"');

      // Start server with 128k context
      const startCommand =
        'ssh remote-pc "cd ~/.llama-cpp && nohup ./build/bin/llama-server -m /mnt/storage/models/Qwen3-Coder-30B-A3B-Instruct-Q4_K_M.gguf -a Qwen3-Coder-30B --host 0.0.0.0 --port 8888 --timeout -1 -t 4 --ctx-size 131072 --jinja > /tmp/llama-server.log 2>&1 &"';
      await this.executeCommand(startCommand);

      if (debugMode) {
        console.log(
          '[LlamaServerManager] Llama server restarted with 131072 context.',
        );
      }

      // Wait for the server to be ready
      if (debugMode) {
        console.log('[LlamaServerManager] Waiting for model to load...');
      }
      await this.waitForServerReady();

      if (debugMode) {
        console.log('[LlamaServerManager] Llama server is ready!');
      }
    } catch (error) {
      console.error(
        '[LlamaServerManager] Failed to restart Llama server:',
        error,
      );
    }
  }

  private async waitForServerReady(
    maxRetries = 60,
    delayMs = 2000,
  ): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const { stdout } = await this.executeCommand(
          `curl -s ${LLAMA_SERVER_URL}/health`,
        );
        const response = JSON.parse(stdout);
        if (response.status === 'ok' || response.status === 'loading model') {
          // Adjust based on actual health endpoint response
          // Ideally check /v1/models or similar to ensure model is actually loaded
          const { stdout: modelsOutput } = await this.executeCommand(
            `curl -s ${LLAMA_SERVER_URL}/v1/models`,
          );
          const models = JSON.parse(modelsOutput);
          if (models.data && models.data.length > 0) {
            return;
          }
        }
      } catch (_e) {
        // Ignore connection errors during startup
      }
      if (this.debugMode) {
        process.stdout.write('.');
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
    throw new Error('Timeout waiting for Llama server to become ready');
  }

  private async executeCommand(
    command: string,
  ): Promise<{ stdout: string; stderr: string }> {
    return execAsync(command);
  }
}
