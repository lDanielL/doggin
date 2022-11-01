export interface AuthResponse{
    ok: boolean,
    uid?:string,
    username?:string,
    email?:string,
    msg:string;
    token?:string;
}


export interface Usuario{
    uid:string,
    username:string,
    email: string
    
}