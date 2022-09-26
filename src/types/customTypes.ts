export interface IPost {
  id: string;
  title: string;
  body: string;
}

export interface IComment {
  body: string;
  email: string;
}

export interface IUserOverview {
  id: string;
  name: string;
}
