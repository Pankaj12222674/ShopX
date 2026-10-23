import React from "react";
import { Link } from "react-router-dom";
import RoleBadge from "./RoleBadge";
import StatusBadge from "./StatusBadge";
function UserTable({ users }) { return <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4">User</th><th>Role</th><th>Status</th><th>Joined</th><th /></tr></thead><tbody className="divide-y divide-slate-100">{users.map((user) => <tr key={user._id || user.id}><td className="px-5 py-4"><p className="font-semibold text-slate-900">{user.name}</p><p className="text-slate-500">{user.email}</p></td><td><RoleBadge role={user.role} /></td><td><StatusBadge active={user.isActive} /></td><td className="text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td><td><Link className="font-semibold text-purple-600 hover:text-purple-800" to={`/superadmin/users/${user._id || user.id}`}>View</Link></td></tr>)}</tbody></table>{users.length === 0 && <p className="p-8 text-center text-slate-500">No users found.</p>}</div>; }
export default UserTable;
