export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  name: string;
  slug: string;
  categoryName: string;
}

export interface fullProduct {
  _id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any;
  price: number;
  name: string;
  slug: string;
  categoryName: string;
  description: string;
  price_id: string;
}
