"use client";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const SavedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");

        if (!res.ok) {
          toast.error("Failed to fetch");
        }

        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.log(error);
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6 text-white h-screen">
      <h1 className="text-2xl mb-4 text-center">SAVED PROPERTIES</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p className="text-center">No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedProperties;
