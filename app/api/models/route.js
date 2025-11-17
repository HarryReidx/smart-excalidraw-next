import { NextResponse } from 'next/server';
import { fetchModels } from '@/lib/llm-client';

/**
 * GET /api/models
 * Fetch available models from the configured provider
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const baseUrl = searchParams.get('baseUrl');
    const apiKey = searchParams.get('apiKey');

    if (!type || !baseUrl) {
      return NextResponse.json(
        { error: 'Missing required parameters: type, baseUrl' },
        { status: 400 }
      );
    }

    // Ollama doesn't require API key
    if (type !== 'ollama' && !apiKey) {
      return NextResponse.json(
        { error: 'Missing required parameter: apiKey' },
        { status: 400 }
      );
    }

    const models = await fetchModels(type, baseUrl, apiKey || '');

    return NextResponse.json({ models });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch models' },
      { status: 500 }
    );
  }
}

