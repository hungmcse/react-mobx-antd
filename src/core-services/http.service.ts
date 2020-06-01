import {Service} from "typedi";
import {DTO} from "../model/core.model";
import axios from "axios"
import {plainToClass} from "class-transformer";

export interface IRequestOption {
    token?: string
}

export interface IRequestResponse<T extends DTO> {
    data: InstanceType<T["responseDTOClass"]> | InstanceType<T["responseDTOClass"]>[] | undefined ,
    status?: number
}

@Service()
export class HttpService {

    private buildHeader(o: IRequestOption) {
        const headers: Record<string, string> = {};

        headers['content-type'] = "application/json";
        if (o.token) {
            headers.Authorization = "Bearer " + o.token;
        }
        return new Headers(headers)

    }

    public async request<T extends DTO>(dto: T, options?: IRequestOption): Promise<IRequestResponse<T>> {
        const o = {...{token: ""}, ...(options || {})};
        const headers =  this.buildHeader(o);
        try {
           const rs = await axios.request({
                method: dto.method,
                data: dto.bodyDTO,
                params: dto.paramsDTO,
                url: dto.url,
                headers
            });
           return {
                data: plainToClass(dto.responseDTOClass, rs.data),
           }
        } catch (e) {
            // TODO: handle error
            return {
                data: undefined,
            }
        }
    }
}
