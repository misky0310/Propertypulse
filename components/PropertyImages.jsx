import Image from "next/image";
import React from "react";

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-black p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            className="h-[400px] mx-auto rounded-xl object-cover"
            width={0}
            height={0}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`
                                ${
                                  images.length === 3 && index == 2
                                    ? "col-span-2"
                                    : "col-span-1"
                                }    
                            `}
              >
                <Image
                  src={image}
                  alt=""
                  className="h-[400px] w-full rounded-xl object-cover"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
