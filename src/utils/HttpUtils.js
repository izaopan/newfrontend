import axios from 'axios';

export function queryVehicles(url) {
    return axios.get(url)
}