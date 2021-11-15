import { BaseService } from "./baseApi";

export class CharactersService extends BaseService {
    async getAllCharacters () {
        try {
            const { data } = await this.axiosClient.get(`${this.baseAPI}/character`);
            return data;
        } catch (error) {
            throw new Error(`An unhandled exception in getAllCharacters with stack: ${error}`);
        }
    }

    async getCharactersById (id) {
        try {
            const { data } = await this.axiosClient.get(`${this.baseAPI}/character/${id}`);
            return data;
        } catch (error) {
            throw new Error(`An unhandled exception in getCharactersById with stack: ${error}`);
        }
    }
}

export default new CharactersService();