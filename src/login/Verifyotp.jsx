import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../pages/Footer';
export default function VerifyOtp() {
    const Location = useLocation();
    const email = Location.state?.email;
    const source = Location.state?.source;

    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [verifyotp, setVerifyotp] = useState("");
    const Verifyotp = async () => {
        if (!otp) {
            alert("Please enter otp");
            return;
        }
        try {
            const response =
                await axios.post(
                    "https://localhost:7058/api/Auth/VerifyOtp",
                    {
                        email: email,
                        otp: otp
                    }
                );

            alert(response.data.message);
            if (source == "ForgotPassword") {
                navigate("/newpassword", {
                    state: {
                        email: email
                    }
                });

            }
            else {
                navigate("/");
            }


        }
        catch (error) {
            console.log(error.response.data.message);
            console.log(error.response.data.errors);
            alert(error.response.data.message);
        }


    }

    const ResendOtp = async () => {
        try {
            const response = await axios.post(
                "https://localhost:7058/api/Auth/SendOtp",
                {
                    email: email
                }
            );

            alert(response.data.message);
        }
        catch (error) {
            alert(error.response.data);
        }
    };
    return (
        <div>
            <Header />
            <div style={{ backgroundColor: "rgba(0,0,0,0.4)", minHeight: "70vh" }} className="d-flex align-item-center justify-content-center p-5">
                <div style={{ width: "450px", background: "white", minHeight: '30vh' }} className="shadow p-5 rounded">
                    <h2 className="text-center">Verify OTP</h2>
                    <p className="text-center">Please Enter Your OTP To Verify</p>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setOtp(value);
                        }}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        className="form-control mt-4 mb-4"
                    />            <p onClick={ResendOtp}>Resend OTP</p>
                    <button type="button" onClick={Verifyotp} className="btn btn-dark mt-2 rounded pill w-100">Verify OTP</button>
                </div>

            </div>

            <Footer />
        </div>
    )
}