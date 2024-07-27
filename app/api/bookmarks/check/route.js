import connectDB from "@/app/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

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

        return new Response(JSON.stringify({isBookmarked}),{status:200});

    } catch (error) {
        
    }
}