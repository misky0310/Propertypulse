import React from "react";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
import connectDB from "../config/database";
import Property from "@/models/Property";
import Pagination from "@/components/Pagination";

const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 9 } }) => {
  await connectDB();

  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});
  const propertiesFromDB = await Property.find({})
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .lean();

  const properties = JSON.parse(JSON.stringify(propertiesFromDB));

  const showPagination = total > pageSize;

  return (
    <section className="px-4 py-6 text-white h-screen">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            total={total}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
