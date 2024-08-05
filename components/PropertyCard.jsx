"use client";
import React from "react";
import Image from "next/image";

import {
  FaBath,
  FaBed,
  FaRulerCombined,
  FaMoneyBill,
  FaLocationArrow,
} from "react-icons/fa";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PropertyCard = ({ property }) => {
  const getRate = () => {
    if (property.rates.monthly) return `${property.rates.monthly} /mo`;
    else if (property.rates.weekly) return `${property.rates.weekly} /wk`;
    else if (property.rates.nightly) return `${property.rates.nightly} /night`;
  };

  const path = usePathname();

  return (
    <div className="rounded-xl shadow-md relative hover:scale-105 transition-all">
      <Link
        href={`${path === "properties" ? "" : "/properties"}/${property._id}`}
        className="hover:cursor-pointer"
      >
        <Image
          src={property.images[0]}
          alt=""
          height={0}
          width={0}
          sizes="100vw"
          className="w-full h-auto rounded-t-xl"
        />
      </Link>

      <div className="p-4 bg-slate-800 rounded-b-lg ">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-400">{property.type}</div>
          <h3 className="text-xl text-slate-300 font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${getRate()}
        </h3>

        <div className="flex justify-center gap-4 text-white mb-4">
          <p className="flex items-center">
            <FaBed className="mr-2" />
            {property.beds}
            <span className="md:hidden lg:inline">
              {property.beds == "1" ? "Bed" : "Beds"}
            </span>
          </p>
          <p className="flex items-center">
            <FaBath className="mr-2" />
            {property.baths}
            <span className="md:hidden lg:inline">
              {property.baths == "1" ? "Bath" : "Baths"}
            </span>
          </p>
          <p className="flex items-center">
            <FaRulerCombined className="mr-2" />
            {property.square_feet}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-500 text-sm mb-4">
          {property.rates.weekly !== 0 && (
            <p className="flex items-center">
              <FaMoneyBill className="mr-1" />
              Weekly
            </p>
          )}
          {property.rates.monthly !== 0 && (
            <p className="flex items-center">
              <FaMoneyBill className="mr-1" />
              Monthly
            </p>
          )}
          {property.rates.nightly !== 0 && (
            <p className="flex items-center">
              <FaMoneyBill className="mr-1" />
              Nightly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex items-center align-middle gap-2 mb-4 lg:mb-0">
            <FaLocationArrow className="text-orange-700 text-lg" />
            <span className="text-orange-700 w-8/12">
              {" "}
              {property.location.street}, {property.location.city} -{" "}
              {property.location.state}{" "}
            </span>
          </div>
          <Link
            href={`${path === "properties" ? "" : "/properties"}/${
              property._id
            }`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
