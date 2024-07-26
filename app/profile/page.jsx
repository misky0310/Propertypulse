"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import profileDefault from "@/assets/images/profile.png";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [userProperties, setUserProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user properties");
        const data = await res.json();
        setUserProperties(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const userId = session?.user?.id;

    if (userId) fetchUserProperties(userId);
  }, [session]);

  const handleDeleteProperty = async (propertyId) => {
    const confirmed=window.confirm("Are you sure you want to delete this property?");
    if (!confirmed) return;
    try {
        const res=await fetch(`/api/properties/${propertyId}`,{method:'DELETE'});

        if(!res.ok) toast.error('Failed to delete property');

        //Remove the property from state
        const updatedProperties=userProperties.filter((property) => (
            property._id!==propertyId
        ))

        //update the listings
        setUserProperties(updatedProperties)
        toast.success('Property Deleted')
    } catch (error) {
        console.log(error);
        toast.error('Failed to delete property')
    }
  }

  return (
    <section className="bg-black">
      <div className="container m-auto py-24">
        <div className="bg-slate-700 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4 text-gray-50 text-center  w-1/3">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  alt="User"
                  sizes="100vw"
                  height={0}
                  width={0}
                />
              </div>
              <h2 className="text-2xl mb-4 text-gray-50">
                <span className="font-bold block text-gray-300">Name: </span>
                {profileName}
              </h2>
              <h2 className="text-2xl text-gray-50">
                <span className="font-bold block text-gray-200">Email: </span>
                {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-50 text-center">
                Your Listings
              </h2>
              {!loading && userProperties.length === 0 && (
                <p className="text-gray-200">You have no listings</p>
              )}

              {loading && <Spinner loading={loading} />}

              {!loading &&
                userProperties.length > 0 &&
                userProperties.map((property) => (
                  <div className="mb-10">
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        width={600}
                        height={350}
                        alt="Property 1"
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold text-gray-50">
                        {property.name}
                      </p>
                      <p className="text-gray-200">
                        Address: {property.location.street},
                        {property.location.city},{property.location.state}-{property.location.zipcode}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                      onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
