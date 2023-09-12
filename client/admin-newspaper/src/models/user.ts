export interface AuthLogin {
  token: string;
}

export interface Login {
  username: string;
  password: string;
}

export type UsersList = List[];

export interface List {
  description: any;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: any;
  last_name: any;
  info: any;
  imageId: any;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  show_posts: boolean;
  edit_posts: boolean;
  delete_posts: boolean;
  access_cms: boolean;
  is_admin: boolean;
  show_users: boolean;
  edit_users: boolean;
  delete_users: boolean;
  createdAt: string;
  updatedAt: string;
}
