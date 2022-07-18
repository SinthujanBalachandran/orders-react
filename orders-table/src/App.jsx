import { useState,useEffect } from 'react'
import Order from './components/Order'

import './App.css'

function App() {
  const [orders, setOrders] = useState([])
  const [ordersClone, setOrdersClone] = useState([])
  const [ordersClone2, setOrdersClone2] = useState([])
  
useEffect(()=>{
  async function getOrders(){
    const res = await fetch("https://my-json-server.typicode.com/dsrishi/orders/orders")
    const data = await res.json()
    setOrders(data)
    setOrdersClone(data)
    console.log("fetched");
  }
  getOrders()
},[])

const populateOrder = ordersClone.map(order => {
  return <Order  key={order.id} order = {order}  />
})


const uniqueBranch = [...new Set(orders.map(branch => branch.branch))]


const branchName = uniqueBranch.map((branch,id) => {
  return <option key={id} value={branch}>{branch}</option>
})

const uniqueService = [...new Set(orders.map(service => service.service))]

const serviceName = uniqueService.map((service,id) => {
  return <option key={id} value={service}>{service}</option>
})

const filterItem1 = (value)=>{
  const newItem = orders.filter((newVal) => {
    return newVal.branch === value;
  })
  
  setOrdersClone(newItem)
}
const filterItem2 = (value)=>{
  const newItem = ordersClone.filter((newVal) => {
    return newVal.service === value;
  })
  
  setOrdersClone2(newItem)
}



  return (
    <>
      <h1>Orders</h1>
      <div className="headers">
        <div className="filters">
          <label >Filter by branch</label> <br />
          <select onChange={(e)=>filterItem1(e.target.value)} name="branch" id="branch">
            <option value="All">All</option>
            {branchName}
          </select> <br />

          <label >Filter by service</label> <br />
            <select onChange={(e)=>filterItem2(e.target.value)} name="service" id="service">
              <option value="All">All</option>
              {serviceName}
            </select>
        </div>
        <div className="mark--indicator">
          <span className="mark--count">0</span>
          <p>Mark as Complete</p>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>CUSTOMER</th>
            <th>ADDED BY</th>
            <th>REFERENCE</th>
            <th>BRANCH</th>
            <th>SERVICE</th>
            <th>STATUS</th>
          </tr>
          </thead>
          {populateOrder}
      </table>
    </>
  )
}

export default App
