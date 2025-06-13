'use client'

import { useState } from "react"
import Image from "next/image"
import CustomRangeSlider from "./CustomRange"

const CategoryMain = () => {

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(30)

    const updateMinMax = (index:number, value: number) => {
        index == 0 ?
            setMin(prevMin => prevMin = value)
        :
            setMax(prevMax => prevMax = value)
    }

    const CategoryMainData = {
        widgetPriceFilter: [
            {
                id: 1,
                name: 'Min price',
                value: min
            },
            {
                id: 2,
                name: 'Max price',
                value: max
            }

        ],
        productCategories: [
            {
                id:1,
                checked: true,
                name: "Fruits & Vegetables",
                breakDownSrc: true,
            },
            {
                id:2,
                checked: false,
                name: "Baby & Pregnancy",
                breakDownSrc: false,
            },
            {
                id:3,
                checked: false,
                name: "Beverages",
                breakDownSrc: false,
            },
            {
                id:4,
                checked: false,
                name: "Meats & Seafood",
                breakDownSrc: false,
            },
            {
                id:5,
                checked: false,
                name: "Biscuits & Snacks",
                breakDownSrc: false,
            },
            {
                id:6,
                checked: false,
                name: "Breads & Backery",
                breakDownSrc: false,
            },
            {
                id:7,
                checked: false,
                name: "Breakfast & Dairy",
                breakDownSrc: false,
            },
            {
                id:8,
                checked: false,
                name: "Frozen Foods",
                breakDownSrc: false,
            },
            {
                id:9,
                checked: false,
                name: "Grocery & Staples",
                breakDownSrc: false,
            },
            {
                id:10,
                checked: false,
                name: "Healthcare",
                breakDownSrc: false,
            },
            {
                id:11,
                checked: false,
                name: "Household Needs",
                breakDownSrc: false,
            }
        ],
        filterByColor: {
            id:12,
            color: 'bg-[#81D742]',
            name: 'green',
            count: 1,
        },
        filterByBrands: {
            id:13,
            checked: true,
            count: 1,
            name: 'Fresh'
        },
        productStatus: [
            {
                id: 14,
                name: 'In Stock',
                checked: false
            },
            {
                id: 15,
                name: 'In Sale',
                checked: false
            },
        ]
    }

    const [productCategories, setProductCategories] = useState(CategoryMainData.productCategories)

    const toggleCategories = (id:number) => {
        setProductCategories((prevCategories) => 
            prevCategories.map((cat) => 
                cat.id === id ? {...cat, checked: !cat.checked} : cat
            )
        )
    }

    

    const switchState = () => {

    }



    return (
        <div className="w-4/5 flex gap-2 text-[#030712] mx-auto">
            {/* Side Bar */}
            <section className="flex flex-col gap-6.5">
                {/* Widget price Fill */}
                <div className="border-b-2 border-[#E5E7EB]">
                    <p className="text-[14px] font-semibold">Widget price filter</p>
                    <div className="flex items-center justify-between">
                        {CategoryMainData.widgetPriceFilter.map((WPF, index) => (
                            <div className="flex items-center">
                                <div
                                    key={index}
                                    className="flex flex-col"
                                >
                                    <p className="text-[12px] text-[#6B7280]">{WPF.name}</p>
                                    <input 
                                        type="text" 
                                        name=""
                                        id="" 
                                        placeholder={`${WPF.value}`} 
                                        onChange={() => updateMinMax(index, WPF.value)}
                                        className="border-1 border-[#D1D5DB] rounded-lg outline-none w-28 py-2 pl-3.5"
                                    />
                                </div>
                                {index == 0 && <p className="font-bold mx-2 h-full">-</p>}
                            </div>
                        ))}
                    </div>

                    <CustomRangeSlider 
                        min={CategoryMainData.widgetPriceFilter[0].value} 
                        max={CategoryMainData.widgetPriceFilter[1].value} 
                    />
                </div>

                {/* Product Categories */}
                <div>
                    <p className="text-[14px] font-semibold mb-4">Product Categories</p>
                    <div 
                        className="flex flex-col gap-2"
                    >
                        {productCategories.map((pCart, index) => (
                            <div 
                                key={index}
                                className={`${pCart.checked && 'text-[#634C9F]'} font-medium flex gap-3 items-center`}
                            >
                                <Image 
                                    src={pCart.checked ? "/icons/FilterProducts/check.png" : "/icons/FilterProducts/uncheck.png"}
                                    alt={pCart.name}
                                    width={16}
                                    height={16}
                                    onClick={() => toggleCategories(index + 1)}
                                />
                                <p>{pCart.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter by Color */}
                <div className="pb-6 border-b-2 border-[#E5E7EB]">
                    <p className="text-[14px] font-semibold mb-4">Filter by Color</p>

                    <div className="text-[14px] flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <div className={`${CategoryMainData.filterByColor.color} w-5 h-5 rounded-full`}></div>
                            <p className=" capitalize">{CategoryMainData.filterByColor.name}</p>
                        </div>
                        <p className="text-[#9CA3AF] justify-self-end">({CategoryMainData.filterByColor.count})</p>
                    </div>
                </div>

                {/* Filter by Brands */}
                <div className="pb-6 border-b-2 border-[#E5E7EB]">
                    <p className="text-[14px] font-semibold mb-4">Filter by Brands</p>

                    <div className="text-[14px] flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <Image 
                                src={''}
                                alt={''}
                                width={16}
                                height={16}
                                onClick={() => toggleCategories(index + 1)}
                            />
                            <p className=" capitalize">{CategoryMainData.filterByColor.name}</p>
                        </div>
                        <p className="text-[#9CA3AF] justify-self-end">({CategoryMainData.filterByColor.count})</p>
                    </div>
                </div>
            </section>

            {/* Main Section */}
            <section>
                          
            </section>
        </div>
    )
}

export default CategoryMain