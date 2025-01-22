import Axios, {  AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import { RegisterModel, LoginModel } from '../models/auth-model';

Axios.defaults.baseURL = 'http://localhost:5138'; 

Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); 

//Axios.interceptors.request.use((config) => {
//  const token = localStorage.getItem('token');
//    if (token) {
//        config.headers.Authorization = `Bearer ${token}`;
//    }
//    return config;
//}); 


const http = Axios.create(
    {
    baseURL: "https:localhost:7062"
    }
)
export async function RegisterApi(data: RegisterModel) {
    return await http.post<RegisterModel>('/Account/Register', data);
}

export async function LoginApi(data: LoginModel): Promise<AxiosResponse < string >> {
    return await http.post<LoginModel, AxiosResponse<string>>('/Account/Login', data);
}
export function AuthProcess(token: string) {

    

}





//export function AuthHeader() {
//    return {
//        Authorization: 'Bearer ' + localStorage.getItem('token')
//    }

//}

//export const Header: any = {

//    headers: {
//        'Content-Type': 'application/json',
//        Authorization: 'Bearer ' + localStorage.getItem('token')
//    }
//}




export const axios_config: AxiosRequestConfig<AxiosHeaders> = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

