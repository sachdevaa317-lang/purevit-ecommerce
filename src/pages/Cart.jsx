import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
export default function Cart() {
  const { cart, setCart } = useCart();
  const [couponName,setCouponName] = useState("");
  const [couponError,setCouponError] = useState(null);
  const [appliedCoupon,setAppliedCoupon] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
  }, []);

    const total = cart.reduce(
    (sum, item) => sum + item.DiscountPrice * item.quantity,
    0
  );

const HandleCouponApply = async () => {

    setCouponError("");

    if (!couponName.trim()) {
        setAppliedCoupon(null);
        toast.error("Please enter a coupon code");
        return;
    }

    try {

        const res = await axios.get(
            `https://localhost:7017/api/CouponMaster/GetCouponByName/${couponName}`
        );

        const result = res.data;

        if (result.success) {

            if (total < result.data.minimumOrderAmount) {

                setAppliedCoupon(null);

                toast.warning(
                    `Minimum order amount is ₹${result.data.minimumOrderAmount}`
                );

                return;
            }

            setAppliedCoupon(result.data);

            toast.success("Coupon applied successfully! 🎉");
        }
        else {

            setAppliedCoupon(null);

            toast.error(
                result.message || "Invalid coupon code"
            );
        }

    }
    catch (err) {

        setAppliedCoupon(null);

        toast.error(
            err.response?.data?.message ||
            "Invalid or expired coupon code"
        );
    }
};

let discountAmount = 0;
if(appliedCoupon)
{
if(appliedCoupon.couponType == "Flat")
{
  discountAmount = appliedCoupon.discountValue;
}
else if(appliedCoupon.couponType == "Percentage")
{
  discountAmount = (total * appliedCoupon.discountValue) /100;
}
if(appliedCoupon.maximumDiscount && discountAmount > appliedCoupon.maximumDiscount)
{
  discountAmount = appliedCoupon.maximumDiscount
}
}

const finalTotal = Math.max(0,total - discountAmount);
  // function to increase quantity of a product in the cart
  
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.ProductId === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // function to decrease quantity of a product in the cart
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item.ProductId === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // function to remove a product from the cart
  const removeProduct = (id) => {
    const updatedCart = cart.filter(
      item => item.ProductId !== id
    );

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

 


  const CheckLoginIn = () => {
    const isLogin = localStorage.getItem("IsLogin");
    if (!isLogin) {
      alert("Please login to continue");
      navigate("/login");
    }
    else {
      navigate("/checkout");
    }
  }

    
  

  return (
    <>
      <Header />

      <div className="px-4 md:px-16 py-10 grid md:grid-cols-3 gap-8">

        {/* LEFT SIDE - CART ITEMS */}
        <div className="md:col-span-2">

          <h2 className="text-xl font-semibold mb-6">
            Your Cart • {cart.length} Items
          </h2>
          {/* MAIN PRODUCT */}
          {cart.map((item) => (
            <div
              key={item.ProductId}
              className="flex gap-4 border-b pb-6 mb-6"
            >
              <img
                src={`https://localhost:7058${item.productImage}`}
                className="w-20 h-20 object-contain bg-gray-100 rounded-xl"
              />

              <div className="flex-1">
                <p className="font-semibold">
                  {item.productName}
                </p>

                <p className="text-sm text-gray-500">
                  {item.size}
                </p>

                <div className="flex items-center gap-2 mt-3">

                  <button
                    onClick={() => decreaseQty(item.ProductId)}
                    className="bg-gray-200 px-3 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.ProductId)}
                    className="bg-gray-200 px-3 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeProduct(item.ProductId)}
                    className="ml-5 text-red-500"
                  >
                    Remove
                  </button>

                </div>
              </div>

              <div>
                ₹{item.DiscountPrice * item.quantity}
              </div>
            </div>
          ))}

        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="bg-gray-50 p-6 rounded-2xl h-fit">

          {/* COUPON */}
          <div className="flex gap-2 mb-4">
            <input
              placeholder="Apply Coupon"
              className="border px-3 py-2 rounded-full w-full text-sm"
              value={couponName}
              onChange={(e) => setCouponName(e.target.value)}
            />
            <button className="bg-black text-white px-4 rounded-full text-sm" onClick={HandleCouponApply}>
              Apply
            </button>
          </div>

          {/* SUMMARY */}
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Shipping</span>
            <span>FREE</span>
          </div>



 {appliedCoupon && (
            <div className="flex justify-between text-green-600 mb-2">
              <span>Discount</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}


          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>

          {/* CHECKOUT BUTTON */}

          <button className="w-full mt-6 bg-black text-white py-3 rounded-full text-sm font-medium" onClick={CheckLoginIn}>
            Proceed to Checkout
          </button>

        </div>

      </div>
    </>
  );
}