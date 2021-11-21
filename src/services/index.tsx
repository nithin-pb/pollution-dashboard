import axios from 'axios'
import {IEndPointGetLocations, IEndPointGetPollutionData} from "../interfaces";

const BAST_URL = 'https://docs.openaq.org'
const API_VERSION = 'v2'


function makeApiUrl(endUri: string) {
    return `${BAST_URL}/${API_VERSION}/${endUri}`
}


const apiEndPoints = {
    pollutionData() {
        return {
            getLocations: (params: IEndPointGetLocations) => axios.get(makeApiUrl('cities'), {params}),
            getPollutionData: (params: IEndPointGetPollutionData) => axios.get(makeApiUrl('measurements'), {params}),
        }
    }
}

export default apiEndPoints