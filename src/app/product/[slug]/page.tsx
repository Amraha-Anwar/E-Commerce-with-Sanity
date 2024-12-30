import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";

interface ImageAsset {
  asset: {
    _ref: string;
    _type: string;
  };
}

interface Data {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: ImageAsset;
  slug: string;
}

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
  _id,
    name,
    price,
    description,
    image,
    "slug":slug.current,
}`;
  const data = await client.fetch(query);
  return data;
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: Data = await getData(params.slug);
  if (!data) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto overflow-x-hidden px-5 sm:px-10 md:px-10 lg:px-28 py-20">
      <div
        className="flex flex-col md:flex-row justify-between gap-20 md:gap-10 xl:gap-20"
        key={data._id}
      >
        <div className="md:w-[50%]">
          <Image
            src={urlFor(data.image).url()}
            alt={data.name}
            width={800}
            height={800}
          />
        </div>
        <div className="md:w-[50%]">
          <h1 className="text-customBlue text-3xl sm:text-5xl md:text-4xl xl:text-7xl font-bold -mt-10 md:-mt-0">
            {data.name}
          </h1>
          <p className="bg-customTeal text-white font-semibold lg:text-xl w-[50%] sm:w-[40%] md:w-[40%] flex justify-center py-2 my-10 md:my-5 lg:my-10 rounded-full">
            ${data.price}.00 USD
          </p>
          <hr />
          <h2 className="my-10 md:my-5 lg:my-10 text-gray-600 font-medium">
            {data.description}
          </h2>
          <button className="flex items-center justify-center bg-customTeal rounded-md px-4 py-4 md:px-2 md:py-2 lg:px-4 lg:py-4 gap-2 text-white font-medium md:font-normal lg:font-medium">
            <BsCart3 className="font-bold w-5 h-5" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}