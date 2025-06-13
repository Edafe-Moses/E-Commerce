import Link from "next/link"
import Image from "next/image"

const Footer = () => {

    const footerData = {
        firstSection: {
            id: 1,
            title: 'Join our newsletter for £10 offs',
            text: 'Register now to get latest updates on promotions & coupons.Don’t worry, we not spam!',
        },
        secondSection: {
            first: [
                {
                    id:1,
                    title: 'Do you Need Help?',
                    text: 'Autoseligen syr. Nek diarask fröbomba. Nör antipol kynoda nynat. Pressa fåmoska.',                    
                },
                {
                    id:2,
                    imageSrc: '/icons/Footer/call.png',
                    text: 'Monday-Friday: 08am-9pm',
                    number: '0 800 300-353'
                },
                {
                    id:3,
                    imageSrc: '/icons/Footer/message.png',
                    text: 'Need help with your order?',
                    mail: 'info@example.com',
                }
            ],
            second: [
                {
                    id:1,
                    title: 'Make Money with Us',
                    list: [
                        'Sell on Grogin', 'Sell Your Services on Grogin', 
                        'Sell on Grogin Business', 'Sell Your Apps on Grogin', 'Become an Affilate', 
                        'Advertise Your Products', 'Sell-Publish with Us', 'Become an Blowwe Vendor'
                    ]
                },
                {
                    id:2,
                    title: 'Let Us Help You',
                    list: [
                        'Accessibility Statement', 'Your Orders', 'Returns & Replacements',
                        'Shipping Rates & Policies', 'Refund and Returns Policy', 
                        'Privacy Policy', 'Terms and Conditions', 'Cookie Settings', 'Help Center'
                    ]
                },
                {
                    id:3,
                    title: 'Get to Know Us',
                    list: [
                        'Careers for Grogin', 'About Grogin', 'Inverstor Relations',
                        'Grogin Devices', 'Customer reviews', 
                        'Social Responsibility', 'Store Locations'
                    ]
                },
                {
                    id:4,
                    title: 'Download our app',
                    google: {src: '/icons/Footer/google.png', text: 'Download App Get -10% Discount'},
                    appstore: {src: '/icons/Footer/appstore.png', text: 'DDownload App Get -20% Discount'},
                    text: 'Follow us on social media:',
                    social: ['/icons/Footer/facebook.png','/icons/Footer/x.png','/icons/Footer/instagram.png','/icons/Footer/linkedln.png']
                },
            ],
            third: [
                {
                    id:1,
                    text: 'Copyright 2024 © Jinstore WooCommerce WordPress Theme. All right reserved. Powered by',
                    payout: [{src:'/icons/Footer/visa.png', w: 36, h: 13},{src:'/icons/Footer/master.png', w: 24, h: 15},{src:'/icons/Footer/paypal.png', w: 53, h:15},{src:'/icons/Footer/skrill.png', w: 41, h: 15},{src:'/icons/Footer/klarna.png', w: 64, h:15}]
                },
                {
                    id:2,
                    list: ['Terms and Conditions', 'Privacy Policy', 'Order Tracking'],
                }
            ]
        }
    }

    const widthMap = {
        sm: 'w-full',
        md: 'w-4/5',
        lg: 'w-1/2'
    }

    return (
        <footer className="bg-[#F3F4F6] w-full text-[#6B7280] pt-[50px]">
            {/* First Section */}
            <section className={`${widthMap['md']} flex mx-auto justify-between text-[13px]`}>
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#111827] font-bold text-xl">{footerData.firstSection.title}</h2>
                    <p className="w-[300px]">{footerData.firstSection.text}</p>
                </div>
                <div>
                    <div className="relative flex items-center">
                        <input 
                            type="email" 
                            name="" 
                            id="" 
                            placeholder={'Enter your email address'} 
                            className="bg-white outline-none border-1 text-[14px] border-[#D1D5DB] border-r-0 rounded-l-lg w-[340] py-4 px-10"
                        />
                        <Image 
                            key={''}
                            src={'/icons/Footer/mail.png'}
                            alt={'mail'}
                            width={100}
                            height={100}
                            className="absolute w-[18px] ml-4 h-[14.6px]"
                        />
                        <Link 
                            href={'/'}
                            className="py-4 px-[18px] text-white bg-[#634C9F] border-1 border-[#634C9F] rounded-r-lg"
                        >
                            SEND
                        </Link>
                    </div>
                    <p className=" text-[11px] flex items-center gap-0.5 mt-[10.75px]">
                        <span>
                            By subscribing you agree to our
                        </span>
                        <span className="text-[#634C9F]">
                            Terms & Conditions and Privacy & Cookies Policy.
                        </span>
                    </p>
                </div>
            </section>
            {/* Second Section */}
            <section className={`${widthMap['md']} border-t-2 flex items-start gap-[30px] border-[#D1D5DB] mx-auto pt-[50px] mt-[50px]`}>
                <div className="w-[25%]">
                    {footerData.secondSection.first.map((first, index) => (
                        index == 0 ? 
                            <div
                                key={first.id}
                                className=""
                            >
                                <h2 className="font-semibold text-[14px] text-[#111827] mb-4">{first.title}</h2>
                                <p className="text-[13px]">{first.text}</p>
                            </div>
                        :
                            <div 
                                className="flex gap-5 items-center my-[30px]"
                                key={first.id}
                            >
                                <Image 
                                    key={first.id}
                                    src={first.imageSrc}
                                    alt={first.imageSrc}
                                    width={100}
                                    height={100}
                                    className="w-[28px] h-[28px]"
                                />
                                <div>
                                    <p className="text-[#111827] text-[12px]">{first.text}</p>
                                    <span className="text-[#111827] font-bold text-lg">{index == 1 ? first.number : first.mail}</span>
                                </div>
                            </div>
                    ))}
                </div>
                <div className="w-[75%] flex items-start justify-between">
                    {footerData.secondSection.second.map((sec, index) => (
                        index != (footerData.secondSection.second.length - 1) ?
                            <div 
                                key={sec.id}
                                className="flex flex-col justify-center gap-5"
                            >
                                <h2 className="font-semibold text-[14px] text-[#111827]">{sec.title}</h2>
                                <div className="">
                                    {sec.list?.map((li, index) => (
                                        <li
                                            className="list-none"
                                            key={index}
                                        >
                                            <Link 
                                                href={''}
                                                className="text-[13px]"
                                            >
                                                {li}
                                            </Link>
                                        </li>
                                    ))}
                                </div>
                            </div>
                        :
                            <div
                             className=""
                                key={sec.id}
                            >
                                <h2 className="mb-5 font-semibold text-[14px] text-[#111827] ">{sec.title}</h2>

                                <div
                                    key={sec.id}
                                    className="flex items-center gap-3 mb-5"
                                >
                                    <Image 
                                        src={sec.google?.src}
                                        alt={sec.google?.src}
                                        width={100}
                                        height={100}
                                        className="w-[120px] h-[38.92px]"
                                    />
                                    <p className="font-medium text-[10px] text-[#6B7280] w-[84px]">{sec.google?.text}</p>
                                </div>

                                <div className="flex items-center gap-3 ">
                                    <Image 
                                        key={sec.id}
                                        src={sec.appstore?.src}
                                        alt={sec.appstore?.src}
                                        width={100}
                                        height={100}
                                        className="w-[120px] h-[38.92px]"
                                    />
                                    <p className="font-medium text-[10px] text-[#6B7280] w-[84px]">{sec.appstore?.text}</p>
                                </div>

                                <p className="text-[12px] text-[#111827] mt-[50px] mb-[10px]">{sec.text}</p>
                                <div className="flex items-center gap-2">
                                    {sec.social?.map((s,index) => (
                                        <div
                                            key={index}
                                            className="bg-white p-2 w-fit rounded-md"
                                        >
                                            <Image 
                                                src={s}
                                                alt={s}
                                                width={100}
                                                height={100}
                                                className="w-[15px] h-[15px]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                    ))}
                </div>
            </section>
            {/* Third Section */}
            <section className={`${widthMap['md']} border-t-2 flex items-start gap-[30px] border-[#D1D5DB] mx-auto py-[50px] mt-[50px]`}>
                <div className="w-1/2">
                    <h2 className="text-[12px] text-[#6B7280]">{footerData.secondSection.third[0].text} <span className="text-[#634C9F]">BlackRise Themes.</span></h2>
                    <div className="flex items-center gap-2.5 mt-5">
                        {footerData.secondSection.third[0].payout?.map((pay, index) => (
                            <Image 
                                key={index}
                                src={pay.src}
                                alt={pay.src}
                                width={pay.w}
                                height={pay.h}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex gap-1 text-[12px] underline items-center justify-end w-1/2">
                    {footerData.secondSection.third[1].list?.map((li, index) => (
                        <Link
                            href={'/'}
                            key={index}
                        >
                            {li}
                        </Link>
                    ))}
                </div>
            </section>
        </footer>
    )
}

export default Footer