import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Base_Url from "../ApiService/Baseurl";
export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [orderdetail, setOrderdetail] = useState([]);
    const [orderdetailmodal, setOrderdetailmodal] = useState(false);
    const [search,setSearch] = useState("");
    const [filter,setFilter] = useState("filter");
    const [fromDate,setFromDate] = useState("");
    const [minamount,setMinamount] = useState("");
       const [maxamount,setMaxamount] = useState("");
 
  const [toDate,setToDate] = useState("");

    const toggle = () => setOrderdetailmodal(!orderdetailmodal);

    const GetOrderDetail = async (id) => {
        try {
            const res = await axios.get(`https://localhost:7017/api/PlaceOrder/GetOrderDetail/${id}`)
            const result = JSON.parse(res.data.orderDetail);
            setOrderdetail(result);
            toggle();
        }
        catch (err) {
            console.log("error");
        }
    }

const GetStatusByFilter = async(value) => 
{
    setFilter(value)

    const res = await axios.get(`https://localhost:7017/api/PlaceOrder/GetOrderByfilter?status=${value}`)
    const result = JSON.parse(res.data.status);

    setOrders(result);
}


const SearchByDate = async (from, to) =>
{
   if (!from || !to) {
            alert("Please select both From and To dates.");
            return;
        }
      
    
        const res = await axios.get("https://localhost:7017/api/PlaceOrder/GetOrderByDate",
            {
                params :
                {
from : from,
to : to
                }
            }
        )
            const result = JSON.parse(res.data.status);
            setOrders(result);
        
}

const SearchByAmount = async(min,max) =>
{
    if(!min || !max)
    {
alert("Please Enter the Amount");
return;
    }

     const res = await axios.get("https://localhost:7017/api/PlaceOrder/GetOrderByAmount",
            {
                params :
                {
minimum : min,
maximum : max
                }
            }
        )
            const result = JSON.parse(res.data.amount);
            setOrders(result);
}

const SearchByName = async(value) => 
{


setSearch(value);
if (search === "") { GetOrders(); return; }

    const res = await axios.get("https://localhost:7017/api/PlaceOrder/GetOrderBysearch",
        {
            params: {
                name: value,
                id: value
            }
        }
    );
    const result = JSON.parse(res.data.searchData);

    setOrders(result);
}





    const UpdateStatus = async (OrderGeneratedId, newStatus) => {
        const res = await axios.put(`https://localhost:7017/api/PlaceOrder/UpdateOrderStatus?OrderGeneratedId=${OrderGeneratedId}`,
            {
                OrderStatus: newStatus
            }

        )
    }
    const GetOrders = async () => {
        try {
            const response = await axios.get("https://localhost:7017/api/PlaceOrder/GetAllOrders");
            const result = JSON.parse(response.data.orders);
            setOrders(result);
        }
        catch (err) {
            console.log(err.response?.data?.error || err.message);
        }
    }
    useEffect(() => {
        GetOrders();
    }, [])
    return (
        <div>


 <div className="card shadow-sm p-3 mb-4 bg-white rounded border-0">
  <div className="row g-3 align-items-center">
    <div className="col-md-5">
      <label className="form-label fw-bold text-muted small">From Amount</label>
      <input 
        type="text" 
        className="form-control form-control-lg border-2"
        value={minamount} 
        onChange={(e) => setMinamount(e.target.value)} 
      />
    </div>
    <div className="col-md-5">
      <label className="form-label fw-bold text-muted small">To Amount</label>
      <input 
        type="text" 
        className="form-control form-control-lg border-2"
        value={maxamount} 
        onChange={(e) => setMaxamount(e.target.value)} 
      />
    </div>
    <div className="col-md-2 d-flex align-items-end">
      <button className="btn btn-primary btn-lg w-100 fw-bold shadow-sm" onClick={() => SearchByAmount(minamount, maxamount)}>
        Search
      </button>
    </div>
  </div>
</div>




 <div className="card shadow-sm p-3 mb-4 bg-white rounded border-0">
  <div className="row g-3 align-items-center">
    <div className="col-md-5">
      <label className="form-label fw-bold text-muted small">From Date</label>
      <input 
        type="date" 
        className="form-control form-control-lg border-2"
        value={fromDate} 
        onChange={(e) => setFromDate(e.target.value)} 
      />
    </div>
    <div className="col-md-5">
      <label className="form-label fw-bold text-muted small">To Date</label>
      <input 
        type="date" 
        className="form-control form-control-lg border-2"
        value={toDate} 
        onChange={(e) => setToDate(e.target.value)} 
      />
    </div>
    <div className="col-md-2 d-flex align-items-end">
      <button className="btn btn-primary btn-lg w-100 fw-bold shadow-sm" onClick={() => SearchByDate(fromDate, toDate)}>
        Search
      </button>
    </div>
  </div>
</div>

            <input type="text" value={search} onChange={(e) => SearchByName(e.target.value)} placeholder="Search Box" className="form-control mb-3"></input>
           <select
                                value={filter}
                                onChange={(e) => GetStatusByFilter(e.target.value)}
                                className="form-select mb-3"
                                
                            >
                                <option value="Placed">Placed</option>
                                <option value="Order Packing">Order Packing</option>
                                <option value="On The Way">On The Way</option>
                                <option value="Delivered">Delivered</option>

                            </select>

            <Table hover responsive bordered>
                <thead className="table-dark">
                    <tr>
                        <th>Order ID</th>
                        <th>Name</th>
                        <th>Order Date</th>
                        <th>Total Payment</th>
                        <th>Order Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item) => (
                        <tr key={item.OrderId}>
                            <td>{item.OrderGeneratedId}</td>
                            <td>{item.FullName}</td>
                            <td>{item.OrderDate}</td>
                            <td>{item.TotalPayment}</td>

                            <select
                                value={item.OrderStatus || "Placed"}
                                onChange={(e) => UpdateStatus(item.OrderGeneratedId, e.target.value)}
                                className="form-select"
                            >
                                <option value="Placed">Placed</option>
                                <option value="Order Packing">Order Packing</option>
                                <option value="On The Way">On The Way</option>
                                <option value="Delivered">Delivered</option>

                            </select>

                            <td><button color="primary" onClick={() => GetOrderDetail(item.OrderGeneratedId)}>Details</button></td>

                        </tr>
                    ))}
                </tbody>
            </Table>


            <Modal isOpen={orderdetailmodal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    ORDER DETAIL
                </ModalHeader>
                <ModalBody>
                    {orderdetail.map((item) => (
                        <div className="container" key={item.ProductDescription}>
                            <div className="row m-2" style={{ borderBottom: "2px dashed gray" }}>
                                <div className="col-3 col-md-3 col-xxl-3">
                                    <img src={`${Base_Url}${item.ProductImage}`} width={"100%"} />
                                </div>
                                <div className="col-9 col-md-9 col-xxl-9">
                                    <h2>{item.ProductName}</h2>
                                    <p>Quantity : {item.Quantity}</p>
                                    <p>Price : RS {item.Price}</p>
                                    <p>Description : {item.ProductDescription}</p>
                                    <h3>TotalPrice : {item.TotalPrice}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <button type="btn btn-primary" onClick={toggle}>Close</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

