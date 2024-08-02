'use client';
import Spinner from '@/components/Spinner';
import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import MessageCard from '@/components/MessageCard';

const MessagesPage = () => {

    const {data:session}=useSession();
    const userId=session?.user?.id;

    const [messages,setMessages]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(() => {

       const fetchMessages = async() => {
        try {
            const res=await fetch(`/api/messages`);

            if(!res.ok)
                console.error('Something went wrong');
            else{
                const data=await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
       }

       fetchMessages();

    },[])


    return(
        loading? <Spinner loading={loading}/> : (
            messages.length===0? <h1 className="text-2xl text-center text-white">No messages</h1> : (
                <section>
                    <div className="container m-auto py-24 max-w-6xl">
                        <div className="bg-black px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                            <h1 className="text-3xl font-bold mb-4 text-center text-gray-300">Your Messages</h1>
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <MessageCard key={message._id} message={message}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )
        )
    )
}

export default MessagesPage
