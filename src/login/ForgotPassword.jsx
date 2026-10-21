import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../components/Header';
import Footer from '../pages/Footer';
export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const sendotp = async () => {
        if (!email) {
            alert("Please enter email");

            return;
        }

        try {
            const response = await axios.post(
                "https://localhost:7058/api/Auth/SendOtp",
                {
                    email: email,
                    source : "ForgotPassword"
                }

            );
       
                navigate("/verifyotp", {
                    state: {
                        email: email,
                        source : "ForgotPassword"
                    }
                });
            alert(response.data.message);


            console.log(response.data.message);



        }
        catch (error) {
           console.log(error.response.data);
    console.log(typeof error.response.data);
    console.log(error.response.data.message);

    alert(error.response.data.message);
        }
    };


    
  return (
    <div>
        <Header />

        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                minHeight: "80vh"
            }}
        >
            <div
                className="bg-white p-5 rounded shadow"
                style={{ width: "450px" }}
            >
                <h2 className="text-center mb-4">Forgot Password</h2>

                <h5>Enter Your Email</h5>

                <input
                    type="email"
                    className="form-control mt-3"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    type="button"
                    className="btn btn-dark w-100 mt-4 rounded-pill"
                    onClick={sendotp}
                >
                    Send OTP
                </button>
            </div>
        </div>

        <Footer />
    </div>
);
}