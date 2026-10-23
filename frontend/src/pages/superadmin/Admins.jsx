import React from "react";
import { useSelector } from "react-redux";
import Shell from "./Shell";
import UserTable from "../../components/superadmin/UserTable";
function Admins() { const users = useSelector((state) => state.superadminUsers.users).filter((user) => user.role === "admin" || user.role === "superadmin"); return <Shell title="Administrators"><UserTable users={users} /></Shell>; }
export default Admins;
