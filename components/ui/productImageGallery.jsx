"use client"

import Image from "next/image"
import { useState } from "react"

import banana1 from "@/public/icons/ProductDetails/bananna/1.png"
import banana2 from "@/public/icons/ProductDetails/bananna/2.png"
import banana3 from "@/public/icons/ProductDetails/bananna/3.png"


const ProductImageGallery = ({data}) => {
    const [selectedImage, setSelectedImage] = useState(data)
    const images = [data, data, data]

    return (
        <div className="flex flex-col gap-4 items-center md:items-start md:flex">
            {/* Main Image */}
            <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] border border-gray-200 rounded-md overflow-hidden">
                <Image
                    src={selectedImage}
                    alt="Product"
                    fill
                    className="object-contain"
                    priority
                />

                {/* Fullscreen / Zoom Icon */}
                <div className="absolute bottom-2 left-2 bg-white p-1 rounded shadow-md cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-4.553m0 0A2.121 2.121 0 0017.553 3H15m4.553 2.447L15 10m0 0H5a2 2 0 00-2 2v7a2 2 0 002 2h7a2 2 0 002-2v-7a2 2 0 00-2-2z" />
                    </svg>
                </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex gap-2 mt-3 md:mt-0 md:flex">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`w-[70px] h-[70px] border rounded-md overflow-hidden transition-all ${
                            selectedImage === img ? "border-[#EA580C]" : "border-gray-200"
                        }`}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="object-contain w-full h-full"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ProductImageGallery
