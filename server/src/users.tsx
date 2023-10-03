import { User } from "./types";

const users: User[] = [];

const userJoin = (id: string, userName: string, room: string, host: string, presenter: string) => {
    const user = {id, userName, room, host, presenter};

    users.push(user);
    return user;
}

const userLeave = (id: string) => {
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex !== -1) {
        return users.splice(userIndex, 1)[0];
    }
}

const getUsers = (room: string) => {
    const RoomUsers: User[] = [];
    users.map((user) => {
      if (user.room == room) {
        RoomUsers.push(user);
      }
    });
  
    return RoomUsers;
};

export {
    userJoin,
    userLeave,
    getUsers
};