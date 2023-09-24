export interface ProductDetailsProps {
  data: {
    title: string;
    category: string;
    sku: number;
    price: number;
    image: string;
    description: string;
  }[];
}
