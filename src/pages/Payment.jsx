import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Payment({ selectedAddress }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePayNow = async () => {
        try {
            // USER
            const userId = localStorage.getItem("UserId");
            if (!userId) {
                alert("Please login to continue");
                navigate("/login");
                return;
            }

            // ADDRESS
            if (!selectedAddress) {
                alert("Please select delivery address");
                return;
            }

            // CART
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart.length === 0) {
                alert("Your cart is empty");
                return;
            }

            // CALCULATE TOTAL
            const totalPayment = cart.reduce((total, item) => {
                const price = Number(item.DiscountPrice || item.Price);
                const quantity = Number(item.quantity);
                return total + price * quantity;
            }, 0);

            // PREPARE ORDER DETAILS FOR BACKEND
            const formattedOrderDetails = cart.map(item => ({
                productId: Number(item.ProductId),
                quantity: Number(item.quantity),
                price: Number(item.DiscountPrice || item.Price)
            }));

            // 1. CREATE RAZORPAY & DB PENDING ORDER
            setLoading(true);
            const response = await axios.post(
                "https://localhost:7017/api/Payment/CreateRazorpayOrder",
                {
                    amount: totalPayment,
                    userId: Number(userId),
                    orderDetails: formattedOrderDetails
                }
            );

            console.log("RAZORPAY ORDER RESPONSE:", response.data);
            const razorpayData = response.data;

            // RAZORPAY OPTIONS
            const options = {
                key: razorpayData.keyId,
                amount: razorpayData.amount,
                currency: razorpayData.currency,
                name: "Purevit",
                description: "Order Payment",
                order_id: razorpayData.razorpayOrderId,

                // PAYMENT SUCCESS HANDLER
                handler: async function (paymentResponse) {
                    try {
                        console.log("RAZORPAY SUCCESS:", paymentResponse);

                        // 2. VERIFY PAYMENT DATA
                        const verifyData = {
                            orderId: razorpayData.dbOrderId, 
                            razorpayOrderId: paymentResponse.razorpay_order_id,
                            razorpayPaymentId: paymentResponse.razorpay_payment_id,
                            razorpaySignature: paymentResponse.razorpay_signature,
                            orderStatus: "Order Packing"
                        };

                        // BACKEND VERIFY PAYMENT
                        const verifyResponse = await axios.post(
                            "https://localhost:7017/api/Payment/VerifyPayment",
                            verifyData
                        );

                        if (verifyResponse.data.success) {
                            alert("Payment Successful");

                            // Store order ID & Clear Cart
                            localStorage.setItem("OrderId", verifyResponse.data.orderId);
                            localStorage.removeItem("cart");

                            navigate("/orderconfirm");
                        }
                    } catch (error) {
                        console.log("VERIFY ERROR:", error);
                        alert(
                            error.response?.data?.message ||
                            "Payment verification failed"
                        );
                    } finally {
                        setLoading(false);
                    }
                },

                prefill: {
                    name: selectedAddress.firstName + " " + selectedAddress.lastName,
                    email: selectedAddress.email,
                    contact: selectedAddress.mobileNo
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const razorpay = new window.Razorpay(options);

            // Payment failure or modal close tracking
            razorpay.on("payment.failed", function (response) {
                console.log("PAYMENT FAILED:", response);
                alert(response.error?.description || "Payment failed");
                setLoading(false);
            });

            razorpay.open();
        } catch (error) {
            console.log("RAZORPAY ERROR:", error);
            alert(
                error.response?.data?.message ||
                "Unable to create payment"
            );
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center">
                <button
                    className="btn btn-primary w-100 p-2"
                    onClick={handlePayNow}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "PAY NOW"}
                </button>
            </div>
        </div>
    );
}