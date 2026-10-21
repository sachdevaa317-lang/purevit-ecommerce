import api from "../ApiService/api";

const GetCategories = async () => {
  try {
    const response = await api.get("/api/Category/GetCategories");
    let rawData = response.data;

    if (rawData && rawData.Category) {
      rawData = rawData.Category;
    }

    const categoryData =
      typeof rawData === "string" ? JSON.parse(rawData) : rawData;

    return categoryData;
  } catch (error) {
    console.error("GetCategories Service Error:", error);
    throw error;
  }
};

const AddNewProduct = async (formData) => {
  const res = await api.post("/api/ProductApi/AddNewProduct", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const UpdateProduct = async (productId, formData) => {
    const response = await api.put(
        `/api/ProductApi/UpdateProductData/${productId}`,
        formData
    );

    return response.data;
};

const DeleteProduct = async (productId) => {
  const response = await api.delete(
    `/api/ProductApi/RemoveProduct/${productId}`
  );
  return response.data;
};

const AdminProductService = {
  GetCategories,
  AddNewProduct,
  UpdateProduct,
  DeleteProduct,
};

export default AdminProductService;