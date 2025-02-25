import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";

// Fetch products based on the category
async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"]{
    _id,
    "imageUrl": images[0].asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function CategoryPage({
  params,
}: {
  params?: { category?: string }; // Making params optional to avoid runtime errors
}) {
  // Ensure params exist and category is a valid string
  if (!params?.category) {
    throw new Error("Invalid category parameter");
  }

  const data: simplifiedProduct[] = await getData(params.category);

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products in {params.category}
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <div key={product._id} className="group rounded-lg p-4 border hover:shadow-lg transition">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-90">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 hover:underline">
                  <Link href={`/product/${product.slug}`}>{product.name}</Link>
                </h3>
                <p className="text-xs text-gray-500 mt-1">{product.categoryName}</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">EGP {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
