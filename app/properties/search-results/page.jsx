"use client";

import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const SearchPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (!res.ok)
          toast.error("An error occured while fetching search results");
        else {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occured while fetching search results");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, propertyType]);

  console.log(properties);

  return(
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center sm:px-6 lg:px-8">
          <PropertySearchForm/>
        </div>
      </section>
      loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6 text-white h-screen">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-5 font-bold">Search Results</h1>
        {properties.length === 0 ? (
          <p>No Properties Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Link
          href={`/properties`}
          className="flex items-center text-blue-500 mt-6 hover:underline w-fit text-lg"
        >
          <FaArrowAltCircleLeft className="mr-2" /> Back to Properties
        </Link>
      </div>
    </section>
  ) </>
  );
};

export default SearchPage;
