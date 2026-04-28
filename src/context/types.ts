export type UserData = {
  id?: number;
  name: string;
  surname: string;
  email: string;
};

export type AppContextType = {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
};
