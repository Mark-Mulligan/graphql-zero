export interface IPost {
  id: string;
  title: string;
  body: string;
}

export interface IComment {
  id: string;
  body: string;
  email: string;
}

export interface IUserOverview {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
}
