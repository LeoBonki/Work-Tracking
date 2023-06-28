
const axios = require('axios');

export const DATA_API = {
	API_URL: "https://localhost:7036/api/WorkTrackingApi/",
	API_PROJECT: "project/",
	API_TASK: "task/",
	API_JOB_POST: "job_post/",
};


/**
 * Function: get request
 * 
 * @param {string} pathApi
 * @returns {object} 
 */
export async function requestGet(pathApi) {
    try {
        const response = await axios.get(`${DATA_API.API_URL}${pathApi}get`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * Funtction post request
 * 
 * @param {string} pathApi 
 * @param {object} arrRequest 
 * @returns {object}
 */
export async function requestPost(pathApi, arrRequest) {
    try {
        const response = await axios.post(`${DATA_API.API_URL}${pathApi}post`, arrRequest);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * 
 * @param {sring} pathApi 
 * @param {object} arrRequest 
 * @returns {object}
 */
export async function requestPut(pathApi, arrRequest) { 
    try {
        const response = await axios.put(`${DATA_API.API_URL}${pathApi}put`, arrRequest);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * Funtction: delete request
 * 
 * @param {string} pathApi 
 * @param {number} index 
 * @returns {object}
 */
export async function requestDelete(pathApi, index) {
    if(!isNumber(index)) return false;

    try {
        const response = await axios.delete(`${DATA_API.API_URL}${pathApi}delete?Index=${index}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * Function: number validation 
 * 
 * @param {any} value 
 * @returns {boolean}
 */
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
