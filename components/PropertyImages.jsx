import Image from "next/image";
import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }) => {
  const options = {
    arrowPrev: true,
    arrowNext: true,
    zoom: false,
    close: true,
    counter: false,
    bgOpacity: 0.9,
    padding: { top: 40, bottom: 40, left: 100, right: 100 },
  };
  return (
    <Gallery options={options}>
      <section className="bg-black p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  src={images[0]}
                  ref={ref}
                  onClick={open}
                  alt=""
                  className="h-[400px] mx-auto rounded-xl object-cover cursor-pointer"
                  width={0}
                  height={0}
                  priority={true}
                />
              )}
            </Item>
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
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1024"
                    height="768"
                  >
                    {({ ref, open }) => (
                      <Image
                        src={image}
                        ref={ref}
                        onClick={open}
                        alt=""
                        className="h-[400px] w-full rounded-xl object-cover cursor-pointer"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
