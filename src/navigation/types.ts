export type RootTabParamList = {
  News: undefined;
  Gallery: undefined;
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
  };
};