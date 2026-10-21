import React, { useEffect, useState } from "react";
import AdminProduct from "./Adminproduct";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import Section from "./Section";
import Category from "./Category";
import CouponMaster from "./CouponMaster";
import BASE_URL from "../ApiService/Baseurl";
import AdminService from "../ApiService/AdminService";
import Order from "./Orders";
export default function Admin() {
  // 1. CHANGE: Default activeTab ko "products" kiya taaki page load par hi products dikhein
  const [activeTab, setActiveTab] = useState("");
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [openProductModal, setOpenProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    GetAllProducts();
  }, []);

  const GetAllProducts = async () => {
    try {
      const result = await AdminService.GetAllProducts();
      // 2. CHANGE: Array Check taaki map crash na ho
      setProducts(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  const SearchProducts = async (value) => {
    setProductSearch(value);
    if (value.trim() === "") {
      GetAllProducts();
      return;
    }
    try {
      const result = await AdminService.SearchProducts(value);
      setProducts(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error(err);
    }
  };

  const AddProduct = () => {
    localStorage.removeItem("Id");
    setOpenProductModal(true);
  };

  const EditProduct = (item) => {
    const id = item.productId || item.ProductId;
    localStorage.setItem("Id", JSON.stringify(id));
    setOpenProductModal(true);
  };

  const OpenDeleteProduct = (id) => {
    setDeleteProductId(id);
    setDeleteProductModal(true);
  };

  const DeleteProduct = async () => {
    try {
      await AdminService.DeleteProduct(deleteProductId);
      alert("Product Deleted Successfully");
      setDeleteProductModal(false);
      GetAllProducts();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">

        {/* Sidebar Navigation */}
        <div className="col-md-3 p-4" style={{background:"black"}}>
          <h2 style={{color:"white"}}>Admin Panel</h2>

          <button
            className={`btn w-100 mt-3 ${activeTab === "products" ? "btn-primary" : "btn-light"}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>

          <button
            className={`btn w-100 mt-3 ${activeTab === "Section" ? "btn-primary" : "btn-light"}`}
            onClick={() => setActiveTab("Section")}
          >
            Sections
          </button>

          <button
            className={`btn w-100 mt-3 ${activeTab === "Category" ? "btn-primary" : "btn-light"}`}
            onClick={() => setActiveTab("Category")}
          >
            Category
          </button>

          <button
            className={`btn w-100 mt-3 ${activeTab === "coupon" ? "btn-primary" : "btn-light"}`}
            onClick={() => setActiveTab("coupon")}
          >
            Coupon
          </button>

           <button
            className={`btn w-100 mt-3 ${activeTab === "order" ? "btn-primary" : "btn-light"}`}
            onClick={() => setActiveTab("order")}
          >
            Order
          </button>
        </div>

        {/* Main Content Area */}
        <div className="col-md-9 p-4" style={{background:"#f8f9fa"}}>

          {activeTab === "products" && (
            <>
              <div className="d-flex justify-content-between mb-3">
                <h2>Products</h2>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Products"
                    value={productSearch}
                    onChange={(e) => SearchProducts(e.target.value)}
                  />
                  <button className="btn btn-success" onClick={AddProduct}>
                    + Add
                  </button>
                </div>
              </div>

              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>CategoryId</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((item) => (
                      <tr key={item.productId || item.ProductId}>
                        <td>{item.productId || item.ProductId}</td>
                        <td>
                          <img 
                            src={`${BASE_URL}${item.productImage || item.ProductImage}`} 
                            alt="" 
                            width="50px" 
                          />
                        </td>
                        <td>{item.productName || item.ProductName}</td>
                        <td>{item.categoryId || item.CategoryId}</td>
                        <td>₹{item.discountPrice || item.DiscountPrice}</td>
                        <td>{item.stockQuantity || item.StockQuantity}</td>
                        <td>
                          <button 
                            className="btn btn-warning btn-sm me-2" 
                            onClick={() => EditProduct(item)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => OpenDeleteProduct(item.productId || item.ProductId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">No Products Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {activeTab === "Section" && <Section />}
          {activeTab === "Category" && <Category />}
          {activeTab === "coupon" && <CouponMaster />}
          {activeTab === "order" && <Order />}
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <Modal isOpen={openProductModal} toggle={() => setOpenProductModal(false)} size="xl">
        <ModalHeader toggle={() => setOpenProductModal(false)}>Product Form</ModalHeader>
        <ModalBody>
          <AdminProduct closeModal={() => setOpenProductModal(false)} refresh={GetAllProducts} />
        </ModalBody>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteProductModal} toggle={() => setDeleteProductModal(false)}>
        <ModalHeader toggle={() => setDeleteProductModal(false)}>Delete Product</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this product?</p>
          <div className="d-flex justify-content-end gap-2">
            <Button color="secondary" onClick={() => setDeleteProductModal(false)}>Cancel</Button>
            <Button color="danger" onClick={DeleteProduct}>Yes Delete</Button>
          </div>
        </ModalBody>
      </Modal>

    </div>
  );
}