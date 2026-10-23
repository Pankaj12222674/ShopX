import React, { useEffect, useState } from "react";
import { Camera, Mail, Phone, Save, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/features/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const { user, isLoading, isError } = useSelector((state) => state.auth);
  const [form, setForm] = useState(() => ({
    name: user?.name || "",
    phone: user?.phone || "",
  }));
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(() => user?.profileImage || "");
  const [success, setSuccess] = useState("");

  useEffect(() => () => {
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setSuccess("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", form.name.trim());
    data.append("phone", form.phone.trim());
    if (image) data.append("profileImage", image);

    const result = await dispatch(updateProfile(data));
    if (updateProfile.fulfilled.match(result)) {
      setImage(null);
      setSuccess("Your profile was updated successfully.");
    }
  };

  if (!user) return null;

  return (
    <section className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">Account</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">My profile</h1>
          <p className="mt-2 text-sm text-slate-500">Keep your personal details up to date.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="flex h-fit flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="relative">
              {preview ? (
                <img src={preview} alt="Profile preview" className="h-32 w-32 rounded-full object-cover ring-4 ring-purple-100" />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-purple-100 text-purple-600 ring-4 ring-purple-50"><UserRound size={48} /></div>
              )}
              <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700">
                <Camera size={18} />
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-900">{user.name}</h2>
            <p className="text-sm capitalize text-slate-500">{user.role}</p>
            <p className="mt-4 text-xs text-slate-400">JPG, PNG, or WebP up to 5 MB</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Personal information</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
                <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100" />
              </label>
              <div>
                <span className="mb-2 block text-sm font-medium text-slate-700">Email address</span>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"><Mail size={17} />{user.email}</div>
              </div>
              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Phone number</span>
                <span className="relative block"><Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input name="phone" value={form.phone} onChange={handleChange} placeholder="Add phone number" className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100" /></span>
              </label>
            </div>
            {isError && <p className="mt-5 text-sm text-red-600">{isError}</p>}
            {success && <p className="mt-5 text-sm text-emerald-600">{success}</p>}
            <div className="mt-6 flex justify-end"><button disabled={isLoading} className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-60"><Save size={18} />{isLoading ? "Saving..." : "Save changes"}</button></div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
