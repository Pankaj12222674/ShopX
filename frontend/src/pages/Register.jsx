import React from "react";
import { Link } from "react-router-dom";
import { UserRound, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { registerUser } from "../redux/features/authSlice";
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'



function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handelForm = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await dispatch(registerUser(formData))
        if (registerUser.fulfilled.match(result)) {
            console.log(result)
            toast.success(result.payload.message || "successfully registered")
            navigate('/auth/login')
        }
        else {
            toast.error(result.payload.message || "Registration failed!");
            console.error("Registration failed:", result.payload);

        }
    }



    return (
        <div className="w-full">
            {/* Heading */}
            <div className="mb-5">
                <span className="text-xs font-semibold uppercase tracking-[3px] text-indigo-600">
                    ShopX Membership
                </span>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    Create account
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Your next favorite find is just a step away.
                </p>
            </div>

            {/* Form */}
            <form className="space-y-3.5" onSubmit={handleSubmit} >
                {/* Full Name */}
                <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Full name
                    </label>
                    <div className="relative">
                        <UserRound size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handelForm}
                            placeholder="Pankaj Kumar"
                            autoComplete="name"
                            required
                            className="w-full rounded-xl border border-slate-200 bg-white/80 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Email address
                    </label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handelForm}
                            autoComplete="email"
                            required
                            className="w-full rounded-xl border border-slate-200 bg-white/80 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Password
                    </label>
                    <div className="relative">
                        <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Minimum 8 characters"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handelForm}
                            minLength={8}
                            required
                            className="w-full rounded-xl border border-slate-200 bg-white/80 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-[0.99]"
                >
                    Create Account
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </button>
            </form>

            {/* Login Link */}
            <p className="mt-4 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link to="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                    Sign in
                </Link>
            </p>

            <p className="mt-4 text-center text-xs text-slate-400">
                By creating an account, you agree to our Terms & Privacy Policy.
            </p>
        </div>
    );
}

export default Register;