export interface Order {
  id: string;
  date: string;
  description: string;
  title: string;
  products: Product[];
}

export interface Product {
  id: string;
  date: string;
  guarantee: ProductGuarantee;
  isNew: number;
  order: number;
  photo: string;
  serialNumber: number;
  specification: string;
  title: string;
  type: string;
  price: ProductPrice[];
}

export interface ProductPrice {
  isDefault: number;
  symbol: string;
  value: number;
}

export interface ProductGuarantee {
  start: string;
  end: string;
}
