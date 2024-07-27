import connectDB from "@/app/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

//get the user's bookmarks
export const GET= async (request)=> {
    try {
        await connectDB();

        //get the user
        const sessionUser=await getSessionUser();

        if(!sessionUser || !sessionUser.userId)
            return new Response('User ID is required', {status: 400});
        
        const {userId}=sessionUser;

        //find the user from the database
        const user=await User.findById(userId);

        //get the user's bookmarks
        const bookmarks=await Property.find({_id:{$in:user.bookmarks}});

        return new Response(JSON.stringify(bookmarks),{status:200});

        
    } catch (error) {
        console.log(error);
        return new Response('An error occurred',{status:500});
    }
}


//ADD the bookmarked property to the user's bookmarks
export const POST= async (request) => {
    try {
        await connectDB();

        //get the property to be operated upon
        const {propertyId}= await request.json();

        //get the user
        const sessionUser=await getSessionUser();

        if(!sessionUser || !sessionUser.userId)
            return new Response('User ID is required', {status: 400});
        
        const {userId}=sessionUser;


        //find the user from the database
        const user=await User.findById(userId);
        
        let isBookmarked=user.bookmarks.includes(propertyId);
        let msg;

        //if already bookmarked, remove it
        if(isBookmarked){
            user.bookmarks.pull(propertyId);
            msg='Property removed from bookmarks';
            isBookmarked=false;
        }

        //if not bookmarked, add it
        else{
            user.bookmarks.push(propertyId);
            msg='Property added to bookmarks';
            isBookmarked=true;
        }

        await user.save();

        return new Response(JSON.stringify({msg,isBookmarked}),{status:200});

    } catch (error) {
        
    }
}