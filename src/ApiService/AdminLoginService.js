import api from "../ApiService/api";

 const Login = async (email, password) => {
      const response = await api.post(
        "/api/Login/AdminLogin",
        {
          Email: email,
          Password: password
        }
      )
      return response.data;
    }

    const AdminLoginService = {
        Login
    };
    export default AdminLoginService;