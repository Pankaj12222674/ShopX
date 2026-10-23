import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "../../redux/features/userSlice";
import Shell from "./Shell";
import UserForm from "../../components/superadmin/UserForm";
function CreateAdmin() { const dispatch = useDispatch(); const navigate = useNavigate(); const { isLoading, error } = useSelector((state) => state.superadminUsers); const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" }); const submit = async (event) => { event.preventDefault(); const result = await dispatch(createAdmin(form)); if (createAdmin.fulfilled.match(result)) navigate("/superadmin/admins"); }; return <Shell title="Create administrator">{error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<UserForm form={form} setForm={setForm} onSubmit={submit} loading={isLoading} submitLabel="Create admin" /></Shell>; }
export default CreateAdmin;
