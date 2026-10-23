import React from "react";
function OrderStatusBadge({ status }) { return <span className="rounded-full bg-purple-100 px-3 py-1.5 text-xs font-semibold capitalize text-purple-700">{status || "processing"}</span>; }
export default OrderStatusBadge;
