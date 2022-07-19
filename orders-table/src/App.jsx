import { useState,useEffect } from 'react'
import Order from './components/Order'

import './App.css'

function App() {
  const [orders, setOrders] = useState([])
  const [ordersClone, setOrdersClone] = useState([])
  
  
useEffect(()=>{
  async function getOrders(){
    const res = await fetch("https://my-json-server.typicode.com/dsrishi/orders/orders")
    const data = await res.json()
    setOrders(data)
    setOrdersClone(data)
    
  }
  getOrders()
},[])


const [selectedBranch, setSelectedBranch] = useState()
const [selectedService, setSelectedService] = useState()

useEffect(()=>{
 
  let result = orders;
  
  result = branchFilter(result);
  console.log("result");
  
  result = serviceFilter(result);
  setOrdersClone(result);
  
},[selectedBranch,selectedService])


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

const branchFilter = (value) => {
  return value.filter((item) => item.branch.includes(selectedBranch))
}
const serviceFilter = (value) => {
  if(selectedService === undefined){
    return value.filter((item) => item.branch.includes(selectedBranch))
  }else{
    console.log(selectedService);
  return value.filter((item) => item.service.includes(selectedService))
}
}

// const branchFilter = (value)=>{
//   const newItem = orders.filter((newVal) => {
//     return newVal.branch === value;
//   })
  
//   setOrdersClone(newItem)
// }
// const serviceFilter = (value)=>{
//   const newItem = ordersClone.filter((newVal) => {
//     return newVal.service === value;
//   })
  
//   setOrdersClone2(newItem)
// }



  return (
    <div className='orders--card'>
      <h1>Orders</h1>
      <div className="headers">
        <div className="filters">
          <div className='branch--filter'>
            <label ><b> Filter by branch</b></label> <br />
            <select className='dropdown' onChange={(e)=>setSelectedBranch(e.target.value)} name="branch" id="branch">
              <option value="">All</option>
              {branchName}
            </select> 
          </div>
          <div className='service--filter'>
            <label ><b> Filter by service</b></label> <br />
              <select className='dropdown' onChange={(e)=>setSelectedService(e.target.value)} name="service" id="service">
                <option value="" >All</option>
                {serviceName}
              </select>
            </div>
        </div>
       
          <p className="mark--indicator"><span className="mark--count">0</span>Mark as Complete</p>
        
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
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
    </div>
  )
}

export default App
