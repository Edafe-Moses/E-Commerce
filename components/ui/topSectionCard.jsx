import Promo from "@/public/icons/TopCategories/promo.png.png"
import Image from "next/image"

const TopSectionCard = ({ datas }) => {
    const adsData = {
        id: '1',
        main: "In store or online your health & safety is our top priority",
        side: "The only supermarket that makes your life easier, makes you enjoy life and makes it better",
        image: Promo,
    }

    return (
        <div>
            {/* Responsive category section with hidden scrollbar */}
            <div className="my-6 border border-[#E5E7EB] rounded-lg overflow-x-auto">
                <div className="flex lg:flex-nowrap flex-wrap justify-center lg:justify-start whitespace-nowrap no-scrollbar">
                    {datas.map((data) => (
                        <div
                            key={data.id}
                            className="border border-[#E5E7EB] border-r-0 last:border-r w-[152px] min-w-[152px] h-[179.33px] flex flex-col justify-center gap-1 items-center"
                        >
                            <Image
                                src={data.src}
                                alt={data.id}
                                width={122}
                                height={122}
                                className="w-[122px] h-[122px] object-contain"
                            />
                            <p className="text-[13px] font-medium text-center">{data.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Promo Section */}
            <div className="w-full h-[85px] mb-10 bg-[#FFEDD5] relative overflow-hidden z-4 flex flex-col justify-center pl-[31px] rounded-sm">
                <p className="relative z-10 text-[#EA580C] font-bold text-[22px]">{adsData.main}</p>
                <span className="relative z-10 text-[#6B7280] text-[14px]">{adsData.side}</span>
                <p className="text-[#EA580C] w-fit absolute z-0 font-bold text-[130px] left-1/3 bottom-[-50px] opacity-40">%50</p>
                <Image
                    src={Promo}
                    alt={adsData.id}
                    className="absolute z-0 right-0 h-full object-contain"
                />
            </div>
        </div>
    )
}

export default TopSectionCard
