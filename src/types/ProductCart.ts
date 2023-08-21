export default interface ProductCart {
  id: number;
  product_name: string;
  short_description: string;
  description: string;
  image: string;
  price: string;
  company: string;
  quantity?: number;
}
