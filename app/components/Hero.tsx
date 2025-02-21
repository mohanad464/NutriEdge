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
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        {/* Left Text Content */}
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            With NutriEdge, Trust is Our Priority
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            Welcome to NutriEdge, your go-to destination for premium health and
            fitness supplements. We offer a wide range of high-quality products,
            including protein powders, vitamins, pre-workouts, and wellness
            essentials to help you achieve your fitness goals.
          </p>
        </div>

        {/* Right Images Container */}
        <div className="relative flex w-full justify-center lg:w-2/3">
          {/* Background (Larger Image) */}
          <div className="w-2/3 overflow-hidden rounded-lg bg-gray-100 shadow-lg transform scale-100 transition duration-300 hover:scale-105">
            <Image
              src={urlFor(data.image2).url()}
              alt="Hero Image 2"
              layout="responsive"
              width={600}
              height={500}
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </div>

          {/* Foreground (Smaller Image) - Now Positioned Better */}
          <div className="absolute -bottom-10 left-1/2 w-1/3 transform -translate-x-1/2 rounded-lg bg-white shadow-xl p-2">
            <Image
              src={urlFor(data.image1).url()}
              alt="Hero Image 1"
              layout="responsive"
              width={300}
              height={300}
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </div>

      {/* Category Links */}
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
          <Link
            href="/Protein"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200"
          >
            Protein
          </Link>

          <Link
            href="/Creatine"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200"
          >
            Creatine
          </Link>

          <Link
            href="/Accessories"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200"
          >
            Accessories
          </Link>
        </div>
      </div>
    </section>
  );
}

