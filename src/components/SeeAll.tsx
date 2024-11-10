import Link from "next/link";
import { simplifiedProduct } from "@/interface";
import { client } from "@/app/lib/sanity";
import Image from "next/image";

async function getData() {
  const query = `*[_type == "seeall"][0...4] | order(_createdAt desc) {
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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          More Products
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {data.map((seeall) => (
            <div key={seeall._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={seeall.imageUrl}
                  alt="Product image"
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/seeall/${seeall.slug}`}>{seeall.name}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {seeall.categoryName}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${seeall.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
