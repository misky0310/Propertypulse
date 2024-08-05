import cloudinary from "@/app/config/cloudinary";
import connectDB from "@/app/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser";


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
        }

        //upload images to cloudinary
        //select images from form
        //convert into array buffer
        //we get the data from buffer
        //upload to cloudinary
        //get the response from cloudinary

        const imageUploadPromises=[];

        for(const image of images){
            const imageBuffer=await image.arrayBuffer();
            const imageArray=Array.from(new Uint8Array(imageBuffer));
            const imageData=Buffer.from(imageArray);

            //conver the image data into base 64
            const imageBase64=imageData.toString('base64');

            //make request to upload to cloudinary
            const result=await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,{
                    folder:'propertypulse'
                }
            )

            //push the secure url to the image upload promises
            imageUploadPromises.push(result.secure_url)

            //wait for all images to upload
            const uploadedImages=await Promise.all(imageUploadPromises)

            propertyData.images=uploadedImages;
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