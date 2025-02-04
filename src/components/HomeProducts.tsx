"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import AddToCart2 from "@/components/AddToCart2";
import { useState, useEffect } from "react";

interface Items {
  _id: string;
  name: string;
  price: number;
  slug: string;
  imageURL: string;
  stock: number;
  price_id: string;
}

async function getOurProducts() {
  const query = `*[_type == "product"]{
  _id,
  name,
  price,
  price_id,
  "slug": slug.current,
  "imageURL": image.asset->url,
  stock // Make sure to fetch stock information
}`;
  const items = await client.fetch(query);
  return items;
}

export default function OurProducts() {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getOurProducts();
      setItems(products);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (item: Items) => {
    if (item.stock > 0) {
      // Handle adding in-stock products to the cart
      console.log(`${item.name} has been added to your cart!`);
    } else {
      // Handle out-of-stock products
      console.log(`${item.name} is out of stock.`);
    }
  };

  return (
    <>
      <main className="max-w-screen-2xl mx-auto overflow-x-hidden lg:px-28">
        <h1 className="text-customBlue text-center xl:text-left lg:text-3xl font-bold text-xl sm:text-2xl pb-3 lg:pb-10">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 lg:gap-y-16 px-4 md:px-10 lg:px-0 overflow-hidden">
          {items.map((item) => (
            <div key={item._id} className="group relative">
              <div className="w-full overflow-hidden rounded-md transition-transform duration-200 hover:scale-105">
                <Link href={`/product/${item.slug}`}>
                  <Image
                    src={item.imageURL}
                    alt={item.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover object-center"
                  />
                </Link>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h1 className="text-customTeal pt-2">{item.name}</h1>
                  <p className="text-lg font-medium">${item.price}</p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stock === 0}
                    className={` ${
                      item.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <AddToCart2
                      name={item.name}
                      description={`High-quality ${item.name}`}
                      price={item.price}
                      currency="USD"
                      image={item.imageURL}
                      price_id={item.price_id}
                    />
                  </button>
                  {item.stock === 0 && (
                    <div className="absolute bottom-0 left-0 w-full bg-black text-white text-xs py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Out of Stock
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}