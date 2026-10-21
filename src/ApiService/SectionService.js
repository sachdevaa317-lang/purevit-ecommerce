import api from "../ApiService/api";

const GetAllSections = async () => {
                const response = await api.get("/api/Section/GetSections");
    return response.data;
}

const DeleteSection = async (id) => {
                  const res =  await api.delete(`/api/Section/DeleteSection/${id}`)
return res.data;
}

const GetSectionById = async (id) => {
    const response = await api.get(`/api/Section/GetSectionById/${id}`)
    return response.data;
}

const ActiveSection = async (item ,updatedsection) => {
   const response =  await api.put(`/api/Section/UpdateSection/${item.id}`, updatedsection);
return response.data;
}


const AddNewSection = async (data) => {
     const response =await api.post("/api/Section/AddSection", data);
return response.data;
}

const UpdateSection = async (selectedId, data) => {
                const response = await api.put(`/api/Section/UpdateSection/${selectedId}`, data);
                return response.data;
}
const SectionService = {
    GetAllSections,
    DeleteSection,
    GetSectionById,
    ActiveSection,
    AddNewSection,
    UpdateSection
};

export default SectionService;