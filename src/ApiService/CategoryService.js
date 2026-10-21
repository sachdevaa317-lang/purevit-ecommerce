import api from "../ApiService/api";

const GetAllCateories = async () => {
    const response = await api.get("/api/Category/GetCategories");
    return response.data;

}

const DeleteCategory = async (CategoryId) => {
    const res = await api.delete(`/api/Category/DeleteCategory/${CategoryId}`)
    return res.data;
}

const AddNewCategory = async (formData, config) => {
    const res = await api.post("/api/Category/AddCategory", formData, config);
    return res.data;
}

const UpdateCategory = async (CategoryId, formData, config) => {
    const res = await api.put(`/api/Category/UpdateCategory/${CategoryId}`, formData, config);
    return res.data;
}
const CategoryService = {
    GetAllCateories,
    DeleteCategory,
    AddNewCategory,
    UpdateCategory
}

export default CategoryService;