export interface Clients {
    uuid: string;
    roomCode: string;
    isHost: string;
}

export interface User {
    id: string;
    userName: string;
    room: string;
    host: string;
    presenter: string;
}