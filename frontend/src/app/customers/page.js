"use client"
import axios from "axios"
import React from "react"
import { useState,useEffect } from "react"
import Link from "next/link"
import '../tickets/navstyles.css'
const Page=()=>{
const [clientinfo,setClientinfo]=useState([])
const [currentPage,setCurrentPage]=useState(1)
const getData=async()=>{
try{
    const res=await axios.get("http://localhost:5000/clientinfo")
    setClientinfo(res.data)
    console.log(data)
}
catch(e){
    console.log('Error occurred while fetching data', e);
}
}
const randomPay=()=>{
    return Math.floor(Math.random()*1000)
}
useEffect(()=>{
    getData()
},[])

const indexOfFirstItem = (currentPage-1) * 3;
const indexOfLastItem = currentPage * 3;
const currentCustomer=clientinfo.slice(indexOfFirstItem, indexOfLastItem);

const paginate=(pagenumber)=>{
  return setCurrentPage(pagenumber)
}
    return(
    <>
    <div className="bg-gray-800 main">
      <nav className="container mx-auto flex items-center justify-between py-4 navbar">
        <div>
          <Link href='/tickets'>
            <p className="text-white mr-4 hover:text-gray-300">Tickets</p>
          </Link>
          <Link href='/home'>
            <p className="text-white mr-4 hover:text-gray-300">Dashboard</p>
          </Link>
          <Link href='/customers'>
            <p className="text-white hover:text-gray-300">Client's Information</p>
          </Link>
        </div>
      </nav>
      </div>
      <div className="clients-info">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Amount</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {currentCustomer.map((item, ind) => (
        <tr key={ind}>
          <td className="px-6 py-4 whitespace-nowrap">{item.clientname}</td>
          <td className="px-6 py-4 whitespace-nowrap">{randomPay()}$</td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="ml-20 ">
    {[...Array(Math.ceil(clientinfo.length / 3)).keys()].map((pageNumber) => (
                        <span  key={pageNumber} onClick={() => paginate(pageNumber + 1)} className="cursor-pointer mx-1 bg-blue-400 rounded-md px-2 py-1">{pageNumber + 1}</span>
                    ))}
  </div>
</div>

    </>
)
}
export default Page