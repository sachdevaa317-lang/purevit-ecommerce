import Header from '../components/Header';
import Footer from '../pages/Footer';
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from 'axios';

export default function MyAccount() {
    const[fullname,setFullname] = useState("");
    const[email,setEmail] = useState("");
    const[mobileno,setMobileno] = useState("");
    const[gender,setGender] = useState("");
    const[dob,setDob] = useState("");
    const userEmail = localStorage.getItem("email");
    const navigate = useNavigate();

  useEffect(() => {
    const UserData = async () =>
{
  
try{
    const response = await axios.get(`https://localhost:7058/api/Auth/getuserbyid/${userEmail}`)
    setFullname(response.data.fullname);
    setEmail(response.data.email);
    setMobileno(response.data.mobileNo);
    setGender(response.data.gender);
    setDob(response.data.dateofbirth);

}
catch(error)
{
    console.log(error.response.data);
    alert(error.response.data);  
    console.log(location);
console.log(location.state);
console.log(location.state?.email);
}
}
      UserData();  

    },[])
//logout logic
const Logout = () =>
{
    localStorage.removeItem("IsLogin");
    localStorage.removeItem("email");
    navigate("/")
}
    return (
  <div className="container-fluid">
<Header />
<div>
    <div className='container-fluid pt-5 pb-5' style={{background:"rgba(0,0,0,0.4)"}}>
        <div className='row'>
            <div className='col-6 col-xl-6 col-md-6'>
                  <div className=' rounded shadow p-5'style={{background:"#fff"}} >

            <h2 className='text-center m-3'>My Account</h2>


            <p>
                <strong>Full Name :</strong> {fullname}
            </p>

            <p>
                <strong>Email :</strong> {email}
            </p>

            <p>
                <strong>Mobile No :</strong> {mobileno}
            </p>

            <p>
                <strong>Gender :</strong> {gender}
            </p>

            <p>
                <strong>Date Of Birth :</strong> {dob}
            </p>
            <button className='btn btn-danger'onClick={Logout}>logout</button>
            </div>
                </div>
                 <div className='col-6 col-xl-6 col-md-6'>
                                    <div className=' rounded shadow p-5' style={{background:"#fff"}}>

            <h2 className='text-center m-3 ' style={{minHeight:'32vh'}}>Order Details</h2>
            </div>
                </div>
        </div>
        </div>
  
            </div>

<Footer />
        </div>
    );
}