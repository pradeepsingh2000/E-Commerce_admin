import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./orderDetail.css";
import { useState } from "react";
import Loader from "../Loader/loader";
import { getOrderById } from "../../services/Products/ProductsApi";
import { useEffect } from "react";
import { BASE_URL } from "../../Constants/constant";

export default function OrderDetail() {
  const [loading, setisLoading] = useState(true);
  const [OrderInfo, serOrderInfo] = useState();
  const navigate = useNavigate();
  const [userAddress,setUserAddress] = useState();
  const [refresh, setRefresh] = useState(true);
  const params = useParams();
  const FetchOrderData = async () => {
    try {
      const data = await getOrderById(params.id);
      console.log(data.data, "the data");
      if (data.status) {
        serOrderInfo(data.data[0]);
        setUserAddress(JSON.parse(data.data[0].address))
        //   setorders(data.data.data);
        //   setTotalOrders(data.data.totalDoc);
        //   settotalPages(data.data.totalPage);
        //   // setopenDelete(false)
        setisLoading(false);
        setRefresh(false);
      }
    } catch (e) {
      setRefresh(false);
    }
  };
  useEffect(() => {
    params.id && FetchOrderData();
  }, [params.id]);
  console.log(params.id);
  return loading ? (
    <Loader />
  ) : (
    <div className="container">
      <div style={{display:"flex",justifyContent:"end"}}>
<button className="btn btn-danger mt-4" onClick={()=>{navigate('/orders')}}>Back</button>
      </div>
      <div className="main-body">
        <div className="row gutters-sm mt-4">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={`${BASE_URL}/${OrderInfo.customerInfo.image}`}
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {OrderInfo.customerInfo.name}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {OrderInfo.customerInfo.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Role</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {OrderInfo.customerInfo.role}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userAddress.phoneNo}
                    </div>
                  </div>
                 
                  <hr />
                  <div className="row">
                    <div className="col" style={{display:"flex",justifyContent:"center"}}>
                      <h2 className="mb-0">Delivery Address</h2>
                      <br></br>
                    
                    </div>
                    <hr/>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <h6 className="mb-0">State</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userAddress.state}
                    </div>
                    <hr/>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <h6 className="mb-0">City</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userAddress.city}
                    </div>
                  
                  </div>
                  <hr/>
                  <div className="row mt-2">
                    <div className="col">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userAddress.address}
                    </div>
                    
                  </div>
                  <hr/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row gutters-sm">
              {OrderInfo.productInfo.map((product) => (
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3">
                        <i className="material-icons text-info mr-2">
                          Product Orders
                        </i>
                      </h6>
                      <small>Product Name</small>
                      <div className="mb-1">
                        <div>
                          <h4>{product.name}</h4>
                        </div>
                      </div>
                      <small>Product Brand</small>
                      <div className="mb-1">
                        <div>
                          <h4>{product.brand}</h4>
                        </div>
                      </div>
                      <small>Product Category</small>
                      <div className="mb-1">
                        <div>
                          <h4>{product.category}</h4>
                        </div>
                      </div>
                      <small>Product Price</small>
                      <div className="mb-1">
                        <div>
                          <h4>{product.price}</h4>
                        </div>
                      </div>

                      <div className="mb-1">
                        <div className="showcenter mt-4">
                          <img
                            src={`${BASE_URL}/${product.images[0]}`}
                            alt="Admin"
                            
                            width="150"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">
                        assignment
                      </i>
                      Project Status
                    </h6>
                    <small>Web Design</small>
                    <div className="progress mb-3">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ height: "5px", width: "80%" }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Website Markup</small>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ height: "5px", width: "72%" }}
                      aria-valuenow="72"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <small>One Page</small>
                  <div className="progress mb-3">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ height: "5px", width: "89%" }}
                      aria-valuenow="89"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <small>Mobile Template</small>
                  <div className="progress mb-3">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ height: "5px", width: "55%" }}
                      aria-valuenow="55"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <small>Backend API</small>
                  <div className="progress mb-3" style={{ height: "5px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ height: "5px", width: "66%" }}
                      aria-valuenow="66"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
