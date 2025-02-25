import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

async function getData() {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc){
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Newest() {
  const data: simplifiedProduct[] = await getData();

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest Products
          </h2>
          <Link
            className="text-primary flex items-center gap-x-2 font-medium hover:underline hover:text-primary-dark transition duration-200"
            href="/all"
          >
            See All
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug}`}
              className="group block rounded-lg p-4 border hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-md font-semibold text-gray-800 group-hover:underline">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{product.categoryName}</p>
                <p className="mt-2 text-lg font-bold text-gray-900">EGP {product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA Button */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/all"
            className="inline-block px-6 py-2 text-white bg-primary rounded-lg font-medium hover:bg-primary-dark transition duration-300"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
