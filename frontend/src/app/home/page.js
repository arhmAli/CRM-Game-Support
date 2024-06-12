'use client'
import React from 'react'
import Link from 'next/link'
import '../tickets/navstyles.css'
const GradientCard = ({ title, value, gradient }) => {
    return (
      <div className={`p-6 rounded-lg shadow-md text-white ${gradient} card `}>
        <h1 className="text-center text-3xl">{title}</h1>
        <p className="text-center text-2xl">{value}</p>
      </div>
    );
  }

const Page=()=>{
    
    return(
    <>
     <div className="main">
      <nav className="container mx-auto flex items-center justify-between py-4 navbar bg-gray-800">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4">
     <br/>
      <GradientCard title="Total Clients" value="100" gradient="bg-gradient-to-r from-blue-500 to-purple-600" />
      <br/>
      <GradientCard title="Monthly Tickets Closed" value="10" gradient="bg-gradient-to-r from-green-400 to-blue-500" />
      <br/>
      <GradientCard title="Monthly Tickets Opened" value="20" gradient="bg-gradient-to-r from-yellow-400 to-orange-500" />
      <br/>
      <GradientCard title="Pending Tickets" value="05" gradient="bg-gradient-to-r from-red-400 to-pink-500" />
    </div>
    </div>
    </>
    )
}
export default Page