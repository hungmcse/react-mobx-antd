import {Service} from "typedi";
import {createBrowserHistory, History} from "history";

@Service()
export class HistoryService {
    public readonly history: History = createBrowserHistory();
    public push(path: string, params?: any, query?: URLSearchParams): void {
        if (params) {
            Object.keys(params).forEach((key) => {
                path = path.replace(":" + key, params[key]);
            });

        }
        if (query) {
            path += "?" + query.toString();
        }
        this.history.push("/".concat(path));
    }
}
