import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CouponMasterService from "../ApiService/CouponMasterService";
export default function CouponMaster() {
    const [Coupons, setCoupons] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const [form, setForm] = useState({
        CouponName: "",
        CouponType: "",
        DiscountValue: "",
        MinimumOrderAmount: "",
        MaximumDiscount: "",
        StartDate: "",
        EndDate: "",
        UsageLimit: "",
        IsActive: true
    });

    const handleInputChange = async (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const GetAllCoupon = async () => {
        try {
            const response = await CouponMasterService.GetAllCoupons();
            setCoupons(response);
        }
        catch (err) {
            alert(err.response?.data?.error || "No Coupon Found");
        }
    }

    useEffect(() => {
        GetAllCoupon();
    }, [])

    const Toggle = () => setModal(!modal);

    const EditCoupon = (item) => {
        setModal(true);
        setSelectedId(item.CouponId);
        setForm({
            CouponName: item.CouponName,
            CouponType: item.CouponType,
            DiscountValue: item.DiscountValue,
            MinimumOrderAmount: item.MinimumOrderAmount,
            MaximumDiscount: item.MaximumDiscount,
            StartDate: item.StartDate,
            EndDate: item.EndDate,
            UsageLimit: item.UsageLimit,
            IsActive: item.IsActive
        });
    }


    const AddCoupon = () => {
        setModal(true);
        setSelectedId(0);
        setForm({
            CouponName: "",
            CouponType: "",
            DiscountValue: "",
            MinimumOrderAmount: "",
            MaximumDiscount: "",
            StartDate: "",
            EndDate: "",
            UsageLimit: "",
            IsActive: true
        });
    }

    const SaveCoupon = async () => {
        const data = {
            CouponName: form.CouponName,
            CouponType: form.CouponType,
            DiscountValue: form.DiscountValue,
            MinimumOrderAmount: form.MinimumOrderAmount,
            MaximumDiscount: form.MaximumDiscount,
            StartDate: form.StartDate,
            EndDate: form.EndDate,
            UsageLimit: form.UsageLimit,
            IsActive: form.IsActive
        };

        try {
            if (selectedId === 0) {
                await CouponMasterService.AddNewCoupon(data);
                GetAllCoupon();
                setModal(false);
            }
            else if (selectedId > 0) {
                await CouponMasterService.UpdateCoupon(selectedId, data);
                GetAllCoupon();
                setModal(false);
            }
        }
        catch (err) {
            console.log(err.response?.data?.error);
        }
    }

    const DeleteCoupon = async (CouponId) => {
        if (window.confirm("You Want to delete Section")) {
            try {
                await CouponMasterService.DeleteCoupon(CouponId);
                GetAllCoupon();
            }
            catch (err) {
                alert(err.response?.data?.error);
            }
        }
    }

    const Active = async (item) => {
        try {
            const UpdateActive =
            {
                ...item,
                IsActive: !item.IsActive,
            };
            await CouponMasterService.ActiveCoupon(item, UpdateActive);
            GetAllCoupon();
        }
        catch (err) {
            console.log("Active Update error");
        }
    }
    return (
        <div>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-6 col-xxl-6 col-md-6">
                        <h2>
                            Coupons
                        </h2>
                    </div>
                    <div className="col-6 col-xxl-6 col-md-6 text-right">
                        <button type="button" className="btn btn-success" onClick={AddCoupon}>+Add</button>
                    </div>
                </div>
            </div>
            <Table hover bordered responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Coupon Id</th>
                        <th>Coupon Name</th>
                        <th>Coupon Type</th>
                        <th>Discount Value</th>
                        <th>Limit</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Coupons.map((item) => (

                        <tr key={item.CouponId}>
                            <td>{item.CouponId}</td>
                            <td>{item.CouponName}</td>
                            <td>{item.CouponType}</td>
                            <td>{item.DiscountValue}</td>
                            <td>{item.UsageLimit}</td>
                            <td>{item.StartDate}</td>
                            <td>{item.EndDate}</td>
                            <td> <input
                                type="checkbox"
                                className="form-check-input"
                                checked={item.IsActive}
                                onChange={() => Active(item)}
                                name="IsActive"
                            /></td>
                            <td>
                                <Button color="warning" onClick={() => EditCoupon(item)}>Edit</Button> {" "}
                                <button type="button" className="btn btn-danger" onClick={(e) => DeleteCoupon(item.CouponId)}>Delete</button></td>
                        </tr>

                    ))}
                </tbody>
            </Table>


            <Modal isOpen={modal} Toggle={Toggle}>
                <ModalHeader Toggle={Toggle}>
                    {selectedId === 0 ? "Add New Coupon" : "Update Coupon"}

                </ModalHeader>
                <ModalBody>

                    <input
                        type="text"
                        placeholder="Coupon Name"
                        className="form-control mb-3"
                        onChange={handleInputChange}
                        value={form.CouponName}
                        name="CouponName"
                    />

                    <select
                        className="form-control mb-3"
                        onChange={handleInputChange}
                        value={form.CouponType}
                        name="CouponType"
                    >
                        <option value="">Select Coupon Type</option>
                        <option value="percentage">Percentage</option>
                        <option value="Flat">Flat</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Discount Value"
                        className="form-control mb-3"
                        onChange={handleInputChange}
                        value={form.DiscountValue}
                        name="DiscountValue"
                    />

                    <input
                        type="number"
                        placeholder="Minimum Order Amount"
                        className="form-control mb-3"
                        onChange={handleInputChange}
                        value={form.MinimumOrderAmount}
                        name="MinimumOrderAmount"
                    />

                    <input
                        type="number"
                        placeholder="Maximum Discount"
                        className="form-control mb-3"
                        onChange={handleInputChange}
                        value={form.MaximumDiscount}
                        name="MaximumDiscount"
                    />

                    <input
                        type="date"
                        className="form-control mb-3"
                        onChange={handleInputChange}
                        value={form.StartDate}
                        name="StartDate"
                    />

                    <input
                        type="date"
                        className="form-control mb-3"
                        onChange={handleInputChange}
                        value={form.EndDate}
                        name="EndDate"
                    />

                    <input
                        type="number"
                        placeholder="Usage Limit"
                        className="form-control mb-3"
                        onChange={handleInputChange}
                        value={form.UsageLimit}
                        name="UsageLimit"
                    />

                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            onChange={handleInputChange}
                            checked={form.IsActive}
                            name="IsActive"
                        />

                        <label className="form-check-label">
                            Active
                        </label>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={Toggle}>Cancel</Button>
                    <Button color="success" onClick={SaveCoupon}>{selectedId === 0 ? "Save" : "Update"}</Button>

                </ModalFooter>
            </Modal>
        </div>
    )
}