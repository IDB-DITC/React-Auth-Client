export class ProductCategory {

    productCategoryID!: number;
    name!: string;
    products: Product[] = [];
}

export class Product {
    productId!: number;
    name!: string;
    productNumber!: string;
    color?: string;
    listPrice!: number;
    standardCost!: number;
    size!: ProductSize;
    weight!: number;
    productCategoryID!: number;
    productCategory!: ProductCategory;
}



export enum ProductSize {
    Small = 1,
    Medium = 2,
    Large = 3
}