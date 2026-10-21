import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../pages/Footer';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {

    const location = useLocation();
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // logic for dob 
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);


    const SendUserData = async () => {
        if (!fullname) {
            alert("Please Enter a FullName");
            return;
        }
        if(!email)
        {
  alert("Please Enter a Valid Email Address");
            return;
        }
         
            if(!mobileno)
        {
  alert("Please Enter a Valid Mobile Number");
            return;
        }
            if(!gender)
        {
  alert("Please Select The Gender");
            return;}
        if(!dob)
        {
  alert("Please Enter Your Date Of Birth");
            return;
        }     if(!password)
        {
  alert("Please Enter a Valid Password");
            return;
        }


        try {
            const sendotp = await axios.post(
                "https://localhost:7058/api/Auth/SendOtp",
                {
                    email: email,
                    source : "signup"
                }

            );
            // handle either possible spelling from backend
            if (sendotp.data?.isAlreayExist === true || sendotp.data?.isAlreadyExist === true) {
                alert(sendotp.data?.message || "User already exists");
                navigate("/login");
                return;
            }

           
            const response = await axios.post("https://localhost:7058/api/Signup/Signup",
                {
                    fullName: fullname,
                    email: email,
                    mobileNo: mobileno,
                    gender: gender,
                    dateOfBirth: dob,
                    password: password
                }
            )

            alert("Please Enter The OTP");
            console.log(response.data);

          
           
             navigate("/verifyotp", {
                state: {
                    email: email,
                    source : "signup"
                }
            });
            
           localStorage.setItem("IsLogin", "true");
            localStorage.setItem("email", email);
            localStorage.setItem("fullname", response.data.fullName);
            localStorage.setItem("UserId", response.data.userId);
        }
        catch (error) {
            alert(error.response.data.message);
                      

            
            console.log(error.response.data.message);
        }
    }


    return (
        <div>
            <Header />
            <div style={{ backgroundColor: "rgba(0,0,0,0.4)", minHeight: "70vh" }} className="d-flex justify-content-center align-item-center p-5">
                <div className="shadow rounded pill p-5" style={{ width: "450px", background: "white", minHeight: '50vh' }}>
                    <h2 className="text-center mt-2">Sign Up</h2>

                    <input
                        type="text"
                        placeholder="Enter Full Name"
                        className="form-control m-3"
                        value={fullname}
                        onChange={(e) =>
                            setFullname(e.target.value.replace(/[^a-zA-Z ]/g, ""))
                        }
                    />



                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="form-control m-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />



                    <input
                        type="text"
                        placeholder="Enter Mobile Number"
                        className="form-control m-3"
                        maxLength={10}
                        inputMode="numeric"
                        value={mobileno}
                        onChange={(e) => setMobileno(e.target.value.replace(/\D/g, ""))}
                    />




                    <select onChange={(e) => setGender(e.target.value)} className="form-control m-3" value={gender}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>

                    </select>


                    <input
                        type="date"
                        className="form-control m-3"
                        value={dob}
                        max={maxDate.toISOString().split("T")[0]}
                        onChange={(e) => setDob(e.target.value)}
                    />


                    <div className="position-relative m-3 w-100">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control pe-5"
                            placeholder="Enter Password"
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


                    <button onClick={SendUserData} className="btn btn-dark mt-2 rounded pill w-100">
                        Sign Up
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}


