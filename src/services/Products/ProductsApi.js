import axios from "axios";
import { BASE_URL } from "../../Constants/constant";


 const getToken = ()  =>{
  return localStorage.getItem('token');
 }

export async function getAllProduct(data) {
  console.log(data,'hit api')
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/products/getproduct?search=${data.search}&limit=${data.limit}&page=${data.page}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function addProduct(data) {
  console.log(data,'hit api');
try{
  const token = getToken()
  const response = await axios.post(
    `${BASE_URL}/admin/products/addproduct`,
    data,
    {
      headers: {
        Authorization:token,
      },
    }
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return response.data;
  }
}catch (err) {
  console.log(err);
  return err.response.data;
}
}


export async function updateProduct(id,data) {
  try{
    const token =  getToken()
  const response = await axios.put(
    `${BASE_URL}/admin/products/update/${id}`,
    data,
    {
      headers: {
        Authorization: token,
      },
    }
  )
   
    if (response.status === 200) {
      return response.data;
    }   
    else {
      return response.data;
    }
  }
  catch (err) {
    return err.response.data;
  }
}

export async function deleteProduct(id) {
  try{
    const token =  getToken()
  const response = await axios.put(
    `${BASE_URL}/admin/products/delete/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  )
   
    if (response.status === 200) {
      return response.data;
    }   
    else {
      return response.data;
    }
  }
  catch (err) {
    return err.response.data;
  }
}

export async function getAllDashboardDetail() {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/dashboard/getAlldata`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}


export async function getCountOfOrderByMonth() {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/dashboard/getCountOfOrderByMonth?year=2024`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders(data) {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/dashboard/getAllOrder?limit=${data.limit}&page=${data.page}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function  updateOrderStatus(id,status){
  try {
    console.log("Updating order status",id,status)
    const response = await axios.put(
      `${BASE_URL}/admin/dashboard/updateStatus/${id}`,{status:status}
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function  getOrderById(id){
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/dashboard/getOrderById/${id}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function  getProductId(id){
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/products/getProductById/${id}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}