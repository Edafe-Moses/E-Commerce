"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Important from "@/components/ui/important";
import love from "@/public/icons/RelatedProducts/love.png"
import shop from "@/public/icons/RelatedProducts/cart.png"
import Star from '@/public/icons/ProductDetails/rate.png';
import unStar from '@/public/icons/ProductDetails/unStar.png';
import { useState } from "react";

const Products = ({ datas }) => {
    const router = useRouter();
    const [selectedStars, setSelectedStars] = useState(0)
    const [clickCount, setClickCount] = useState(0)

    const handleClick = (index) => {
            const newClickCount = clickCount + 1
            setClickCount(newClickCount)

            // Toggle behavior: even = unstar, odd = star
            if (newClickCount % 2 === 0) {
                setSelectedStars(0)
            } else {
                setSelectedStars(index + 1)
            }
    }

    const handleCardClick = (data) => {
        router.push(`/productDetails?data=${encodeURIComponent(JSON.stringify(data))}`);
    };

    return (
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {datas.map((data) => (
                <div
                    key={data.id}
                    className="relative border border-[#E5E7EB] w-full max-w-[250px]  h-[398px] px-3 flex flex-col gap-2 justify-center items-center rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:z-10 bg-white"
                    >
                    <Image
                        src={data.src}
                        alt={data.id}
                        width={176}
                        height={176}
                        onClick={() => handleCardClick(data)}
                        className="w-[177px] h-[177px] object-contain"
                    />

                    <Image
                        src={love}
                        alt={love}
                        className="absolute w-[17.86px] h-[16.5px] top-2 right-3 object-contain"
                    />

                    <Important
                        text={data.important1}
                        background="red"
                        size="xsm"
                        position={1}
                    />
                    <p className="text-[14px] text-[#030712] font-medium mt-10 w-full "
                        onClick={() => handleCardClick(data)}
                    >{data.title}</p>
                    <div className="flex items-center w-full">
                        {[...Array(5)].map((_, index) => (
                            <Image
                                key={index}
                                src={index < selectedStars ? Star : unStar}
                                alt={`${index}`}
                                className="w-[11.35px] h-[11px] object-contain cursor-pointer"
                                onClick={() => handleClick(index)}
                            />
                        ))}
                    </div>
                    <div className="w-full">
                        <span className="text-[#DC2626] font-bold text-[22px] mr-1">
                        ${data.price}
                        </span>
                        <span className="font-medium text-base line-through">
                        ${data.originalPrice}
                        </span>
                    </div>
                    <div className="text-[#16A34A] flex gap-3 items-center w-full">
                        <div className="p-2 bg-[#16A34A] rounded-xl">
                            <Image
                                src={shop}
                                alt={shop}
                                className="w-[20px] h-[20px] top-2 right-3 object-contain"
                            />
                        </div>
                        <p>IN STOCK</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
