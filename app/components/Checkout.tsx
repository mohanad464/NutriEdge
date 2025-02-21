"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { productCart } from "./AddToCart";

export default function Checkout({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: productCart) {
  const { checkoutSingleItem } = useShoppingCart();

function buyNow(price_id: string) {
    checkoutSingleItem(price_id);
}

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  };

  return (
    <Button variant={"secondary"}
      onClick={() => {
        buyNow(product.price_id);
      }}
    >
      Buy Now
    </Button>
  );
}
