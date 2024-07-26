import connectDB from "@/app/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

//GET /api/properties/[:id]

export const GET = async (request, {params}) => {
    try {
        await connectDB();
        const property=await Property.findById(params.id);
        
        if(!property) return new Response('Property not found', {status: 404});

        return new Response(JSON.stringify(property), {status:200})


    } catch (error) {
        console.log(error);
    }
}

export const DELETE= async (request,{params}) => {
    try {
        await connectDB();
        
        const propertyId=params.id;

        const session = await getSessionUser();

        if(!session || !session.userId){
            return new Response('User ID is required', {status:401});
        }

        const {userId}=session;

        const property=await Property.findById(params.id);
        
        if(!property) return new Response('Property not found', {status: 404});

        //verify ownership
        if(property.owner.toString()!==userId)
            return new Response('Unauthorized', {status:401});
        await property.deleteOne();

        return new Response('Property Deleted', {status:200})


    } catch (error) {
        console.log(error);
    }
}

//PUT /api/properties/:id
export const PUT = async (request,{params}) => {
    try {
        //connect to DB
        await connectDB();

        //get the user from session
        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.userId){
            return new Response(JSON.stringify({message:'Unauthorized'}),{status:401});
        }
        
        const {id}=params;
        const {userId}=sessionUser;

        //get property to update
        const existingProperty=await Property.findById(id);

        if(!existingProperty) return new Response('Property doesnt exist',{status:404});
        console.log(existingProperty)

        //verify ownershipx
        if(existingProperty.owner.toString()!==userId) return new Response('Unauthorized',{status:404});

        const formData=await request.formData();

        //access amenities and images in a special manner
        const amenities=formData.getAll('amenities');

        //create object for the database containing all the fields

        const propertyData={
            type:formData.get('type'),
            name:formData.get('name'),
            description:formData.get('description'),
            location:{
                street:formData.get('location.street'),
                city:formData.get('location.city'),
                state:formData.get('location.state'),
                zipcode:formData.get('location.zipcode')
            },
            beds:formData.get('beds'),
            baths:formData.get('baths'),
            square_feet:formData.get('square_feet'),
            amenities,
            rates:{
                nightly:formData.get('rates.nightly'),
                weekly:formData.get('rates.weekly'),
                monthly:formData.get('rates.monthly')
            },
            seller_info:{
                name:formData.get('seller_info.name'),
                phone:formData.get('seller_info.phone'),
                email:formData.get('seller_info.email')
            },
            owner:userId,
        }



        //update new property and save to the database
        const updatedProperty=await Property.findByIdAndUpdate(id,propertyData)

        return new Response(JSON.stringify(updatedProperty),{status:200});   

    } catch (error) {
       console.log(error);
    }
}