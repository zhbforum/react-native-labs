import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { createPost, getPosts } from '@api/jsonPlaceholder/client';
import type { JsonPlaceholderPost } from '@api/jsonPlaceholder/types';

export function usePostsScreen() {
  const [posts, setPosts] = useState<JsonPlaceholderPost[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  async function loadPosts() {
    try {
      setIsLoading(true);

      const loadedPosts = await getPosts();

      setPosts(loadedPosts);
    } catch (error) {
      console.error('loadPosts failed:', error);
      Alert.alert('Помилка', 'Не вдалося завантажити пости');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreatePost() {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
      Alert.alert('Помилка', 'Заповніть заголовок та текст поста');
      return;
    }

    try {
      setIsCreating(true);

      const createdPost = await createPost({
        title: trimmedTitle,
        body: trimmedBody,
        userId: 1,
      });

      setPosts((currentPosts) => [createdPost, ...currentPosts]);

      setTitle('');
      setBody('');

      Alert.alert('Успішно', 'Пост було створено через POST-запит');
    } catch (error) {
      console.error('handleCreatePost failed:', error);
      Alert.alert('Помилка', 'Не вдалося створити пост');
    } finally {
      setIsCreating(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return {
    posts,
    title,
    body,
    isLoading,
    isCreating,
    setTitle,
    setBody,
    loadPosts,
    handleCreatePost,
  };
}
