"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Important from "@/components/ui/important";

const Products = ({ datas }) => {
  const router = useRouter();

  const handleCardClick = (data) => {
    router.push(`/productDetails?data=${encodeURIComponent(JSON.stringify(data))}`);
  };

  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {datas.map((data) => (
        <div
          key={data.id}
          onClick={() => handleCardClick(data)}
          className="relative border border-[#E5E7EB] w-full max-w-[250px] mx-auto h-[413px] px-1 flex flex-col justify-center items-center rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:z-10 bg-white"
        >
          <Image
            src={data.src}
            alt={data.id}
            width={177}
            height={177}
            className="w-[177px] h-[177px] object-contain"
          />
          <Important
            text={data.important2}
            background={data.important2Color}
            size="xsm"
            position={2}
          />
          <Important
            text={data.important1}
            background="red"
            size="xsm"
            position={1}
          />
          <p className="text-[14px] font-medium mt-10 text-center">{data.title}</p>
          <div className="w-full text-center">
            <span className="text-[#DC2626] font-bold text-[22px] mr-1">
              ${data.price}
            </span>
            <span className="font-medium text-base line-through">
              ${data.originalPrice}
            </span>
          </div>
          <div className="flex flex-col gap-1.5 text-center px-2">
            <span className="text-[11px] text-[#9CA3AF]">{data.sideText}</span>
            <div className="w-full h-1.5 bg-gradient-to-r from-[#FFD200] to-[#DC2626]" />
            <span className="text-[12px] text-[#6B7280]">
              Available only:
              <span className="font-bold text-base text-[#030712] ml-1">
                {data.avaliable}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
