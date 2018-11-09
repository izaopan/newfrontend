import {queryVehicles} from '../utils/HttpUtils'

export function getVehicles(url) {
    return queryVehicles(url).then(resp => resp.data);
}