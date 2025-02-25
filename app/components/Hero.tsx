import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'heroImages'][0]";
  const data = await client.fetch(query);
  return data;
}

export default async function Hero() {
  const data = await getData();

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-12">
      <div className="flex flex-wrap items-center justify-between py-10 lg:py-20">
        {/* Left Text Content */}
        <div className="w-full lg:w-1/3 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            With NutriEdge, <br />
            <span className="text-primary">Trust is Our Priority</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your go-to destination for premium health and fitness supplements.
            We offer a wide range of top-quality protein powders, vitamins,
            pre-workouts, and more to help you reach your goals.
          </p>
        </div>

        {/* Right Images */}
        <div className="relative flex w-full lg:w-2/3 justify-center">
          {/* Background (Main Image) */}
          <div className="relative w-3/4 lg:w-2/3 rounded-lg overflow-hidden shadow-xl transform transition duration-300 hover:scale-105">
            <Image
              src={urlFor(data.image2).url()}
              alt="Hero Image 2"
              width={600}
              height={500}
              className="rounded-lg object-cover"
              priority
            />
          </div>

          {/* Foreground (Smaller Image) */}
          <div className="absolute -bottom-10 left-1/2 w-40 md:w-48 lg:w-56 transform -translate-x-1/2 rounded-lg shadow-lg bg-white p-2">
            <Image
              src={urlFor(data.image1).url()}
              alt="Hero Image 1"
              width={250}
              height={250}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Category Links */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
        {[
          { name: "Protein", href: "/Protein" },
          { name: "Creatine", href: "/Creatine" },
          { name: "Accessories", href: "/Accessories" },
        ].map((category, idx) => (
          <Link
            key={idx}
            href={category.href}
            className="px-6 py-3 text-lg font-semibold text-gray-700 bg-white border rounded-lg shadow-md transition duration-200 hover:bg-gray-100 hover:scale-105"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
