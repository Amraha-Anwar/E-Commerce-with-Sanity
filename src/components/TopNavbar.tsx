import Link from "next/link";
import { Check } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { CircleAlert } from "lucide-react";

export default function TopNavbar() {
  return (
    <>
      <nav className="max-w-screen-2xl mx-auto overflow-x-hidden">
        <div className="flex justify-between px-3 lg:px-28 bg-customBlue w-full h-12">
          <div className="flex items-center text-white text-sm font-light">
            <Check />
            <h3>Free Shipping On All Orders Over $50</h3>
          </div>
          <div className="gap-6 text-white flex justify-between items-center">
            <div className="hidden lg:block">
            <div className=" flex font-light">
              <button className="flex">
                Eng <ChevronDown />
              </button>
            </div></div>

            <Link className="text-white font-light" href="/faqs">
              Faqs
            </Link>
            <div className="hidden lg:block">
            <div className=" flex gap-2 text-white font-light">
              <CircleAlert />
              <h2>Need Help</h2>
            </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
