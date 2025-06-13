'use client'

import Slide1 from '@/public/icons/Navbar/slide1.png'
import Slide2 from '@/public/icons/Navbar/slide2.png'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const images = [Slide1, Slide2]

const sliderData = [
  {
    id: 1,
    coloredText: 'Weekend Discount',
    title: 'Get the best quality products at the lowest prices',
    text: 'We have prepared special discounts for you on organic breakfast products',
    buttonText: 'Shop Now',
    discountedPrice: '$21.67',
    originalPrice: '$59.99',
    conclusion: "Don't miss this limited time offer",
  },
  {
    id: 2,
    coloredText: 'Weekend Discount',
    title: 'Shopping with us for better quality and the best price',
    text: "We have prepared special discount for you on grosery products. Don't miss these opportunities...",
    buttonText: 'Shop Now',
    discountedPrice: '$21.67',
    originalPrice: '$26.67',
    conclusion: "Don't miss this limited time offer",
  },
]

const HeroSection = () => {
  const [[current, direction], setCurrent] = useState([0, 1])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const paginate = (dir: number) => {
    setCurrent(([prev]) => {
      const nextIndex = (prev + dir + images.length) % images.length
      return [nextIndex, dir]
    })
  }

  const startAutoSlide = () => {
    stopAutoSlide()
    intervalRef.current = setInterval(() => paginate(1), 4000)
  }

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startAutoSlide()
    return () => stopAutoSlide()
  }, [])

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '80%' : '-80%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-80%' : '80%',
      opacity: 0,
      zIndex: 0,
    }),
  }

  return (
    <section className="w-4/5 max-w-[1440px] mx-auto h-[560px] md:h-[480px] sm:h-[420px] mt-6 px-4 relative rounded-xl overflow-hidden">
      <AnimatePresence custom={direction}>
        <motion.div
          key={current}
          className="absolute w-full h-full flex items-center"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 50, damping: 20 },
            opacity: { duration: 0.5 },
          }}
        >
          <Image
            src={images[current]}
            alt={`Slide ${current}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute w-full md:w-1/2 px-4 md:ml-20 z-10 text-white md:text-black">
            <span className="inline-block bg-gradient-to-r from-[#4af789] to-[#ffffff] px-3 py-1 rounded-md text-black text-sm sm:text-xs mb-3">
              {sliderData[current].coloredText}
            </span>
            <h3 className="font-bold text-4xl sm:text-3xl leading-tight text-[#39245F] mb-2">
              {sliderData[current].title}
            </h3>
            <p className="text-base sm:text-sm text-[#030712] mb-6 w-full md:w-[85%]">
              {sliderData[current].text}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link
                href=""
                className="text-white bg-[#634C9F] rounded-lg py-3 px-5 text-sm sm:text-base"
              >
                {sliderData[current].buttonText}
              </Link>
              <div className="grid grid-cols-2 w-fit gap-x-2 text-sm sm:text-base">
                <span className="text-[#DC2626] font-bold text-xl col-span-1">
                  {sliderData[current].discountedPrice}
                </span>
                <span className="text-[#111827] line-through font-medium col-span-1">
                  {sliderData[current].originalPrice}
                </span>
                <span className="col-span-2 text-[11px] text-[#a5a6a8] mt-1">
                  {sliderData[current].conclusion}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

export default HeroSection
