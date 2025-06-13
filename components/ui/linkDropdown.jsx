import React from "react"
import Link from "next/link"
import Image from "next/image"
import downAccord from "@/public/icons/Navbar/down-accord.png"

const linkDropdown = ({text, href, width, height}) => {
    return (
        <Link 
            href={href}
            className="flex items-center gap-1.5"
        >
            {text}
            <Image src={downAccord} width={width} height={height} alt="" />
        </Link>
    )
}

export default linkDropdown