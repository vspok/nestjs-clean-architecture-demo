export interface IJwtServicePayload {
    id: number;
    email: string;
    name: string;
}

export abstract class IJwtService {
    abstract checkToken(
        token: string,
        secret: string,
    ): Promise<IJwtServicePayload>;
    abstract createToken(
        payload: IJwtServicePayload,
        secret: string,
        expiresIn: string,
    ): string;
}
