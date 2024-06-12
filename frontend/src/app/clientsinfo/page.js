'use client'
import React from 'react'
import Link from 'next/link'
import '../tickets/navstyles.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const Page=({searchParams})=>{
    const router=useRouter()
    const handleDel=async()=>{
        try{
            const res=await axios.delete(`http://localhost:5000/clientinfo/${searchParams.clientinfo}`)
            console.log(res)
            router.push('/tickets')
        }
        catch(e){
            console.log('Error occurred while deleting data', e);
        }
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
    <div className='info-div bg-gray-400'>    
    <h1>{searchParams.clientinfo}</h1>
    <h3>{searchParams.ticketDesc}</h3>
    <button onClick={handleDel} className='ml-2 px-2 py-1 bg-red-500 text-white rounded'>Mark as completed!</button>
    </div>

    </>
    )
}
export default Page