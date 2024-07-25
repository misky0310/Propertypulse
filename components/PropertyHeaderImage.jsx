import React from "react";
import Image from "next/image";

const PropertyHeaderImage = ( {image} ) => {
  return (
    <section>
      <div className="container-xl m-auto mt-5 border-4 rounded-lg">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            className="h-screen w-full object-cover"
            sizes="100vw"
            width={0}
            height={0}
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
