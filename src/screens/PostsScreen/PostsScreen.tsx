import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '@screens/PostsScreen/styles';
import { usePostsScreen } from '@screens/PostsScreen/usePostsScreen';

export function PostsScreen() {
  const {
    posts,
    title,
    body,
    isLoading,
    isCreating,
    setTitle,
    setBody,
    loadPosts,
    handleCreatePost,
  } = usePostsScreen();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>REST API</Text>

        <Text style={styles.subtitle}>
          Список постів з JSONPlaceholder API та створення нового поста через
          POST-запит.
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Заголовок поста"
          placeholderTextColor="#9ca3af"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Текст поста"
          placeholderTextColor="#9ca3af"
          value={body}
          onChangeText={setBody}
          multiline
        />

        <TouchableOpacity
          style={[styles.button, isCreating && styles.buttonDisabled]}
          onPress={handleCreatePost}
          disabled={isCreating}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {isCreating ? 'Створення...' : 'Створити пост'}
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          refreshing={isLoading}
          onRefresh={loadPosts}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Пости не знайдено</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postId}>POST #{item.id}</Text>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postBody}>{item.body}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
