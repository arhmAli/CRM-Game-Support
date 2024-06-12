"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import './navstyles.css';

const Page = () => {
    const [clientinfo, setClientinfo] = useState([]);
    const [ticketStat, setTicketStat] = useState([]);
    const [ticketDesc, setTicketDesc] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    const fetchClientInfo = async () => {
        try {
            const res = await axios.get("http://localhost:5000/clientinfo");
            const clientData = res.data.map((item) => item.clientname);
            const ticketData = res.data.map((item) => item.ticketstatus);
            const ticketDescData = res.data.map((item) => item.ticketdescription);
            setClientinfo(clientData);
            setTicketStat(ticketData);
            setTicketDesc(ticketDescData);
        } catch (e) {
            console.log('Error occurred while fetching data', e);
        }
    };

    const handleDel = async (name) => {
        try {
            const res = await axios.delete(`http://localhost:5000/clientinfo/${name}`);
            fetchClientInfo();
            console.log(res);
        } catch (e) {
            console.log('Error occurred while deleting data', e);
        }
    };

    useEffect(() => {
        fetchClientInfo();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClientInfo = clientinfo.slice(indexOfFirstItem, indexOfLastItem);
    const currentTicketStat = ticketStat.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
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
            <div className="container mx-auto mt-8 tablediv">
                <table className="w-full border-collapse border border-gray-400 mt-40">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 p-2">Client Name</th>
                            <th className="border border-gray-400 p-2">Ticket Status</th>
                            <th className="border border-gray-400 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClientInfo.map((item, ind) => (
                            <tr key={ind}>
                                <td className="border border-gray-400 p-2">{item}</td>
                                <td className="border border-gray-400 p-2">{currentTicketStat[ind]}</td>
                                <td className="border border-gray-400 p-2">
                                    <Link
                                        href={{
                                            pathname: '/clientsinfo',
                                            query: {
                                                clientinfo: item,
                                                ticketDesc: ticketDesc[ind]
                                            }
                                        }}
                                    >
                                        <span className="text-blue-500 cursor-pointer">Information</span>
                                    </Link>
                                    <button onClick={() => handleDel(item)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Mark as completed</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='ml-40 mt-5'>
                {[...Array(Math.ceil(clientinfo.length / itemsPerPage)).keys()].map((pageNumber) => (
                    <span key={pageNumber} onClick={() => paginate(pageNumber + 1)} className="cursor-pointer mx-1 bg-blue-400 rounded-md px-2 py-1">{pageNumber + 1}</span>
                ))}
                </div>
            </div>
        </>
    );
};

export default Page;
