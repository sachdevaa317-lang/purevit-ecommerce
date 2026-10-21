import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from "../ApiService/api";
import CategoryService from "../ApiService/CategoryService";
export default function Category() {
    const [Category, setCategory] = useState([]);
    const [modal, setModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [imageFile, setImageFile] = useState(null);



    const [selectedId, setSelectedId] = useState(0);
    const toggle = () => {
        setModal(!modal)
    }

    const GetCategories = async () => {
        try {
            const response = await CategoryService.GetAllCateories();
            setCategory(response);
        }
        catch (err) {
            alert(err.response?.data?.error || err.message);
        }
    };

    useEffect(() => {
        GetCategories();
    }, [])

    const DeleteCategory = async (categoryId) => {
        if (window.confirm("You Want to delete Category")) {
            try {
                await CategoryService.DeleteCategory(categoryId);
                GetCategories();
            }
            catch (err) {
                alert(err.response?.data?.message);
            }
        }
    }

    const AddCategory = () => {
        setModal(true);
        setImageFile(null);
        setCategoryName("");
        setSelectedId(0);
    }

    const EditCategory = (item) => {

        setImageFile(null);
        setCategoryName(item.categoryName);
        setSelectedId(item.categoryId);
        setModal(true);
    };


    const SaveCategory = async () => {

        const formData = new FormData();
        formData.append("CategoryName", categoryName);
        formData.append("ImageUrl", imageFile);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };


        if (selectedId === 0) {
            await CategoryService.AddNewCategory(formData, config);
            GetCategories();
            setModal(!modal);
        }

        else if (selectedId > 0) {
            await CategoryService.UpdateCategory(selectedId, formData, config);
            GetCategories();
            setModal(!modal);
        }
        else {
            alert("Category Not Saved");
        }

    }





    return (
        <div className="container">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6">
                        <h2>Category</h2>
                    </div>
                    <div className="col-6 text-right ">
                        <Button color="success" onClick={AddCategory}>+ Add</Button>
                    </div>
                </div>
            </div>
            <Table hover bordered responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Category Name</th>
                        <th>Image Url</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Category.length > 0 ? (
                        Category.map((item) => (
                            <tr key={item.categoryId}>
                                <td>{item.categoryId}</td>
                                <td>{item.categoryName}</td>
                                <td>{item.imageUrl || "null"}</td>

                                <td>
                                    <Button color="warning" onClick={() => EditCategory(item)}>Edit</Button> {" "}
                                    <Button color="danger" onClick={() => DeleteCategory(item.categoryId)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            No Categorys Found
                        </tr>
                    )}

                </tbody>

            </Table>



            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} >
                    {selectedId === 0 ? "Add New Category" : "Update Category"}
                </ModalHeader>
                <ModalBody>
                    <input type="text" placeholder="Category Name" className="form-control mb-3 mt-3" value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => setImageFile(e.target.files[0])} // e.target.files[0] real file deta hai
                    />

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={SaveCategory}> {selectedId === 0 ? "Save" : "Update"}</Button>
                </ModalFooter>
            </Modal>



        </div>
    )
}