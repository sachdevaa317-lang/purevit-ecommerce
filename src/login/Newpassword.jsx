import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../pages/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SetNewPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const updatePassword = async () => {
let Email = localStorage.getItem("email");
        if (!password || !confirmPassword) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            const response = await axios.post(
                "https://localhost:7058/api/Auth/UpdatePassword",
                {
                    email: email,
                    password: password
                }
            );

            alert(response.data.message);

            navigate("/login");

            console.log("Email =", email);
            console.log("Password =", password);

        }
        catch (error) {
            console.log(error.response);
            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                JSON.stringify(error.response?.data)
            );
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
                    className="bg-white shadow rounded p-5"
                    style={{ width: "500px" }}
                >

                    <h1 className="text-center mb-4">
                        Set New Password
                    </h1>

                    <div className="position-relative mb-3">

                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control pe-5"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer"
                            }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                    </div>

                    <div className="position-relative mb-4">

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control pe-5"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer"
                            }}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                    </div>

                    <button
                        className="btn btn-dark w-100 rounded-pill"
                        onClick={updatePassword}
                    >
                        Update Password
                    </button>

                </div>

            </div>

            <Footer />

        </div>
    );
}