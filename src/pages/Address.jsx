import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function Address({ selectedAddress, setSelectedAddress }) {
    const userId = localStorage.getItem("UserId");

    const [showForm, setShowForm] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addresses, setAddresses] = useState([]);


    const [editingId, setEditingId] = useState(null);
    useEffect(() => {
        
    if (addresses.length > 0) {
        const defaultAddress = addresses.find(x => x.isDefault) || addresses[0];
        setSelectedAddressId(defaultAddress.addressId);
        setSelectedAddress(defaultAddress); 
    }
}, [addresses]);
  

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
        pincode: "",
        city: "",
        state: "",
        country: "India",
        fullAddress: "",
        addressType: "Home",
        isDefault: false
    });

    const GetLocation = async (pincode) => {

        if (pincode.length !== 6)
            return;

        try {

            const response = await axios.get(
                `https://localhost:7058/api/Address/GetDataByPincode/${pincode}`
            );

            setForm({
                ...form,
                pincode: pincode,
                city: response.data.city,
                state: response.data.state
            });

        }
        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });

    };

    //================ GET ADDRESS =================

    const GetAddresses = async () => {

        try {

            const response = await axios.get(
                `https://localhost:7058/api/Address/GetAddressByUserId/${userId}`
            );

            setAddresses(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        GetAddresses();

    }, []);




    //================ ADD ADDRESS =================

    console.log(userId);
    const AddAddress = async () => {

        try {

            console.log(form);
            console.log(userId);

            await axios.post(
                "https://localhost:7058/api/Address/AddAddress",
                {
                    ...form,
                    userId: Number(userId)
                }
            );

            alert("Address Added Successfully");

            GetAddresses();

            ClearForm();

            setShowForm(false);

        }
        catch (error) {

            console.log(error);
            alert("Address Not Added");

        }

    };



    //================ EDIT =================

    const EditAddress = (item) => {

        setEditingId(item.addressId);

        setForm({
            firstName: item.firstName,
            lastName: item.lastName,
            mobileNo: item.mobileNo,
            email: item.email,
            pincode: item.pincode,
            city: item.city,
            state: item.state,
            country: item.country,
            fullAddress: item.fullAddress,
            addressType: item.addressType,
            isDefault: item.isDefault
        });

        setShowForm(true);

    };



    //================ UPDATE =================

    const UpdateAddress = async () => {

        try {

            await axios.put(
                "https://localhost:7058/api/Address/UpdateAddress",
                {
                    ...form,
                    addressId: editingId,
                    userId: userId
                }
            );

            alert("Address Updated Successfully");

            GetAddresses();

            ClearForm();

            setEditingId(null);

            setShowForm(false);

        }
        catch (error) {

            console.log(error);
            alert("Address Not Updated");
        }

    };



    //================ DELETE =================

    const DeleteAddress = async (id) => {

        if (!window.confirm("Delete Address?"))
            return;

        try {

            await axios.delete(
                `https://localhost:7058/api/Address/DeleteAddress/${id}`
            );

            alert("Address Deleted Successfully");

            GetAddresses();
            setSelectedAddress(null);
        }
        catch (error) {

            console.log(error);
alert("Address Not Deleted");
        }

    };



    //================ SAVE =================

    const SaveAddress = () => {

        if (editingId == null)
            AddAddress();
        else
            UpdateAddress();

    };



    //================ CLEAR =================

    const ClearForm = () => {

        setForm({
            firstName: "",
            lastName: "",
            mobileNo: "",
            email: "",
            pincode: "",
            city: "",
            state: "",
            country: "India",
            fullAddress: "",
            addressType: "Home",
            isDefault: false
        });

    };

    return (
        <div>
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-3" >

                    <h2>Delivery Address</h2>

                    <button
                        className="btn btn-dark"
                        onClick={() => {
                            setShowForm(!showForm);

                            if (!showForm) {
                                ClearForm();
                                setEditingId(null);
                            }
                        }}
                    >
                        {showForm ? "-" : "+"}
                    </button>

                </div>


                {
                    addresses.map((item) => (

                        <div
                            key={item.addressId}
                            className="border rounded p-3 mb-3"
                            style={{width: "100%", backgroundColor: selectedAddressId === item.addressId ? "#f8f9fa" : "white"}}
                        >   

                            <div className="d-flex justify-content-between">

                                <div>

                                    <input
                                        type="radio"
                                        name="selectedAddress"
                                        checked={selectedAddressId === item.addressId}
                                     onChange={() => {
    setSelectedAddress(item); 
    setSelectedAddressId(item.addressId);
}}
                                    />

                                    <b className="ms-2">
                                        {item.firstName} {item.lastName}
                                    </b>

                                    <br />

                                    {item.fullAddress}

                                    <br />

                                    {item.city}, {item.state}

                                    <br />

                                    {item.country}

                                    <br />

                                    {item.mobileNo}

                                </div>

                                <div>
<div className="d-flex justify-content-between">
    
                                    <button
                                        className="btn btn-primary m-2"
                                        onClick={() => EditAddress(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger m-2"
                                        onClick={() =>
                                            DeleteAddress(item.addressId)
                                        }
                                    >
                                        Delete
                                    </button>
</div>
                                </div>

                            </div>

                        </div>

                    ))
                }



                {
                    showForm &&

                    <div className="card p-4 mt-4">

                        <input
                            className="form-control mb-3"
                            placeholder="First Name"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Last Name"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Mobile Number"
                            name="mobileNo"
                            maxLength={10}
                            inputMode="numeric"
                            value={form.mobileNo}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Pincode"
                            name="pincode"
                            maxLength={6}
                            inputMode="numeric"
                            value={form.pincode}
                            onChange={(e) => {
                                handleChange(e);
                                GetLocation(e.target.value);
                            }}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="City"
                            name="city"
                            value={form.city}
                            readOnly
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="State"
                            name="state"
                            value={form.state}
                            readOnly
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Country"
                            name="country"
                            value={form.country}
                            readOnly
                        />

                        <textarea
                            className="form-control mb-3"
                            rows="3"
                            placeholder="Full Address"
                            name="fullAddress"
                            value={form.fullAddress}
                            onChange={handleChange}
                        />

                        <select
                            className="form-select mb-3"
                            name="addressType"
                            value={form.addressType}
                            onChange={handleChange}
                        >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Others">Others</option>
                        </select>
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={form.isDefault}
                            onChange={handleChange}
                        />

                        Default Address
                        <button
                            className="btn btn-success"
                            onClick={SaveAddress}
                        >
                            {editingId == null
                                ? "Save Address"
                                : "Update Address"}
                        </button>

                    </div>

                }

            </div>
        </div>
    )
}