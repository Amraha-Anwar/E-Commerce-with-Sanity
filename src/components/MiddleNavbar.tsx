"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsCartDash } from "react-icons/bs";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect, useState } from "react";

export default function MiddleNavbar() {
  const { cartCount, handleCartClick } = useShoppingCart();
  const [wishlistCount, setWishlistCount] = useState(0);

  // Fetch wishlist count from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist);
      setWishlistCount(wishlist.length);
    }
  }, []);

  return (
    <>
      <nav className="max-w-screen-2xl mx-auto overflow-x-hidden">
        {/* main div */}
        <div className="flex justify-between bg-customGray w-full h-16 lg:h-20 px-3 lg:px-28 items-center">
          {/* logo */}
          <div className="flex items-center gap-2">
            <Image
              className="w-8 h-8 lg:w-10 lg:h-10"
              src={"/images/logo.png"}
              alt="Logo"
              width={200}
              height={200}
            />
            <h1 className="text-xl">Comforty</h1>
          </div>
          <div className="flex items-center gap-x-3">
            {/* Wishlist button */}
            <div className="bg-white rounded-lg px-2 sm:px-3 py-3 relative">
              <Link href={"/wishlist"}>
                <button className="flex items-center">
                  <Heart />
                  {/* Badge for wishlist count */}
                  <span className="absolute -top-2 -right-2 bg-customDarkBlue text-white rounded-full px-2 py-1 text-xs font-bold">
                    {wishlistCount}
                  </span>
                </button>
              </Link>
            </div>
            {/* Cart button */}
            <div className="bg-white rounded-lg lg:px-3 px-1 py-1">
              <button
                className="relative flex items-center gap-2 sm:gap-1 rounded-[10px] px-2 py-2 lg:px-3 lg:py-2"
                onClick={() => handleCartClick()}
              >
                <BsCartDash className="w-5 h-6" />
                {/* Cart text for large screens */}
                <span className="hidden sm:block">Cart</span>
                {/* Badge to show cart count */}
                <span className="absolute -top-2 -right-2 bg-customDarkBlue text-white rounded-full px-2 py-1 text-xs font-bold">
                  {cartCount || 0}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
