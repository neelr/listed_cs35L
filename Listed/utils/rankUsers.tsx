import { User } from "../types/userTypes";

type RankedUser = [User, number];

function includesCaseInsensitive(mainString: string, substring: string): boolean {
    let lowerMainString: string = mainString.toLowerCase();
    let lowerSubstring: string = substring.toLowerCase();

    return lowerMainString.includes(lowerSubstring);
}

export function getMutualCount(user1: User, user2: User): number {

    let mutualCount: number = 0;

    const user1Friends = user1.friends;
    const user2Friends = user2.friends;

    for (let i = 0; i < user1Friends.length; i++) {
        for (let j = 0; j < user2Friends.length; j++) {
            if (user1Friends[i] === user2Friends[j]) {
                mutualCount++;
            }
        }
    }

    return mutualCount;
}

export function rankUsers(users: User[] = [], search: string, num: number, user: User | undefined): User[] {
    
    if (user === undefined) {
        return [];
    }

    const rankedUsers: RankedUser[] = [];

    for (let i = 0; i < users.length; i++) {

        if (users[i] === user) {
            continue;
        }

        if (users[i].username !== undefined && includesCaseInsensitive(users[i].username, search)) {
            rankedUsers.push([users[i], getMutualCount(users[i], user)]);
        }

        if (users[i].email !== undefined && includesCaseInsensitive(users[i].email, search)) {
            rankedUsers.push([users[i], getMutualCount(users[i], user)]);
        }
    }

    let sortedUsers: RankedUser[] = rankedUsers.sort((a, b) => b[1] - a[1]);
    let returnList: User[] = [];

    for (let i = 0; i < Math.min(num, sortedUsers.length); i++) {
        returnList.push(sortedUsers[i][0]);
    }
    
    return returnList;
}