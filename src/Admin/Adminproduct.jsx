import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../ApiService/api";
import AdminProductService from "../ApiService/AdminProductService";

export default function AdminProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [ProductId, setProductId] = useState("");

  const Data = {
    ProductName: "",
    ProductDescription: "",
    CategoryId: "",
    Brand: "",
    Price: "",
    DiscountPrice: "",
    StockQuantity: "",
    SKU: "",
    ProductImage: null,
    Weight: "",
    Color: "",
    Size: "",
    IsFeatured: false,
    IsActive: true,
  };

  const [products, setProducts] = useState(Data);

  // Single unified change handler for standard inputs, checkboxes, and files
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setProducts((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  useEffect(() => {
    const GetAllCategories = async () => {
      try {
        const response = await AdminProductService.GetCategories();
        
        // FIX 1: Format verification and extraction for API response
        let data = response;
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (e) {
            console.error("JSON parse error:", e);
          }
        }

        // Object wrappers ko handle karein (e.g., { Category: [...] } or { category: [...] })
        if (data && !Array.isArray(data)) {
          data = data.Category || data.category || data.data || [];
        }

        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log("Category Fetch Error:", err);
        setCategories([]);
      }
    };

    GetAllCategories();

    const id = JSON.parse(localStorage.getItem("Id"));
    if (id) {
      setProductId(id);
    }
  }, []);

  const AddProduct = async () => {
    if (
      !products.ProductName ||
      !products.ProductDescription ||
      !products.CategoryId ||
      !products.Brand ||
      !products.Price ||
      !products.DiscountPrice ||
      !products.StockQuantity ||
      !products.SKU ||
      !products.Weight ||
      !products.Color ||
      !products.Size
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(products).forEach((key) => {
        formData.append(key, products[key]);
      });

      const Data = await AdminProductService.AddNewProduct(formData);
      alert("Product added successfully");
      setProducts(Data);
    } catch (error) {
      alert(JSON.stringify(error.response?.data || "Error adding product"));
    }
  };

  const UpdateProduct = async () => {
    if (!ProductId) {
      alert("Please Enter The ProductId To Update");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("ProductName", products.ProductName || "");
      formData.append("ProductDescription", products.ProductDescription || "");
      formData.append("CategoryId", Number(products.CategoryId) || 0);
      formData.append("Brand", products.Brand || "");
      formData.append("Price", Number(products.Price) || 0);
      formData.append("DiscountPrice", Number(products.DiscountPrice) || 0);
      formData.append("StockQuantity", Number(products.StockQuantity) || 0);
      formData.append("SKU", products.SKU || "");
      formData.append("Weight", Number(products.Weight) || 0);
      formData.append("Color", products.Color || "");
      formData.append("Size", products.Size || "");
      formData.append("IsFeatured", products.IsFeatured);
      formData.append("IsActive", products.IsActive);

      if (products.ProductImage instanceof File) {
        formData.append("ProductImage", products.ProductImage);
      }

const Data = await AdminProductService.UpdateProduct(
    ProductId,
    formData
);
      alert("Product Updated Successfully");
      console.log(Data);
      setProducts(Data);
      navigate("/admin");
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("ERRORS:", error.response?.data?.errors);
      alert(JSON.stringify(error.response?.data?.errors || error.response?.data));
    }
  };


  
  const DeleteProduct = async () => {
    if (!ProductId) {
      alert("Please enter Product ID To Delete Product");
      return;
    }
    try {
      const Data = await AdminProductService.DeleteProduct(ProductId);
      alert("Product Deleted Successfully");
      console.log(Data);
      setProducts(Data);
      setProductId("");
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("ERRORS:", error.response?.data);
    }
  };

  return (
    <div style={{ margin: "auto", width: "50%", padding: "20px" }}>
      <input type="text" value={ProductId} readOnly className="form-control" />

      <input
        type="text"
        name="ProductName"
        className="form-control m-2"
        placeholder="Product Name"
        value={products.ProductName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ProductDescription"
        className="form-control m-2"
        placeholder="Product Description"
        value={products.ProductDescription}
        onChange={handleChange}
      />

      {/* FIX 2: Casing safety for CategoryId & CategoryName */}
      <select
        onChange={handleChange}
        name="CategoryId"
        className="form-control m-2"
        value={products.CategoryId}
      >
        <option value="">--Select Category--</option>
        {Array.isArray(categories) &&
          categories.map((item, index) => {
            const catId = item.CategoryId || item.categoryId || item.id;
            const catName = item.CategoryName || item.categoryName || item.name || catId;
            return (
              <option key={catId || index} value={catId}>
                {catName}
              </option>
            );
          })}
      </select>

      <input
        type="text"
        name="Brand"
        className="form-control m-2"
        placeholder="Brand"
        value={products.Brand}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Price"
        className="form-control m-2"
        placeholder="Price"
        value={products.Price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="DiscountPrice"
        className="form-control m-2"
        placeholder="Discount Price"
        value={products.DiscountPrice}
        onChange={handleChange}
      />
      <input
        type="number"
        name="StockQuantity"
        className="form-control m-2"
        placeholder="Stock Quantity"
        value={products.StockQuantity}
        onChange={handleChange}
      />
      <input
        type="text"
        name="SKU"
        className="form-control m-2"
        placeholder="SKU"
        value={products.SKU}
        onChange={handleChange}
      />

      {/* File Input for Image */}
      <input
        type="file"
        name="ProductImage"
        className="form-control m-2"
        onChange={handleChange}
      />

      <input
        type="number"
        name="Weight"
        className="form-control m-2"
        placeholder="Weight"
        value={products.Weight}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Color"
        className="form-control m-2"
        placeholder="Color"
        value={products.Color}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Size"
        className="form-control m-2"
        placeholder="Size"
        value={products.Size}
        onChange={handleChange}
      />

      <label className="m-2">
        Is Featured:
        <input
          type="checkbox"
          name="IsFeatured"
          className="form-check-input ms-2"
          checked={products.IsFeatured}
          onChange={handleChange}
        />
      </label>

      <label className="m-2">
        Is Active:
        <input
          type="checkbox"
          name="IsActive"
          className="form-check-input ms-2"
          checked={products.IsActive}
          onChange={handleChange}
        />
      </label>

      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <button type="button" className="btn btn-success" onClick={AddProduct}>
              Add Product
            </button>
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-primary" onClick={UpdateProduct}>
              Update Product
            </button>
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-danger" onClick={DeleteProduct}>
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}