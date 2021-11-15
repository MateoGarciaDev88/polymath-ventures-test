import axios from 'axios';

export class BaseService {

    axiosClient;
    baseAPI;

    constructor(){
        this.initializeConfig();
        this.axiosClient = axios.create();
        this.baseAPI = "https://rickandmortyapi.com/api"
    }

    async initializeConfig() {
        this.configAxios();
    }

    configAxios () {
        this.axiosClient = axios.create({
            baseURL: this.baseAPI
        })
    }
}