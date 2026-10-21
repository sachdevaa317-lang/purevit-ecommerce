import { useState,useEffect } from "react"
import axios from "axios";
import BASE_URL from "../ApiService/Baseurl";
import api from "../ApiService/api";

export default function ShowCategory()
{
    const [categories,setCategories] = useState([]);
    const [products,setProducts] = useState([]);
    const [selectedId,setSelectedId] = useState(null);
    
  useEffect(() => {
   
    api.get("/api/Category/GetCategories")
      .then((response) => {
        console.log(response.data);

        const Category = response.data;
        setCategories(Category)
      })
      .catch((err) => {
        console.log(err);
      });
      
    },[])
const GetProducts = async(id) => 
{
    setSelectedId(id)
      const response = await api.get(`/api/ProductApi/GetProductByCategoryId/${id}`)
      const result = JSON.parse(response.data.productList);
      setProducts(result);
}
    return(
        <div>
    <div className="py-10 px-4 md:px-16 text-center">

        <h2>
          Category
        </h2>

        <div className="flex justify-center gap-6 md:gap-12 mt-6 overflow-x-auto">

          {categories.map((item) => (

            <div
              key={item.categoryId}
              className="cursor-pointer flex flex-col items-center min-w-[80px]"
              onClick={() => GetProducts(item.categoryId)}
            >

              <img
                src={`${BASE_URL}${item.imageUrl}`}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                alt={item}
              />

              <p className="text-sm mt-2">
                {item.categoryName}
              </p>

            </div>


          ))}

  </div>
  
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item. ProductId} className="border p-4 rounded-lg shadow-sm">
            <img
              src={`${BASE_URL}${item.ProductImage}`}
              alt={item.ProductName}
              width="100px"
            />
            <h3 className="font-bold mt-2">{item.ProductName}</h3>
            <p className="text-gray-500 text-sm">{item.ProductDescription}</p>
            <p className="text-green-600 font-bold mt-2">₹{item.DiscountPrice}</p>
          </div>

        ))}
        </div>


      

      </div>
        </div>
    )
}