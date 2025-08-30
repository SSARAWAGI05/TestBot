const OLLAMA_API_URL = 'http://localhost:8000';

export interface OllamaRequest {
  prompt: string;
  model: string;
  max_tokens: number;
  temperature: number;
}

export interface OllamaResponse {
  model: string;
  prompt: string;
  output: string;
}

export async function sendMessageToOllama(prompt: string): Promise<string> {
  try {
    const requestBody: OllamaRequest = {
      prompt,
      model: 'mistral',
      max_tokens: 0,
      temperature: 0,
    };

    const response = await fetch(`${OLLAMA_API_URL}/generate?timeout=60`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: OllamaResponse = await response.json();
    return data.output || 'No response received from the model.';
  } catch (error) {
    console.error('Error calling Ollama API:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to connect to Ollama: ${error.message}`);
    }
    throw new Error('Unknown error occurred while calling Ollama API');
  }
}

// Function for streaming responses (if your API supports it in the future)
export async function* streamMessageFromOllama(prompt: string): AsyncGenerator<string, void, unknown> {
  // This would need to be implemented if your FastAPI endpoint supports streaming
  // For now, we'll use the regular sendMessageToOllama function
  const response = await sendMessageToOllama(prompt);
  yield response;
}