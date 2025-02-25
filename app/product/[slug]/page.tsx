import AddToCart from "@/app/components/AddToCart";
import Checkout from "@/app/components/Checkout";
import ImageGallery from "@/app/components/imageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    images,
    price,
    name,
    description,
    "slug": slug.current,
    "categoryName": category->name,
    price_id
  }`;

  const data = await client.fetch(query, { slug });
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Image Gallery */}
          <ImageGallery images={data.images} />

          {/* Right: Product Info */}
          <div className="md:py-8">
            {/* Category & Title */}
            <div className="mb-4">
              <span className="text-gray-500">{data.categoryName}</span>
              <h2 className="text-3xl font-bold text-gray-900">{data.name}</h2>
            </div>

            {/* Ratings */}
            <div className="mb-6 flex items-center gap-3">
              <Button variant="secondary" className="rounded-full flex items-center gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5 text-yellow-500" />
              </Button>
              <span className="text-gray-500">56 Ratings</span>
            </div>

            {/* Pricing */}
            <div className="mb-4 flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-800">EGP {data.price}</span>
              <span className="text-red-500 line-through">EGP {data.price + 30}</span>
            </div>
            <span className="text-sm text-gray-500">Incl. VAT plus shipping</span>

            {/* Delivery Info */}
            <div className="my-6 flex items-center gap-2 text-gray-500">
              <Truck />
              <span className="text-sm">Free Delivery</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <AddToCart
                currency="EGP"
                name={data.name}
                price={data.price}
                description={data.description}
                image={data.images[0]}
                key={data._id}
                price_id={data.price_id}
              />
              <Checkout
                currency="EGP"
                name={data.name}
                price={data.price}
                description={data.description}
                image={data.images[0]}
                key={data._id}
                price_id={data.price_id}
              />
            </div>

            {/* Description */}
            <p className="mt-8 text-gray-500 leading-relaxed">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
