import connectDB from "@/app/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";



//GET /api/properties

export const GET= async (request) => {
    try {
        
        await connectDB();
        const properties= await Property.find({})
        return new Response(JSON.stringify(properties))

    } catch (error) {
        return new Response(JSON.stringify({'message':'Error fetching properties'}))
    }
}

export const POST = async (request) => {
    try {
        //connect to DB
        await connectDB();

        //get the user from session
        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.userId){
            return new Response(JSON.stringify({message:'Unauthorized'}),{status:401});
        }

        const {userId}=sessionUser;

        const formData=await request.formData();

        //access amenities and images in a special manner
        const amenities=formData.getAll('amenities');
        const images=formData.getAll('images').filter((images) => images.name!=='');

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
            // images
        }




        //create new property and save to the database
        const newProperty= new Property(propertyData);
        await newProperty.save();

        // return new Response(JSON.stringify({message:'Sent'}),{status:200});   

        //return to properties page
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
    } catch (error) {
       console.log(error);
    }
}