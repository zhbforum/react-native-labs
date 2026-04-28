export type JsonPlaceholderPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type CreatePostPayload = {
  title: string;
  body: string;
  userId: number;
};