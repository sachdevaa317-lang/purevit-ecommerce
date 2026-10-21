import { useState,useEffect } from "react"
import axios from "axios"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Table } from "reactstrap";
import AssignProductService from "../ApiService/AssignProductService";
export default function AssignProduct({ isOpen, toggle })
{

/*
    const GetProductsToAssign = async() =>
    {
       const id = localStorage.getItem("SectionId")
        const response = await axios.get(`https://localhost:7017/api/Section/GetProductById/${id}`);
        const data = response.data;
       const Products = JSON.parse(data.Products);
       const SectionProducts = JSON.parse(data.SectionProducts);

       const result = Products.map(product => ({
        ...product,
        Assigned : SectionProducts.some(
            check => check.ProductId === product.ProductId
        )
       }));
       setProducts(result);
      
    }
   */
  const GetProductsToAssign = async () => {
    try {
        const id = JSON.parse(localStorage.getItem("SectionId"));
        const { productsList, sectionProductsList } = await AssignProductService.GetProductById(id);
        const result = productsList.map(product => ({
            ...product,
            Assigned: sectionProductsList.some(
                check => check.ProductId === product.ProductId 
            )
        }));
        
        setProducts(result);
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Error fetching products");
    }
}

useEffect(() => {
    if (isOpen) {
        GetProductsToAssign();
    }
}, [isOpen]);


const HandleCheckbox = async (ProductId) => {
 setProducts
 (
   prevdata => prevdata.map(p => p.ProductId === ProductId ? {...p,
    Assigned : !p.Assigned} : p)
 )
    }


const HandleSaveButton = async() =>
{
    const SectionId = localStorage.getItem("SectionId");
    const selectedProduct = products.filter(e => e.Assigned).map(x => x.ProductId)

    try{
        const response = await AssignProductService.AssignProduct(parseInt(SectionId), selectedProduct);
        alert("Successfully Added");
        toggle();
    }
    catch(err)
    {
        alert(err.response?.data?.error);
    }
}

    const [products,setProducts] = useState([]);

    return(
        <div>
<Modal isOpen={isOpen} toggle={toggle} size="lg">
    <ModalHeader toggle={toggle}>
        Assign Products
    </ModalHeader>
    <ModalBody>

        <Table responsive hover bordered >
            <thead className="table-dark">
<tr>
    <th>ProductId</th>
    <th>ProductName</th>
    <th>CategoryId</th>
    <th>Discount Price</th>
    <th>Stock Quantity</th>
    <th>Assign</th>
    </tr>
            </thead>
           
            <tbody>
                 {
    products.map((item) => (
             <tr key={item.productId || item.ProductId}>
      <td>{item.productId ?? item.ProductId}</td>
      <td>{item.productName ?? item.ProductName}</td>
      <td>{item.categoryId ?? item.categoryId}</td>
      <td>{item.discountPrice ?? item.DiscountPrice}</td>
      <td>{item.stockQuantity ?? item.StockQuantity}</td>
      <td>
        <input
          type="checkbox"
          checked={item.assigned ?? item.Assigned ?? false}
          onChange={() => HandleCheckbox(item.productId || item.ProductId)}
        />
      </td>
    </tr>
                                ))
}  
            </tbody>

            </Table>
   </ModalBody>
<ModalFooter>
    <Button color="primary" onClick={HandleSaveButton}>Assign</Button>
</ModalFooter>
</Modal>
        </div>
    )
}