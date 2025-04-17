import axios from "axios"

export const latestOrders = async()=>{
    return await axios.get("http://localhost:8080/orders/latest",{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
}

export const createOrder = async(order)=>{
    return await axios.post("http://localhost:8080/orders",order,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
}

export const deleteOrder = async(id)=>{
    return await axios.delete(`http://localhost:8080/orders/${id}`,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
}