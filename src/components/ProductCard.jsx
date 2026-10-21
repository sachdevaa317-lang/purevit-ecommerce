import React from "react";

export default function ProductCard() {
    return (
        <div className="card">

            <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center">
                Product Image
            </div>

            <h3 className="mt-3 font-semibold text-sm">
                Purevit Women 50 Tablets
            </h3>

            <div className="flex items-center gap-2 mt-2">
                <span className="font-bold">₹548.00</span>
                <span className="line-through text-gray-400 text-sm">
                    ₹685.00
                </span>
                <span className="text-green-600 text-xs">SAVE 20%</span>
            </div>
            <p className="text-xs text-gray-500">Read Reviews</p>

            <span className="bg-yellow-200 text-xs px-2 py-1 rounded">
                Value Deal
            </span>

            <p className="text-xs">(₹10.96/count)</p>

            <p className="text-xs text-gray-500">50 Tabs</p>
            <button className="btn-primary mt-4">
                Add to Cart
            </button>
        </div>
    );
}