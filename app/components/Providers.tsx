"use client";

import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl="http://https://nutri-edge.vercel.app//stripe/success"
      cancelUrl="http://https://nutri-edge.vercel.app//stripe/error"
      currency = "EGP"
      billingAddressCollection={false}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  );
}
