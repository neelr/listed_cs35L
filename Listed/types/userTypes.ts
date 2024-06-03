export interface User {
  username: string;
  email: string;
  friends: string[];
  createdOn: string;
  userId: string;
}

export interface UserSearchPayload {
  username: string;
}
