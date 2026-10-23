import React from "react";
import { Outlet } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import authImage from "../../image/authLayout1.png";

function AuthLayout() {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-slate-950">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={authImage}
          alt="ShopX shopping background"
          className="h-full w-full object-cover opacity-40"
        />

        {/* Transparent Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/60" />
      </div>

      {/* Left Side: Branding */}
      <div className="relative z-10 hidden w-1/2 flex-col justify-center px-12 text-white md:flex lg:px-20">

        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
            <ShoppingBag size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-wide">
            ShopX
          </h1>
        </div>

        <h2 className="max-w-lg text-4xl font-bold leading-tight lg:text-5xl">
          Discover your style.
          <span className="mt-2 block text-indigo-400">
            Shop smarter.
          </span>
        </h2>

        <p className="mt-6 max-w-md text-lg text-white/70">
          Explore products you love and enjoy a seamless shopping experience
          with ShopX.
        </p>
      </div>

      {/* Right Side: Login / Register */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-5 md:w-1/2 md:p-10">

        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl sm:p-10">

          {/* Mobile Branding */}
          <div className="mb-8 flex items-center justify-center gap-2 md:hidden">
            <ShoppingBag size={28} className="text-indigo-600" />
            <h1 className="text-2xl font-bold text-slate-900">
              ShopX
            </h1>
          </div>

          <Outlet />

        </div>
      </div>

    </div>
  );
}

export default AuthLayout;