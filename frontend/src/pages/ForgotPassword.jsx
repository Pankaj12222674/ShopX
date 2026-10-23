import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/features/authSlice";
import { toast } from "sonner";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(forgotPassword(email));
    if (forgotPassword.fulfilled.match(result)) {
      setSubmitted(true);
      toast.success(result.payload.message);
    } else {
      toast.error(result.payload || "Unable to send reset email");
    }
  };

  return <div>
    <h1 className="text-3xl font-bold text-slate-900">Forgot password?</h1>
    <p className="mt-2 text-sm text-slate-500">Enter your email and we will send you a secure reset link.</p>
    {submitted ? <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">If an account exists for this email, a reset link has been sent. Check your inbox.</div> : <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div className="relative"><Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="w-full rounded-xl border border-slate-200 px-10 py-3 outline-none focus:border-indigo-500" /></div>
      <button className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">Send reset link</button>
    </form>}
    <Link to="/auth/login" className="mt-6 block text-center text-sm font-semibold text-indigo-600">Back to login</Link>
  </div>;
}
export default ForgotPassword;
