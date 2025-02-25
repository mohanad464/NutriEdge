"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";

interface iAppProps {
  images: any;
}

export default function ImageGallery({ images }: iAppProps) {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Small Thumbnail Images */}
      <div className="flex lg:flex-col gap-3">
        {images.map((image: any, idx: any) => (
          <div
            key={idx}
            className={`overflow-hidden rounded-lg bg-gray-100 cursor-pointer transition transform hover:scale-105 ${
              bigImage === image ? "border-2 border-primary" : ""
            }`}
            onClick={() => handleSmallImageClick(image)}
          >
            <Image
              src={urlFor(image).url()}
              width={80}
              height={80}
              alt="photo"
              className="h-20 w-20 md:h-24 md:w-24 object-cover object-center rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Large Main Image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()}
          alt="photo"
          width={600}
          height={600}
          className="h-full w-full object-cover object-center transition-opacity duration-300"
        />
        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold uppercase text-white shadow-md">
          Sale
        </span>
      </div>
    </div>
  );
}
