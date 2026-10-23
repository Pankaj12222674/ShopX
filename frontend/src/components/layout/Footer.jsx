import React from "react";
const currentYear = new Date().getFullYear();
function Footer() { return <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">© {currentYear} ShopX. All rights reserved.</footer>; }
export default Footer;
