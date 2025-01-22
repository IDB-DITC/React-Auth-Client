
import * as Yup from 'yup'
import { Product, ProductCategory } from './data-model'




export const CategoryValidation = Yup.object<ProductCategory>().shape({
    productCategoryID: Yup.number().optional(),
    name: Yup.string().required().min(3).max(50),
    products: Yup.array<Product>().default([])
})


