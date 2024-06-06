import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUserTasksById, getUserFriendsById } from "../api/api";
import { ApiError } from "../types/authTypes";
import { Task } from "../types/taskTypes";
import { User } from "../types/userTypes";

export const useUserTasksById = (userId: string, options?: UseQueryOptions<Task[], ApiError>) => {
  return useQuery<Task[], ApiError>({
    queryKey: ['userTasks', userId],
    queryFn: () => getUserTasksById(userId),
    ...options,
  });
};

export const useUserFriendsById = (userId: string, options?: UseQueryOptions<User[], ApiError>) => {
  return useQuery<User[], ApiError>({
    queryKey: ['userFriends', userId],
    queryFn: () => getUserFriendsById(userId),
    ...options,
  });
};


// If youre reading this its currenlty 5:39am and this is my sad attempt at hooks. im going to bed now, ive been defeated...   :((