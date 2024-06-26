export interface User {
  username: string;
  friends: string[];
  createdOn: string;
  userId: string;
  email: string;
}

export interface UserSearchPayload {
  username: string;
}
