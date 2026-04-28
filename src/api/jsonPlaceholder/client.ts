import type {
  CreatePostPayload,
  JsonPlaceholderPost,
} from '@api/jsonPlaceholder/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown network error';
}

export async function getPosts(): Promise<JsonPlaceholderPost[]> {
  try {
    const response = await fetch(`${BASE_URL}/posts`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${getErrorMessage(error)}`);
  }
}

export async function createPost(
  payload: CreatePostPayload,
): Promise<JsonPlaceholderPost> {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to create post: ${getErrorMessage(error)}`);
  }
}
