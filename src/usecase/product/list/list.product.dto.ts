export interface InputFindProductDto {}

type Product = {
    id: string;
    name: string;
    price: number
}

export interface OutputFindProductDto {
    products: Product[];
}

