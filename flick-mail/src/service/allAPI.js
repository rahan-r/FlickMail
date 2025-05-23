import { commonAPI } from "./API";
import { server_url } from "./SERVER_URL";


export const createMailAPI = async () => {
    return await commonAPI('GET', `${server_url}/create`, "", "");
}; 


export const addUserAPI = async (userData) => {
    return await commonAPI('PUT', `${server_url}/add/user`, userData, "");
};


export const checkUserAPI = async (flickuserId) => {
    return await commonAPI('GET', `${server_url}/user/${flickuserId}`, "", "");
};


export const refreshMailAPI = async (emailData) => {
    try {
        const reqBody = {
            address: emailData.address,
            password: emailData.password
        };
        return await commonAPI('POST', `${server_url}/refresh`, reqBody, "");
    } catch (error) {
        console.error("Error in refreshMailAPI:", error);
        throw error;
    }
};


export const getEmailDetailAPI = async (emailId) => {
    try {
        const jwtToken = localStorage.getItem('flickMailJWT');
        if (!jwtToken) {
            throw new Error('No JWT token found');
        }
         const headers = {
            Authorization: `Bearer ${jwtToken}`
        };
         return await commonAPI('GET', `${server_url}/messages/${emailId}`, "", headers);
    } catch (error) {
        console.error("Error in getEmailDetailAPI:", error);
        throw error;
    }
};