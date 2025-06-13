import imageOne from "@/public/icons/TopCategories/1.png"
import imageTwo from "@/public/icons/TopCategories/2.png"
import imageThree from "@/public/icons/TopCategories/3.png"
import imageFour from "@/public/icons/TopCategories/4.png"
import imageFive from "@/public/icons/TopCategories/5.png"
import imageSix from "@/public/icons/TopCategories/6.png"
import imageSeven from "@/public/icons/TopCategories/7.png"
import imageEight from "@/public/icons/TopCategories/8.png"
import imageNine from "@/public/icons/TopCategories/9.png"
import TopSectionCard from "@/components/ui/topSectionCard"

const TopCategories = () => {

    const datas = [
        {
            id: 1,
            src: imageOne,
            title: "Fruit & Vegetable"
        },
        {
            id: 2,
            src: imageTwo,
            title: "Baby & Pregnanacy"
        },
        {
            id: 3,
            src: imageThree,
            title: "Beverages"
        },
        {
            id: 4,
            src: imageFour,
            title: "Meats & Seafood"
        },
        {
            id: 5,
            src: imageFive,
            title: "Biscuits & Snacks"
        },
        {
            id: 6,
            src: imageSix,
            title: "Breads & Backery"
        },
        {
            id: 7,
            src: imageSeven,
            title: "Breakfast & Dairy"
        },
        {
            id: 8,
            src: imageEight,
            title: "Frozen Foods"
        },
        {
            id: 9,
            src: imageNine,
            title: "Grocery & Staples"
        },
        
    ]

    return (
        <div className="w-4/5 m-auto text-[#030712] mt-8">
            <div className="flex gap-4 items-center">
                <p className="text-[#030712] font-bold text-lg">Top Categories</p>
                <p className="text-[#9CA3AF] text-[13px]">New products with updated stocks.</p>
            </div>
            <TopSectionCard 
                datas={datas}
            />
        </div>
    )
}

export default TopCategories