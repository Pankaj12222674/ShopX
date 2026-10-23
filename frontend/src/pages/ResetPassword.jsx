import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/features/authSlice";
import { toast } from "sonner";

function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const submit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match");
    const result = await dispatch(resetPassword({ token, password: form.password }));
    if (resetPassword.fulfilled.match(result)) {
      toast.success(result.payload.message);
      navigate("/auth/login");
    } else toast.error(result.payload || "Unable to reset password");
  };
  return <div><h1 className="text-3xl font-bold text-slate-900">Set a new password</h1><p className="mt-2 text-sm text-slate-500">Use at least 8 characters.</p><form onSubmit={submit} className="mt-6 space-y-5">
    {["password", "confirmPassword"].map((field) => <div className="relative" key={field}><Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input required minLength="8" type="password" value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} placeholder={field === "password" ? "New password" : "Confirm new password"} className="w-full rounded-xl border border-slate-200 px-10 py-3 outline-none focus:border-indigo-500" /></div>)}
    <button className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">Reset password</button>
  </form><Link to="/auth/login" className="mt-6 block text-center text-sm font-semibold text-indigo-600">Back to login</Link></div>;
}
export default ResetPassword;
