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

export interface DrawLine {
    currentPoint: CoOrdinates;
    previousPoint: CoOrdinates | null;
    lineColor: string;
    selectedLineWidth: number;
}

export interface CoOrdinates {
    x: number;
    y: number;
}