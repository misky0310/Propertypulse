import React from 'react'
import {FaLocationArrow, FaTimes, FaBath,FaBed,FaRulerCombined,FaCheck} from 'react-icons/fa'

const PropertyDetails = ({property}) => {
  return (
    <main>
            <div
              className="bg-slate-600 p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div className="text-gray-50 mb-4">{property.type}</div>
              <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
              <div
                className="text-gray-500 mb-4 flex justify-center md:justify-start items-center"
              >
                <FaLocationArrow className='text-orange-700 mr-2'/>
                <p className="text-orange-700">
                  {property.location.street}, {property.location.city}, {property.location.state} {property.zipcode}
                </p>
              </div>

              <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                Rates & Options
              </h3>
              <div className="flex flex-col md:flex-row justify-around">
                <div
                  className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                >
                  <div className="text-gray-50 mr-2 font-bold">Nightly</div>
                  <div className="text-2xl font-bold">
                    
                    {!property.rates.nightly ? 
                        <FaTimes className='text-red-500'/> 
                        : 
                        <div className="text-2xl font-bold text-blue-500">${property.rates.nightly.toLocaleString()}</div>
                    }
                  
                  </div>
                </div>
                <div
                  className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                >
                  <div className="text-gray-50 mr-2 font-bold">Weekly</div>
                  <div className="text-2xl font-bold">
                    
                    {!property.rates.weekly ? 
                        <FaTimes className='text-red-500'/> 
                        : 
                        <div className="text-2xl font-bold text-blue-500">${property.rates.weekly.toLocaleString()}</div>
                    }
                  
                  </div>
                </div>
                <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                  <div className="text-gray-50 mr-2 font-bold">Monthly</div>
                  <div className="text-2xl font-bold">
                    
                    {!property.rates.monthly ? 
                        <FaTimes className='text-red-500'/> 
                        : 
                        <div className="text-2xl font-bold text-blue-500">${property.rates.monthly.toLocaleString()}</div>
                    }
                  
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-600 p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6 text-center">Description</h3>
              <div
                className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9"
              >
                <p className='flex justify-center items-center gap-2'>
                  <FaBed/>
                  <span className="hidden sm:inline">{property.beds} {property.beds==1? ' Bed' : ' Beds'}</span>
                </p>
                <p className='flex justify-center items-center gap-2'>
                  <FaBath/>
                  <span className="hidden sm:inline">{property.baths} {property.baths==1? ' Bath' : ' Baths'}</span>
                </p>
                <p className='flex justify-center items-center gap-2'>
                  <FaRulerCombined/>
                  <span className="hidden sm:inline">{property.square_feet} sqft</span>
                </p>
              </div>
              <p className="text-gray-50 mb-4 text-center">
                {property.description}
              </p>
            </div>

            <div className="bg-slate-600 p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Amenities</h3>

              <ul
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none"
              >
                {property.amenities.map((amenity,index) => (
                    <li key={index} className='flex items-center mb-3'>
                        <FaCheck className='text-green-600 mr-2'/> <span className='text-gray-200'>{amenity}</span>
                    </li>
                    
                ))}
                
              </ul>
            </div>
          </main>
  )
}

export default PropertyDetails
