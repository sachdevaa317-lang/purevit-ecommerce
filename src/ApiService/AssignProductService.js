import api from "../ApiService/api";

const GetProductById = async (id) => {
            const response = await api.get(`/api/Section/GetProductById/${id}`);
        const productsList = JSON.parse(response.data.products);
        const sectionProductsList = JSON.parse(response.data.sectionProducts);
return { productsList, sectionProductsList };
}

const AssignProduct = async (SectionId, selectedProduct) => {
 
        const response = await api.post("/api/Section/AssignProductsInSection",
            {
                 SectionId: parseInt(SectionId),
                ProductIds: selectedProduct
            }
        );
        return response.data;
    }
const AssignProductService = {
    GetProductById,
    AssignProduct
};

export default AssignProductService;
