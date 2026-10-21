import api from "../ApiService/api";

const GetAllProducts = async () => {
   
      const res = await api.get("/api/ProductApi/GetAllProducts");
     return JSON.parse(res.data.products);
}

const SearchProducts = async (Productname) => {
      const res = await api.get(`/api/ProductApi/GetProductsBySearch?productname=${Productname}`);
return res.data;
}

 const DeleteProduct = async (ProductId) => {
    
      await api.delete(`/api/ProductApi/RemoveProduct/${ProductId}`);
 }
const AdminService = {
    GetAllProducts,
    SearchProducts,
    DeleteProduct
}

export default AdminService;