import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivity } from "../../redux/features/activitySlice";
import Shell from "./Shell";
import ActivityItem from "../../components/superadmin/ActivityItem";
import { Activity as ActivityIcon, RefreshCw } from "lucide-react";
function Activity() {
    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state) => state.activity);
    useEffect(() => { dispatch(fetchActivity()); }, [dispatch]);
    return <Shell title="Activity">
        <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-xl shadow-indigo-100/30 backdrop-blur">
            <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200"><ActivityIcon size={20} /></div><div><h2 className="font-bold text-slate-900">Workspace activity</h2><p className="text-sm text-slate-500">A live timeline of users and orders</p></div></div>
                <button type="button" onClick={() => dispatch(fetchActivity())} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600"><RefreshCw size={15} className={isLoading ? "animate-spin" : ""} /> Refresh</button>
            </div>
            <div className="px-6 sm:px-8">{isLoading && !items.length ? <div className="space-y-5 py-6">{[1, 2, 3].map((item) => <div key={item} className="flex animate-pulse gap-4"><div className="h-10 w-10 rounded-xl bg-slate-100" /><div className="flex-1 space-y-2 pt-1"><div className="h-3 w-3/4 rounded bg-slate-100" /><div className="h-2 w-1/3 rounded bg-slate-100" /></div></div>)}</div> : items.length ? items.map((item) => <ActivityItem key={item.id} item={item} />) : <div className="py-16 text-center"><ActivityIcon className="mx-auto text-slate-300" size={32} /><p className="mt-3 font-semibold text-slate-700">No activity yet</p><p className="mt-1 text-sm text-slate-500">New users and orders will appear here.</p></div>}</div>
        </div>
    </Shell>;
}
export default Activity;
