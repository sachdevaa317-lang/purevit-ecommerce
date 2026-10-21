import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanelLogin() {
    const [form,setForm] = useState({
        UserName : "",
        Password : ""
    });
    const navigate = useNavigate();

const VerfiryLogin = async() =>
{
    if(!form.UserName || !form.Password)
    {
        alert("Please Enter The Valid User Name and Password");
        return;
    }   

    const result = await axios.post("https://localhost:7017/api/AdminPanelLogin/AdminPanelLogin",form);
    if(result.data.success)
    {
        navigate("/admin");
    }
}

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
        ...prevForm,
        [name]: value
    }));
};

return(
    <div className="conatiner-fluid">
<div className="d-flex justify-content-center align-items-center" style={{minHeight : "100vh",backgroundColor : "rgba(50, 9, 212, 0.42)"}}>
    <div className="card p-4 shadow" style={{width : "400px"}}>
       <div className="text-center mb-4">
           <h2>Admin Login</h2>
           <input type="text" className="form-control mt-3" placeholder="Enter User Name" name="UserName" value={form.UserName} onChange={handleInputChange}/>
           <input type="password" className="form-control mt-3" placeholder="Enter Password" name="Password" value={form.Password} onChange={handleInputChange}/>
           <button className="btn btn-success w-100 mt-3" onClick={VerfiryLogin}>Login</button>
       </div>
    </div>
    </div>
        </div>
    )
}
