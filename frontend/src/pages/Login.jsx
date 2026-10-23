import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ShoppingBag } from "lucide-react";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { loginUser } from "../redux/features/authSlice";
import {toast} from 'sonner'
 
function Login() {

    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
    const dispatch = useDispatch()
    const handleForm = (e)=>{
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    const handleSubmit = async(e)=>{

        e.preventDefault()
        const result = await dispatch(loginUser(formData))

        if(loginUser.fulfilled.match(result)){
            console.log(result.payload)
            toast.success(result.payload.message || "successfully login")

            
        }else{
            toast.error(result.payload || "login failed")
            console.log(result.payload)
        }
    }


  return (
    <div className="w-full">

      {/* Heading */}
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-2xl bg-indigo-100 p-4">
            <ShoppingBag size={32} className="text-indigo-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to continue shopping with ShopX
        </p>
      </div>

      {/* Login Form */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={formData.email}
              onChange={handleForm}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleForm}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-[0.98]"
        >
          Login
        </button>

      </form>

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Create account
        </Link>
      </p>

    </div>
  );
}

export default Login;