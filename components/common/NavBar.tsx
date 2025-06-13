import Link from "next/link"
import Image from "next/image"
import siteLogo from '@/public/icons/Navbar/g10.png'
import Location from "@/public/icons/Navbar/loc.png"
import Search from "@/public/icons/Navbar/search.png"
import SignIn from "@/public/icons/Navbar/human.png"
import Like from "@/public/icons/Navbar/Like.png"
import Cart from "@/public/icons/Navbar/Shop.png"
import Important from "@/components/ui/important"
import DropDown from "@/components/ui/linkDropdown"
import downAccord from "@/public/icons/Navbar/down-accord.png"

const NavBar = () => {
  const navData = {
    fouthSectionLeft: [
      { id: 1, name: 'Home', href: "/" },
      { id: 2, name: 'Shop', href: "/category" },
      { id: 3, name: 'Fruits & Vegetables', href: "/category" },
      { id: 4, name: "Beverages", href: "/category" },
      { id: 5, name: "Blog", href: "/" },
      { id: 6, name: "Contact", href: "/" },
    ],
    fourthSectionRight: [
      { id: 1, name: "Trending Products", href: "" },
      { id: 2, name: "Almost Finished", href: "" }
    ],
  }

  return (
    <nav className="">
      {/* First Section */}
      <section className="bg-[#634C9F] h-10 text-xs text-white px-4 flex justify-around items-center flex-wrap lg:flex-nowrap">
        <span className="truncate">FREE delivery & 40% Discount for next 3 orders! Place your 1st order In.</span>
        <div className="flex gap-1 lg:gap-2 text-slate-200 items-center text-[11px] sm:text-xs">
          <span>Ends in:</span>
          <p><span className="text-white font-bold">47</span>d</p>
          <p><span className="text-white font-bold">06</span>h</p>
          <p><span className="text-white font-bold">55</span>m</p>
          <p><span className="text-white font-bold">51</span>s</p>
        </div>
      </section>

      {/* Second Section */}
      <section className="hidden md:flex text-[#6B7280] border-b border-[#E5E7EB] text-[11px] px-4 py-2 justify-around">
        <div className="flex gap-3 items-center flex-wrap">
          <Link href={``}>About Us</Link>
          <Link href={``}>My account</Link>
          <Link href={``}>Wishlist</Link>
          <p className="pl-4 border-l border-[#E5E7EB]">Delivery: <span className="text-[#EA580C] font-bold">7:00 to 23:00</span></p>
        </div>
        <div className="flex items-center gap-3">
          <DropDown text={"English"} href={''} width={7.78} height={10} />
          <DropDown text={"USD"} href={''} width={7.78} height={10} />
          <Link href={``}>Order Tracking</Link>
        </div>
      </section>

      {/* Third Section */}
      <section className="w-full border-b border-[#E5E7EB] px-4 py-3 flex flex-col gap-2 lg:flex-row items-center justify-center">
        <div className="flex items-center gap-2">
          <Image src={siteLogo} width={45} height={39.12} alt="logo" />
          <span className="font-bold text-xl sm:text-2xl text-black">JinStore</span>
        </div>

        <div className="hidden sm:grid grid-cols-[auto_1fr] gap-x-2 items-center">
          <Image src={Location} width={19} height={23} alt="location" />
          <div>
            <p className="text-[10px]">Deliver to</p>
            <p className="text-sm font-medium">All</p>
          </div>
        </div>

        <div className="w-full sm:w-2/3 lg:w-1/2 relative">
          <input
            type="text"
            className="w-full h-10 rounded-lg bg-[#F3F4F6] text-sm text-[#6B7280] pl-4 pr-10 outline-none"
            placeholder="Search for products, categories or brands..."
          />
          <Image src={Search} width={20} height={20} alt="search" className="absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <Link href={'/login'} className="hidden cursor-pointer sm:grid grid-cols-[auto_1fr] items-center gap-x-2">
          <Image src={SignIn} width={20} height={22} alt="signin" />
          <div>
            <p className="text-[10px]">Sign In</p>
            <p className="text-sm font-medium">Account</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Image src={Like} width={24} height={21} alt="like" />
            <Important text={0} background="red" percentage="full" size="sm" />
          </div>
          <div className="relative">
            <Image src={Cart} width={24} height={20} alt="cart" />
            <Important text={0} background="red" percentage="full" size="sm" />
          </div>
        </div>
      </section>

      {/* Fourth Section */}
      <section className="border-b border-[#E5E7EB] text-black px-4 py-2 text-sm flex flex-wrap justify-around items-center">
        <div className="flex gap-4 flex-wrap">
          {navData.fouthSectionLeft.map((data, i) =>
            i < 2 ? (
              <DropDown key={data.id} text={data.name} href={data.href} width={9.9} height={5.3} />
            ) : (
              <Link key={data.id} href={data.href}>{data.name}</Link>
            )
          )}
        </div>

        <div className="flex gap-4 mt-2 sm:mt-0 flex-wrap">
          {navData.fourthSectionRight.map((data, i) =>
            i === 1 ? (
              <Link key={data.id} href={data.href} className="flex items-center gap-1.5 text-[#DC2626]">
                {data.name}
                <span className="bg-gradient-to-r from-[#DC2626] to-[#EA580C] font-bold text-[10px] rounded-sm p-0.5 text-white">SALE</span>
                <Image src={downAccord} width={9.9} height={5.31} alt="" />
              </Link>
            ) : (
              <DropDown key={data.id} text={data.name} href={data.href} width={9.9} height={5.3} />
            )
          )}
        </div>
      </section>
    </nav>
  )
}

export default NavBar
