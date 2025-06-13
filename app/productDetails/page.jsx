'use client';

import { useSearchParams } from 'next/navigation';
import NavBar from '../../components/common/NavBar';
import RelatedProducts from '@/components/common/RelatedProducts';
import ProductImageGallery from '../../components/ui/productImageGallery';
import Star from '../../public/icons/ProductDetails/rate.png';
import unStar from '../../public/icons/ProductDetails/unStar.png';
import shop from '../../public/icons/ProductDetails/shop.png';
import warranty from '../../public/icons/ProductDetails/warranty.png';
import payment from '../../public/icons/ProductDetails/payment.png';
import love from '../../public/icons/ProductDetails/love.png';
import compare from '../../public/icons/ProductDetails/compare.png';
import upload from '../../public/icons/ProductDetails/upload.png';
import Footer from "../../components/common/Footer"
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const ProductDetiails = () => {

    const searchParams = useSearchParams();
    const data = JSON.parse(searchParams.get('data'));
    const [selectedStars, setSelectedStars] = useState(0)
    const [clickCount, setClickCount] = useState(0)
    const [addCart, setAddCart] = useState(1)

    const addItemCount = () => {
        setAddCart(prevState => prevState + 1)
    }

    const reduceItemCount = () => {
        setAddCart(prevState => prevState - 1)
    }

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

    return (
        <div>
            <NavBar />
            <main className='w-4/5 m-auto mt-6 flex gap-3'>
                <ProductImageGallery 
                    data={data.src}
                />
                <div className='flex flex-col gap-3 '>
                    <p className='font-bold text-[38px] text-[#030712]'>{data.title}</p>
                    <div className='flex items-center gap-1 text-[#030712] text-[13px] border-b-2 border-[#E5E7EB] pb-[13px]'>
                        <div className="flex items-center">
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
                        <span className='px-2 border-1 border-[#d1d5db] rounded-sm font-bold'>{selectedStars}.00</span>
                        <span className='text-[#6B7280] text-[12px]'>2</span>
                        <span className='font-medium ml-3 pl-3 border-l-1 border-[#E5E7EB]'><span className='text-[#6B7280]'>SKU:</span>EF78G9HO</span>
                    </div>
                    <span className='text-[14px] text-[#4B5563]'>
                        Vivamus adipiscing nisl ut dolor dignissim semper. 
                        Nulla luctus malesuada tincidunt. Class aptent taciti
                        sociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper.
                    </span>
                    <div className="w-full">
                        <span className="text-[#DC2626] font-bold text-[30px] mr-1.5">
                            ${data.price}
                        </span>
                        <span className="font-medium text-[21.9px] text-[#111827] line-through">
                            ${data.originalPrice}
                        </span>
                    </div>

                    <Link href={'/'} className='bg-[#16A34A] text-white rounded-lg px-[18px] py-[14px] w-fit'>Order on WhatsApp</Link>

                    <div className='flex items-center bg-[#FFEDD5] p-4 gap-4'>
                        <span className='text-[#EA580C] font-bold '>Special Offer: </span>
                        <div className='flex gap-2 items-center'>
                            <span className='p-2 rounded-md text-[#C2410C] font-semibold bg-[#FFEDD5] border-1 border-[#FED7AA]'>81</span> 
                            <span className='p-2 rounded-md text-[#C2410C] font-semibold bg-[#FFEDD5] border-1 border-[#FED7AA]'>06</span> 
                            <span className='p-2 rounded-md text-[#C2410C] font-semibold bg-[#FFEDD5] border-1 border-[#FED7AA]'>05</span> 
                            <span className='text-[#030712] font-bold text-lg'>:</span> 
                            <span className='p-2 rounded-md text-[#C2410C] font-semibold bg-[#FFEDD5] border-1 border-[#FED7AA]'>81</span> 
                            <span className='text-[#6B7280] text-[11px]'>Remains until the end of the offer</span> 
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <div className='rounded-md border-1 border-[#D1D5DB] font-bold text-lg text-[#030712] flex items-center w-fit'>
                            <span onClick={reduceItemCount} className='p-3 cursor-pointer select-none'>-</span>
                            <span className='p-3'>{addCart}</span>
                            <span onClick={addItemCount} className='p-3 cursor-pointer select-none'>+</span>
                        </div>

                        <div className='bg-[#16A34A] text-white flex gap-1 items-center w-fit px-8 py-3 rounded-lg'>
                            <Image
                                key={shop}
                                src={shop}
                                alt={shop}
                                className="w-[14px] h-[14px] object-contain cursor-pointer"
                            />
                            <span className='cursor-pointer'>Add to cart</span>
                        </div>
                        <div className='bg-[#212529] text-white flex gap-1 items-center w-fit px-8 py-3 rounded-lg'>
                            <Image
                                key={shop}
                                src={shop}
                                alt={shop}
                                className="w-[14px] h-[14px] object-contain cursor-pointer"
                            />
                            <span className='cursor-pointer'>Buy Now</span>
                        </div>
                    </div>

                    <div className=' border-2 border-[#E5E7EB] rounded-lg'>
                        <div className='flex gap-4 p-3 items-start text-[#6B7280] border-b-2 border-[#E5E7EB]'>
                            <Image
                                key={payment}
                                src={payment}
                                alt={payment}
                                className="w-[23.4px] h-[16.8px]  object-contain cursor-pointer"
                            />

                            <span className='relative -top-1'>
                                <span className='font-bold border-none'>Payment.</span>
                                Payment upon receipt of goods, 
                                Payment by card in the department, Google Pay,
                                Online card, -5% discount in case of payment
                            </span>
                        </div>

                        <div className='flex gap-4 p-3 items-start text-[#6B7280] border-b-2 border-[#E5E7EB]'>
                            <Image
                                key={warranty}
                                src={warranty}
                                alt={warranty}
                                className="w-[23.4px] h-[16.8px]  object-contain"
                            />

                            <span className='relative -top-1'>
                                <span className='font-bold border-none'>Warranty..</span>
                                The Consumer Protection Act does 
                                not provide for the return of this product of proper
                                quality.
                            </span>
                        </div>
                    </div>

                    <div className='flex items-center gap-6'>
                        <div className='flex gap-2 items-center font-medium text-[#030712]'>
                            <div className=' border-2 border-[#E5E7EB] w-fit p-2 rounded-lg'>
                                <Image
                                    key={love}
                                    src={love}
                                    alt={love}
                                    className="w-[18.26px] h-[16.43px]  object-contain"
                                />
                            </div>
                            <span>Add to wishlist</span>
                        </div>

                        <div className='flex gap-2 items-center font-medium text-[#030712]'>
                            <div className=' border-2 border-[#E5E7EB] w-fit p-2 rounded-lg'>
                                <Image
                                    key={upload}
                                    src={upload}
                                    alt={upload}
                                    className="w-[18.26px] h-[16.43px]  object-contain"
                                />
                            </div>
                            <span>Share this Product</span>
                        </div>

                        <div className='flex gap-2 items-center font-medium text-[#030712]'>
                            <div className=' border-2 border-[#E5E7EB] w-fit p-2 rounded-lg'>
                                <Image
                                    key={compare}
                                    src={compare}
                                    alt={compare}
                                    className="w-[18.26px] h-[16.43px]  object-contain"
                                />
                            </div>
                            <span>Compare</span>
                        </div>
                    </div>
                </div>
            </main>
            <div className='w-4/5 m-auto text-[#030712] flex flex-col gap-5 mt-28'>
                <div className='flex gap-8 border-b-2 border-[#E5E7EB] '>
                    <p className='pb-5 border-b-2 border-black cursor-pointer'>Discription</p>
                    <p className='cursor-pointer'>Reviews (2)</p>
                </div>
                <div className='flex flex-col gap-5'>
                    <p>    
                        Quisque varius diam vel metus mattis, id aliquam diam rhoncus. 
                        Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit ex, 
                        viverra vitae ante vel, blandit feugiat ligula. Fusce
                        fermentum iaculis nibh, at sodales leo maximus a. Nullam ultricies sodales nunc, 
                        in pellentesque lorem mattis quis. Cras imperdiet est in nunc tristique lacinia. Nullam aliquam mauris eu
                        accumsan tincidunt. Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor.
                    </p>

                    <p className=''>
                        Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, 
                        eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. 
                        Maecenas lacus odio, feugiat eu nunc sit amet,
                        maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit 
                        amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet 
                        rhoncus blandit. Aenean vel diam ut
                        arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, 
                        lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed
                        egestas purus commodo vel.
                    </p>
                </div>
            </div>
            <RelatedProducts />
            <Footer />
        </div>
    )
}

export default ProductDetiails