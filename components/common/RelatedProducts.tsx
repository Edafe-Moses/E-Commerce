import imageOne from "@/public/icons/RelatedProducts/1019.png"
import imageTwo from "@/public/icons/RelatedProducts/1023.png"
import imageThree from "@/public/icons/RelatedProducts/1030.png"
import imageFour from "@/public/icons/RelatedProducts/1037.png"
import imageFive from "@/public/icons/RelatedProducts/1044.png"
import imageSix from "@/public/icons/RelatedProducts/1048.png"
import Products from "@/components/ui/beautifulProducts"


const RelatedProducts = () => {

    const datas = [
        {
            id: 1,
            src: imageOne,
            title: "Large Garden Spinach & Herb Wrap Tortillas – 15oz_6ct",
            price: "27.90",
            important1: "75%",
            important2Color: "o",
            originalPrice: "32.90",
        },
        {
            id: 2,
            src: imageTwo,
            title: "Peach – each",
            price: "0.75",
            important1: "11%",
            important2: "COLD SALE",
            important2Color: "c",
            originalPrice: "1.75",
        },
        {
            id: 3,
            src: imageThree,
            title: "Yellow Potatoes Whole Fresh, 5lb Bag",
            price: "0.50",
            important1: "41%",
            important2Color: "o",
            originalPrice: "1.99",
        },
        {
            id: 4,
            src: imageFour,
            title: "Fresh Cauliflower, Each",
            price: "12.79",
            important1: "21%",
            important1Color: "",
            important2Color: "c",
            originalPrice: "14.79",
        },
        {
            id: 5,
            src: imageFive,
            title: "Fresh Broccoli Crowns, Each",
            price: "11.54",
            important1: "59%",
            important2Color: "o",
            originalPrice: "17.88",
        },
        {
            id: 6,
            src: imageSix,
            title: "Fresh Purple Eggplant",
            price: "2.99",
            important1: "59%",
            important2Color: "o",
            originalPrice: "3.99",
        },
    ]

    return (
        <div className="w-4/5 m-auto text-[#030712] mt-8">
            <p className="text-[#030712] font-bold text-lg">Related Products</p>
            <Products 
                datas={datas}
            />
        </div>
    )
}

export default RelatedProducts