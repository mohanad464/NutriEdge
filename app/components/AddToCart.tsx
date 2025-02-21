"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";

export interface productCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  price_id: string;
}

export default function AddToCart({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: productCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  };

  return (
    <Button
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        addItem(product), handleCartClick();
      }}
    >
      AddToCart
    </Button>
  );
}
