import Link from "next/link";
import React from "react";

const InfoBox = ({
    title,
    bgColor,
    children,
    buttonInfo
}) => {
  return (
    <div className={` ${bgColor} p-6 rounded-lg shadow-md relative h-[12rem]`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-6">
        {children}
      </p>
      <Link
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.bgColor} ${buttonInfo.textColor} rounded-lg px-4 py-2 hover:opacity-80 absolute bottom-6`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
