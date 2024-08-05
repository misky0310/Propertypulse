"use client";

import React, { useState } from "react"
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";


const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const {setUnreadCount}=useGlobalContext();
  

  const handleReadClick = async () => {
    const res=await fetch(`/api/messages/${message._id}`);
    if(res.status==400)
        toast.error('You cannot modify');
    else{
        const read=await res.json();
        console.log('Setting to',read);
        setIsRead(read);
        setUnreadCount((prev)=>read?prev-1:prev+1);
        toast.success(`${read?'Message marked as read':'Message marked as new'}`);
    }
  }

  const handleDeleteClick = async () => {
    const res=await fetch(`/api/messages/${message._id}`,{
        method:'DELETE'
    });
    if(res.status==200){
        setUnreadCount((prev)=>isRead?prev:prev-1);
        window.location.reload();
    }
    else
        toast.error('Something went wrong');
  }

  return (
    <div className="relative bg-slate-800 p-4 rounded-md shadow-md border border-gray-100 px-2 py-1 ">
        {!isRead && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-md px-3 py-1">New</div>
        )}
      <h2 className="text-xl mb-4 text-gray-200">
        <span className="font-bold text-gray-400">Property Inquiry :-</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-200">{message.body}</p>
      <ul className="mt-4">
        <li className="flex items-center gap-2 text-gray-300">
          <strong>Reply Email : </strong>
          <a href={`mailto:${message.email}`} className="text-blue-400">
            {message.email}
          </a>
        </li>
        <li className="flex items-center gap-2 text-gray-300">
          <strong>Reply Phone : </strong>
          <a href={`tel:${message.phone}`} className="text-blue-400">
            {message.phone}
          </a>
        </li>
        <li className="flex items-center gap-2 text-gray-300">
          <strong>Received : </strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <div className="flex items-center space-x-1">
        <button
            onClick={handleReadClick}
            className={`mt-4 py-1 my-2 mr-3 ${isRead? 'bg-blue-500 ' : 'bg-green-500'} px-3 rounded-md text-white 
            ${isRead? 'hover:bg-blue-600 ' : 'hover:bg-green-600'}`}>
            {isRead ? "Mark as new" : "Mark as read"}
        </button>
        <button 
          onClick={handleDeleteClick}
          className="mt-4 py-1 my-2 mr-3 bg-red-500 px-3 rounded-md text-white hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
