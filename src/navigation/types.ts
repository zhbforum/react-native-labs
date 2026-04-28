export type RootTabParamList = {
  News: undefined;
  Gallery: undefined;
  Posts: undefined;
  Register: undefined;
  Auth: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  NewsDetails: {
    newsId: number;
  };
  PhotoViewer: {
    initialIndex: number;
    photoIds?: number[];
  };
};
