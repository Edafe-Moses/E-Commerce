import imageOne from "@/public/icons/NewProducts/1.png"
import imageTwo from "@/public/icons/NewProducts/2.png"
import imageThree from "@/public/icons/NewProducts/3.png"
import imageFour from "@/public/icons/NewProducts/4.png"
import imageFive from "@/public/icons/NewProducts/5.png"
import imageSix from "@/public/icons/NewProducts/6.png"
import Products from "@/components/ui/products"

const NewProducts = () => {

    const datas = [
        {
            id: 1,
            src: imageOne,
            title: "100 Percent Apple Juice - 64 fl oz Bottle",
            price: "0.50",
            important1: "75%",
            important1Color: "",
            important2: "ORGANIC",
            important2Color: "o",
            originalPrice: "1.99",
            sideText: 'This product is about to run out',
            avaliable: 23,
        },
        {
            id: 2,
            src: imageTwo,
            title: "Great Value Rising Crust Frozen Pizza, Supreme",
            price: "8.99",
            important1: "11%",
            important1Color: "",
            important2: "COLD SALE",
            important2Color: "c",
            originalPrice: "9.99",
            sideText: 'This product is about to run out',
            avaliable: 18,
        },
        {
            id: 3,
            src: imageThree,
            title: "Simply Orange Pulp Free Juice – 52 fl oz",
            price: "2.45",
            important1: "41%",
            important1Color: "",
            important2: "ORGANIC",
            important2Color: "o",
            originalPrice: "4.13",
            sideText: 'This product is about to run out',
            avaliable: 27,
        },
        {
            id: 5,
            src: imageFour,
            title: "California Pizza Kitchen Margherita, Crispy Thin Crus…",
            price: "11.77",
            important1: "21%",
            important1Color: "",
            important2: "COLD SALE",
            important2Color: "c",
            originalPrice: "14.77",
            sideText: 'This product is about to run out',
            avaliable: 19,
        },
        {
            id: 6,
            src: imageFive,
            title: "Cantaloupe Melon Fresh Organic Cut",
            price: "1.25",
            important1: "59%",
            important1Color: "",
            important2: "ORGANIC",
            important2Color: "o",
            originalPrice: "2.98",
            sideText: 'This product is about to run out',
            avaliable: 16,
        },
        {
            id: 7,
            src: imageSix,
            title: "Angel Soft Toilet Paper, 9 Mega Rolls",
            price: "14.12",
            important1: "75%",
            important1Color: "",
            important2: "ORGANIC",
            important2Color: "o",
            originalPrice: "17.12",
            sideText: 'This product is about to run out',
            avaliable: 32,
        }
        
    ]

    return (
        <div className="w-4/5 m-auto text-[#030712] mt-8">
            <div className="flex gap-4 items-center">
                <p className="text-[#030712] font-bold text-lg">New Products</p>
                <p className="text-[#9CA3AF] text-[13px]">Some of the new products arriving this weeks</p>
            </div>
            <Products 
                datas={datas}
            />
        </div>
    )
}

export default NewProducts