import {Service} from "typedi";
import {DTO} from "../model/core.model";
import axios from "axios"
import {plainToClass} from "class-transformer";

export interface IRequestOption {
    token?: string
}

export interface IRequestResponse<T extends DTO> {
    data: InstanceType<T["responseDTOClass"]> | undefined,
    status?: number
}

@Service()
export class HttpService {

    private async buildHeader(o: IRequestOption) {
        const headers: Record<string, string> = {};
        if (o.token) {
            headers.Authorization = "Bearer " + o.token;
        }
        return {
            headers: new Headers(headers)
        }
    }

    public async request<T extends DTO>(dto: T, options?: IRequestOption): Promise<IRequestResponse<T>> {
        const o = {...{token: ""}, ...(options || {})};
        const headers = await this.buildHeader(o);
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
            return {
                data: undefined,
                status: e.response.status
            }
        }
    }
}
