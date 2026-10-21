import api from "../ApiService/api";

const GetAllCoupons = async () => {
    const response = await api.get("/api/CouponMaster/GetAllCoupons");
                return JSON.parse(response.data.coupons);
                
}

const AddNewCoupon = async (data) => {
  const response = await api.post("/api/CouponMaster/AddCoupon", data);
    return response.data;
}

const UpdateCoupon = async (selectedId ,data) => {
        const response = await api.put(`/api/CouponMaster/UpdateCoupon/${selectedId}`, data);
         return response.data;

}


const DeleteCoupon = async (CouponId) => {
     const res = await api.delete(`/api/CouponMaster/DeleteCoupon/${CouponId}`)
      return res.data;
}

const ActiveCoupon = async (item ,UpdateActive) => {
           const res = await api.put(`/api/CouponMaster/UpdateCoupon/${item.CouponId}`, UpdateActive);
return res.data;
}
const CouponMasterService = {
    GetAllCoupons,
    AddNewCoupon,
    UpdateCoupon,
    DeleteCoupon,
    ActiveCoupon
}
export default CouponMasterService;