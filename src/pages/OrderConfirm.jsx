import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "./Footer";
import axios from "axios";
import BASE_URL from "../ApiService/Baseurl";

export default function OrderConfirm() {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        let orderId = localStorage.getItem("OrderId");

        if (!orderId) return;

        orderId = String(orderId).split(":")[0].replace(/[^0-9]/g, "");

        const res = await axios.get(
          `https://localhost:7017/api/PlaceOrder/GetOrderData/${orderId}`
        );

        console.log("API RAW RESPONSE:", res.data);

        let parsedData = res.data.orderData || res.data.OrderData || res.data;

        // Handle double serialized string JSON from backend
        if (typeof parsedData === "string") {
          try {
            parsedData = JSON.parse(parsedData);
          } catch (e) {
            console.error("First JSON parse error", e);
          }
        }

        if (typeof parsedData === "string") {
          try {
            parsedData = JSON.parse(parsedData);
          } catch (e) {
            console.error("Second JSON parse error", e);
          }
        }

        if (Array.isArray(parsedData)) {
          setOrderDetails(parsedData);
        } else if (typeof parsedData === "object" && parsedData !== null) {
          setOrderDetails([parsedData]);
        }
      } catch (error) {
        console.error("Fetch Order Error:", error);
      }
    };

    fetchOrderData();
  }, []);

  const firstItem = orderDetails[0] || {};
  console.log("ORDER DETAILS:", orderDetails);
  return (
    <div className="min-h-screen p-4 sm:p-8 font-sans text-[#1A1A1A]">
      <Header />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 my-6">

        {/* LEFT SECTION */}
        <div className="bg-[#F3F4F6] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-6 text-black">Order Details</h1>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 font-medium">Order ID</p>
                <p className="text-base font-medium text-black mt-0.5">
                  #{firstItem.OrderId || firstItem.orderId || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">Order Placed On</p>
                <p className="text-base font-medium text-black mt-0.5">
                  {firstItem.OrderDate || firstItem.orderDate || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">Order Total</p>
                <p className="text-base font-medium text-black mt-0.5">
                  ₹{firstItem.TotalPayment || firstItem.totalPayment || 0}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">Shipping Method</p>
                <p className="text-base font-medium text-black mt-0.5">Standard Delivery</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">E-Mail</p>
                <p className="text-base font-medium text-black mt-0.5">
                  {firstItem.Email || firstItem.email || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                <p className="text-base font-medium text-black mt-0.5">
                  +91 {firstItem.MobileNo || firstItem.mobileNo || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-black">Billing Address</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  {firstItem.FullAddress || firstItem.fullAddress || firstItem.Address || "Address Delivered"}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-black">Payment Method</p>
              <p className="text-sm text-gray-600 mt-0.5">
                {firstItem.PaymentMethod || firstItem.paymentMethod || "COD"}
              </p>
              <p className="text-sm text-gray-600">
                Status: {firstItem.PaymentStatus || firstItem.paymentStatus || "Pending"}
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-black text-white text-sm font-semibold py-3.5 px-6 rounded-full"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-[#F3F4F6] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-4">Ordered Items</h2>

            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
              {orderDetails.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200">
                  <div className="w-16 h-16 bg-white rounded-lg p-1 border border-gray-200 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={`${BASE_URL}${item.ProductImage || item.productImage}`}
                      alt={item.ProductName || item.productName || "Product"}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">
                      {item.ProductName || item.productName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.Quantity || item.quantity}</p>
                  </div>
                  <div className="text-right font-medium text-black text-sm">
                    ₹{item.Price ? item.Price * (item.Quantity || 1) : (item.TotalPayment || item.totalPayment)}
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-300 my-6" />

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium text-black">
                <span>Order Subtotal</span>
                <span>₹{firstItem.TotalPayment || firstItem.totalPayment || 0}</span>
              </div>

              <div className="flex justify-between text-sm font-medium">
                <span className="text-emerald-600">Shipping</span>
                <span className="text-emerald-600">FREE</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-black pt-2 border-t">
                <span>Total Paid</span>
                <span>₹{firstItem.TotalPayment || firstItem.totalPayment || 0}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-gray-400">Including all taxes</p>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}