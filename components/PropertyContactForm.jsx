"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const PropertyContactForm = ({ property }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phone,
      message,
      recipient: property.owner,
      property: property._id,
    };

    try {
      const res = await fetch(`/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (res.status === 400) {
        toast.error(response.message);
      } else if (res.status == 200) {
        toast.success("Message sent successfully");
        setWasSubmitted(true);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setEmail("");
      setName("");
      setPhone("");
      setMessage("");
    }
  };

  return (
    <div className="bg-slate-600 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6 text-center text-white">
        Contact Property Manager
      </h3>
      {!session ? (
        <div className="bg-red-500 text-white text-sm p-2 mb-4 rounded">
          You must be logged in to send a message
        </div>
      ) : wasSubmitted ? (
        <div className="bg-green-500 text-white text-sm px-1 py-2 mb-4 rounded">
          Your message has been sent successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-50 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-50 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-50 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-50 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PropertyContactForm;
