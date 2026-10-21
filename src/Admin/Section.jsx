import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import AssignProducts from "./AssignProducts"
import SectionService from "../ApiService/SectionService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default function Section() {
    const [section, setSection] = useState([]);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({
        SectionName: "",
        Slug: "",
        DisplayOrder: 0,
        IsActive: true
    })
const [assignmodel,setAssignmodel] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const toggle = () => {
        setModal(!modal)
    }
  
    const GetSections = async () => {
        try {
            const response = await SectionService.GetAllSections();
            setSection(response);
        }
        catch (err) {
            alert(err.response?.data?.error);
        }
    }

    useEffect(() => {
        GetSections();
    }, [])

    const DeleteSection = async (id) => {
        if (window.confirm("You Want to delete Section")) {
            try {
                await SectionService.DeleteSection(id);
                GetSections();
            }
            catch (err) {
                alert(err.response?.data?.error);
            }
        }
    }
const AssignProduct = (id) =>
{
localStorage.setItem("SectionId",JSON.stringify(id));
setAssignmodel(true);
}
    const AddSection = () => {
        setModal(true);
        setForm({
            SectionName: "",
            Slug: "",
            DisplayOrder: 0,
            IsActive: true
        })
        setSelectedId(0);
    }

    const EditSection = async(item) => {
        try
        {
const Data = await SectionService.GetSectionById(item.id);
        setForm({
            SectionName: "" || Data.sectionName,
            Slug: Data.slug || "",
            DisplayOrder: Data.displayOrder || 0 ,
            IsActive: true
        })
        setSelectedId(item.id);
             setModal(true);
        }
     catch(err)
     {
        alert(err.response?.data?.error);
     }  
    }

const assignToggle = () => {
    setAssignmodel(!assignmodel);
}
    const Active = async (item) => {
        try {
            const updatedsection =
            {
                ...item,
                isActive: !item.isActive,
            };

            await SectionService.ActiveSection(item, updatedsection);
            GetSections();
        }
        catch (err) {
            alert(err.response?.data?.error);
        }
    }


    const SaveSection = async () => {
       
            const data =
            {
                SectionName: form.SectionName,
                Slug: form.Slug,
                DisplayOrder: form.DisplayOrder,
                IsActive: form.IsActive
            }
            if(selectedId === 0)
            {
  await SectionService.AddNewSection(data);
            GetSections();
            setModal(!modal);
            }
          
        else if(selectedId > 0)
        {
            await SectionService.UpdateSection(selectedId, data);
            GetSections();
            setModal(!modal);
        }
     else
     {
        alert("Section Not Saved");
     }

    }
  
 

    const handleInputChange = async (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };


    return (
        <div className="container">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6">
                        <h2>Sections</h2>
                    </div>
                    <div className="col-6 text-right ">
                        <Button color="success" onClick={AddSection}>+ Add</Button>
                    </div>
                </div>
            </div>
            <Table hover bordered responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Section Name</th>
                        <th>Slug</th>
                        <th>Display Order</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {section.length > 0 ? (
                        section.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.sectionName}</td>
                                <td>{item.Slug || "null"}</td>
                                <td>{item.displayOrder}</td>
                                <td>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={item.isActive}
                                        onChange={() => Active(item)}
                                    />
                                </td>

                                <td>
                                    <Button color="warning" onClick={() => EditSection(item)}>Edit</Button> {" "} 
                                <Button color="danger" onClick={() => DeleteSection(item.id)}>Delete</Button>{" "}
                                <Button color="primary" onClick={() => AssignProduct(item.id)}>Assign Product</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            No Sections Found
                        </tr>
                    )}

                </tbody>

            </Table>



            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} >
                  {selectedId === 0 ? "Add New Section" : "Update Section"}
                </ModalHeader>
                <ModalBody>
                    <input type="text" placeholder="Section Name" className="form-control mb-3 mt-3" onChange={handleInputChange} value={form.SectionName} name="SectionName" />
                    <input type="text" placeholder="Slug" className="form-control mb-3" onChange={handleInputChange} value={form.Slug} name="Slug" />
                    <input type="number" placeholder="Display Order" className="form-control mb-3" onChange={handleInputChange} value={form.DisplayOrder} name="DisplayOrder" />
                    <input type="checkbox" checked={form.IsActive} onChange={handleInputChange} name="isActive" /> <span className="ms-2">IsActive</span>

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={SaveSection}> {selectedId === 0 ? "Save" : "Update"}</Button>
                </ModalFooter>
            </Modal>


<AssignProducts isOpen={assignmodel} toggle={assignToggle}/>
           
        </div>
    )
}