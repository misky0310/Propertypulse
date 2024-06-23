import React from 'react'
import InfoBox from './InfoBox'

const InfoBoxes = () => {
  return (
    <section>
      <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoBox
                title='For Renters'
                bgColor='bg-gray-100'
                buttonInfo={{
                text: 'Browse Properties',
                link: '/properties',
                bgColor: 'bg-black',
                textColor: 'text-white'
                }}
            >
                Find your dream rental property. Bookmark properties and contact
                owners.
            </InfoBox>

            <InfoBox
                title='For Property Owners'
                bgColor='bg-blue-100'
                buttonInfo={{
                    text: 'Add Property',
                    link: '/properties/add',
                    bgColor: 'bg-blue-500',
                    textColor: 'text-white'
                }}
            >
                List your properties and reach potential tenants. Rent as an
                airbnb or long term.
            </InfoBox>

        </div>
      </div>
    </section>
  )
}

export default InfoBoxes
