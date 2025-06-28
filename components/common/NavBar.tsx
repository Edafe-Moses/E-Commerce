'use client';

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { logout } from "@/lib/features/auth/authSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, User, Menu, LogOut, Settings, Package } from "lucide-react"
import Important from "@/components/ui/important"
import DropDown from "@/components/ui/linkDropdown"

// Mock CartBounce component for bounce animation
const CartBounce = ({ children, isAdding }) => (
  <motion.div
    animate={isAdding ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : { scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
)

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartBouncing, setIsCartBouncing] = useState(false)
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const { itemCount } = useAppSelector((state) => state.cart)

  const siteLogo = '/icons/Navbar/g10.png'
  const Location = "/icons/Navbar/loc.png"
  const SearchIcon = "/icons/Navbar/search.png"
  const SignIn = "/icons/Navbar/human.png"
  const Like = "/icons/Navbar/Like.png"
  const Cart = "/icons/Navbar/Shop.png"
  const downAccord = "/icons/Navbar/down-accord.png"

  const handleLogout = () => {
    dispatch(logout())
    setIsMenuOpen(false)
  }

  const handleCartClick = () => {
    setIsCartBouncing(true)
    setTimeout(() => setIsCartBouncing(false), 500)
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/category', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  const hoverVariants = {
    hover: { scale: 1.05, opacity: 0.8 }
  }

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* First Section */}
      <AnimatePresence>
        <motion.section
          className="bg-[#634C9F] h-10 text-xs text-white px-4 flex justify-around items-center flex-wrap lg:flex-nowrap"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.span className="truncate" variants={childVariants}>
            FREE delivery & 40% Discount for next 3 orders! Place your 1st order In.
          </motion.span>
          <motion.div
            className="flex gap-1 lg:gap-2 text-slate-200 items-center text-[11px] sm:text-xs"
            variants={childVariants}
          >
            <span>Ends in:</span>
            <p><span className="text-white font-bold">47</span>d</p>
            <p><span className="text-white font-bold">06</span>h</p>
            <p><span className="text-white font-bold">55</span>m</p>
            <p><span className="text-white font-bold">51</span>s</p>
          </motion.div>
        </motion.section>
      </AnimatePresence>

      {/* Second Section */}
      <AnimatePresence>
        <motion.section
          className="hidden md:flex text-[#6B7280] border-b border-[#E5E7EB] text-[11px] px-4 py-2 justify-around"
          initial="hidden"
          animate="visible"
          variants={{ ...sectionVariants, transition: { delay: 0.2 } }}
        >
          <motion.div
            className="flex gap-3 items-center flex-wrap"
            variants={childVariants}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div variants={childVariants}>
              <Link href={''}>About Us</Link>
            </motion.div>
            <motion.div variants={childVariants}>
              <Link href={''}>My account</Link>
            </motion.div>
            <motion.div variants={childVariants}>
              <Link href={''}>Wishlist</Link>
            </motion.div>
            <motion.p className="pl-4 border-l border-[#E5E7EB]" variants={childVariants}>
              Delivery: <span className="text-[#EA580C] font-bold">7:00 to 23:00</span>
            </motion.p>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            variants={childVariants}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div variants={childVariants}>
              <DropDown text={"English"} href={''} width={7.78} height={10} />
            </motion.div>
            <motion.div variants={childVariants}>
              <DropDown text={"USD"} href={''} width={7.78} height={10} />
            </motion.div>
            <motion.div variants={childVariants}>
              <Link href={''}>Order Tracking</Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </AnimatePresence>

      {/* Third Section */}
      <AnimatePresence>
        <motion.section
          className="w-full border-b border-[#E5E7EB] px-4 py-3 flex flex-col gap-2 lg:flex-row items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={{ ...sectionVariants, transition: { delay: 0.4 } }}
        >
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Image src={siteLogo} width={45} height={39.12} alt="logo" />
              <motion.span
                className="font-bold text-xl sm:text-2xl text-black"
                whileHover={{ scale: 1.05 }}
              >
                JinStore
              </motion.span>
            </motion.div>
          </Link>

          <motion.div
            className="hidden sm:grid grid-cols-[auto_1fr] gap-x-2 items-center"
            variants={childVariants}
            whileHover="hover"
            variants={hoverVariants}
          >
            <Image src={Location} width={19} height={23} alt="location" />
            <div>
              <p className="text-[10px]">Deliver to</p>
              <p className="text-sm font-medium">All</p>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:flex w-full sm:w-2/3 lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src={SearchIcon}
              width={20}
              height={20}
              alt="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              className="w-full h-10 rounded-lg bg-[#F3F4F6] text-sm text-[#6B7280] pl-10 pr-4 outline-none border-2 focus:border-blue-300 transition-colors"
              placeholder="Search for products, categories or brands..."
            />
          </motion.div>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  variants={childVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                    <Image src={SignIn} width={20} height={22} alt="signin" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <AnimatePresence>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white/95 backdrop-blur-md border-2"
                  asChild
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Badge
                          variant="secondary"
                          className="mt-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200"
                        >
                          {user?.accountType}
                        </Badge>
                      </motion.div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer">
                        <Package className="mr-2 h-4 w-4" />
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </motion.div>
                </DropdownMenuContent>
              </AnimatePresence>
            </DropdownMenu>
          ) : (
            <motion.div
              className="hidden sm:flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                    Login
                  </Button>
                </motion.div>
              </Link>
              <Link href="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          )}

          <motion.div
            className="flex items-center gap-4"
            variants={childVariants}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div
              className="relative"
              variants={childVariants}
              whileHover="hover"
              variants={hoverVariants}
            >
              <Image src={Like} width={24} height={21} alt="like" />
              <Important text={0} background="red" percentage="full" size="sm" />
            </motion.div>
            <Link href="/cart" onClick={handleCartClick}>
              <motion.div
                className="relative"
                variants={childVariants}
                whileHover="hover"
                variants={hoverVariants}
              >
                <CartBounce isAdding={isCartBouncing}>
                  <Image src={Cart} width={24} height={20} alt="cart" />
                  <AnimatePresence>
                    {itemCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2"
                      >
                        <Badge
                          variant="destructive"
                          className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 border-0"
                        >
                          {itemCount}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CartBounce>
              </motion.div>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="lg:hidden"
                >
                  <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                    <Menu className="h-5 w-5" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent className="bg-white/95 backdrop-blur-md">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <motion.div
                  className="mt-6 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      className="w-full h-10 rounded-lg bg-[#F3F4F6] text-sm text-[#6B7280] pl-10 pr-4 outline-none border-2 focus:border-blue-300 transition-colors"
                      placeholder="Search for products, categories or brands..."
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Link
                          href={item.href}
                          className="block px-3 py-2 text-sm font-medium hover:bg-blue-50 rounded-md transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile Auth Options */}
                  {!isAuthenticated && (
                    <div className="space-y-2">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start hover:bg-blue-50">
                          Login
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </motion.section>
      </AnimatePresence>

      {/* Fourth Section */}
      <AnimatePresence>
        <motion.section
          className="border-b border-[#E5E7EB] text-black px-4 py-2 text-sm flex flex-wrap justify-around items-center"
          initial="hidden"
          animate="visible"
          variants={{ ...sectionVariants, transition: { delay: 0.6 } }}
        >
          <motion.nav
            className="hidden lg:flex gap-4 flex-wrap"
            variants={childVariants}
            transition={{ staggerChildren: 0.1 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                variants={childVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-[#6B7280] hover:text-blue-600 transition-colors relative group"
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            className="flex gap-4 mt-2 sm:mt-0 flex-wrap"
            variants={childVariants}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div
              variants={childVariants}
              whileHover="hover"
              variants={hoverVariants}
            >
              <DropDown text="Trending Products" href="" width={9.9} height={5.3} />
            </motion.div>
            <motion.div
              variants={childVariants}
              whileHover="hover"
              variants={hoverVariants}
            >
              <Link href="" className="flex items-center gap-1.5 text-[#DC2626]">
                Almost Finished
                <span className="bg-gradient-to-r from-[#DC2626] to-[#EA580C] font-bold text-[10px] rounded-sm p-0.5 text-white">
                  SALE
                </span>
                <Image src={downAccord} width={9.9} height={5.31} alt="" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </AnimatePresence>
    </motion.nav>
  )
}

export default NavBar