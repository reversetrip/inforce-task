export interface Comment {
  id: number | string;
  productId: number | string;
  description: string;
  date: string;
}

export interface Product {
  id: number | string;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: Comment[] | [];
}
