import Axios from 'axios'
import { ProductCategory } from '../models/data-model'
import { axios_config } from './auth-api';


const http = Axios.create({
    baseURL: "https:localhost:7062/ProductCategories",
    headers: axios_config.headers
})




export async function GetAll() {
    return await http.get<ProductCategory[]>('/');
}
export async function Get(id: number) {
    return await http.get<ProductCategory>('/' + id);
}

export async function Save(data: ProductCategory) {
    return await http.post<ProductCategory>('/', data);
}

export async function Update(data: ProductCategory) {
    return await http.put<ProductCategory>('/' + data.productCategoryID, data);
}
export async function Delete(id: number) {
    return await http.delete<ProductCategory>('/' + id);
}