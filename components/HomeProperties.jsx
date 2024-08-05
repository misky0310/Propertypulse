import React from "react";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import { fetchProperties } from "@/utils/requests";
import connectDB from "@/app/config/database";
import Property from "@/models/Property";



const HomeProperties = async () => {
  await connectDB();

  const propertiesFromDB= await Property.find({}).lean();

  const properties=JSON.parse(JSON.stringify(propertiesFromDB));

  const recentProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center bg-white w-fit mx-auto px-7 py-2 rounded-lg">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties.map((property) => (
              <PropertyCard property={property} key={property.id} />
            ))}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-slate-600 text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
