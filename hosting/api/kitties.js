import axios from 'axios'

class KittiesApi {
    constructor() {
        this.apiBase = 'https://asia-northeast1-wrappedkittiesviewer.cloudfunctions.net';
    }
 
    async kitties() {
        return axios.get(`${this.apiBase}/kitties`)
            .then(json => {
                return json.data;
            })
            .catch(e => ({ error: e }));
    }
}
 
const kittiesApi = new KittiesApi();
 
export default kittiesApi;