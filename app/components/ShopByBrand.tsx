import Image from "next/image";
import Link from "next/link";

const brands = [
  { name: "Red Rex", src: "/redrex.jpg" },
  { name: "Muscletech", src: "/muscletech.png" },
  { name: "JNX Sports", src: "/jnx.webp" },
  { name: "Limitless Naturals", src: "/limit.png" },
  { name: "Optimum Nutrition", src: "/on.png" },
];

export default function ShopByBrand() {
  return (
    <section className="py-10 bg-white text-center">
      <h2 className="text-2xl font-bold">SHOP BY BRAND</h2>
      <div className="h-1 w-10 bg-primary mx-auto my-2"></div>

      <div className="flex justify-center gap-12 flex-wrap mt-4">
        {brands.map((brand, index) => (
          <Link 
            key={index} 
            href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`} 
            className="w-[180px] h-[80px] flex items-center justify-center transition-transform transform hover:scale-105"
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={180}
              height={80}
              quality={100}
              priority
              className="object-contain"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
