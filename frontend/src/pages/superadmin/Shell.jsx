import React from "react";
import { Bell, ChevronRight, Sparkles } from "lucide-react";
import Sidebar from "../../components/superadmin/Sidebar";

function Shell({ title, children }) {
  return (
    <div className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-[#f7f8fc]">
      <div className="pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-5 p-3 sm:p-5 lg:flex-row lg:gap-0 lg:p-6">
        <Sidebar />
        <section className="min-w-0 flex-1 lg:pl-8">
          <div className="relative mb-7 flex flex-col gap-4 rounded-3xl border border-white/80 bg-white/65 px-5 py-4 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600"><Sparkles size={13} /> ShopX command center <ChevronRight size={13} className="text-slate-300" /> Overview</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:block">● Systems online</div>
              <button type="button" aria-label="Notifications" className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:text-indigo-600"><Bell size={17} /></button>
            </div>
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}

export default Shell;
