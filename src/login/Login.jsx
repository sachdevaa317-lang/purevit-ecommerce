import axios from "axios";
import { useState } from "react";
import Header from '../components/Header';
import Footer from '../pages/Footer';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
export default function Login()
{
    const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
const forgetpassword = () =>
{
navigate("/sendotp")
}
        const Logincheck = async() =>
        {
if(!email)
{
    alert("Please Enter The Valid Email Address");
    return;
}
if(!password)
{
    alert("Please Enter The Password");
    return;
}

 const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
        alert("Please enter a valid Gmail address");
        return;
    }

try
{
    const response = await axios.post("https://localhost:7058/api/Auth/loginapi",
        {
            email : email,
            password : password
        }
    );
   if (response.data.success)
{
    localStorage.setItem("IsLogin", "true");
    localStorage.setItem("email", email);
    localStorage.setItem("UserId", response.data.userId);

    navigate("/");
}
 
alert(response.data.message);
}
catch(error)
{
   
  console.log(error.response?.data);
    alert(error.response?.data?.message);
}


 
        }
  


    return(
        <div className="container-fluid">
<Header/>
<div>
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{background:'rgba(0,0,0,0.4)'}}>
<div className="shadow rounded p-5 m-5" style={{background:"#fff"}}>
    <h2 className="m-3 text-center">LOGIN</h2>

<input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3"></input>
                <div className="position-relative mb-3 w-100">
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
<button  className="btn btn-dark w-100 rounded-pill" onClick={Logincheck}>Log in</button>
<Link to="/forgot">
<button className="btn w-100 rounded-pill mt-3" onClick={forgetpassword}>Forgotten Password ?</button>

</Link>
<Link to="/signup">
<button className="btn btn-primary w-100 rounded-pill mt-5">Create New Account</button>
</Link>
    </div>
        </div>
</div>
<Footer/>
        </div>
    )
}