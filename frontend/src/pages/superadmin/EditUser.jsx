import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsers, updateUser } from "../../redux/features/userSlice";
import Shell from "./Shell";
import UserForm from "../../components/superadmin/UserForm";
function EditUser() { const { id } = useParams(); const dispatch = useDispatch(); const navigate = useNavigate(); const user = useSelector((state) => state.superadminUsers.users.find((item) => String(item._id || item.id) === id)); const loading = useSelector((state) => state.superadminUsers.isLoading); const [form, setForm] = useState({ name: "", email: "", phone: "", role: "customer" }); useEffect(() => { if (!user) dispatch(fetchUsers()); else setForm({ name: user.name, email: user.email, phone: user.phone || "", role: user.role }); }, [dispatch, user]); const submit = async (event) => { event.preventDefault(); const result = await dispatch(updateUser({ id, updates: { name: form.name, phone: form.phone, role: form.role } })); if (updateUser.fulfilled.match(result)) navigate(`/superadmin/users/${id}`); }; return <Shell title="Edit user">{user ? <UserForm form={form} setForm={setForm} onSubmit={submit} loading={loading} /> : <p>Loading user...</p>}</Shell>; }
export default EditUser;
