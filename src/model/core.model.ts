export enum METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT"
}



export abstract class DTO {
    public abstract paramsDTO: any;
    public abstract bodyDTO: any;
    public abstract readonly url: string;
    public abstract readonly method: METHOD;
    public abstract readonly responseDTOClass: Constructor<any>;
}
