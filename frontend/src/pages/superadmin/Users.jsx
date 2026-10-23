import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/features/userSlice";
import Shell from "./Shell";
import UserFilters from "../../components/superadmin/UserFilters";
import UserTable from "../../components/superadmin/UserTable";
function Users() { const dispatch = useDispatch(); const { users, isLoading, error } = useSelector((state) => state.superadminUsers); const [search, setSearch] = useState(""); const [role, setRole] = useState("all"); useEffect(() => { dispatch(fetchUsers()); }, [dispatch]); const filtered = useMemo(() => users.filter((user) => (role === "all" || user.role === role) && `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())), [users, role, search]); return <Shell title="Users"><UserFilters {...{ search, setSearch, role, setRole }} />{error && <p className="mb-4 text-sm text-red-600">{error}</p>}{isLoading ? <p>Loading users...</p> : <UserTable users={filtered} />}</Shell>; }
export default Users;
