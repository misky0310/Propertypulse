import connectDB from "@/app/config/database"
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const GET = async(request) => {
    try {
        
        await connectDB();
        const session=await getSessionUser();
        
        if(!session || !session.userId)
            return new Response(JSON.stringify('User must be logged in'),{status:401});

        const {userId}=session;

        const unreadCount= await Message.countDocuments(
            {
                recipient:userId,
                read:false
            }
        );

        return new Response(JSON.stringify(unreadCount));


    } catch (error) {
        console.log(error);
        return new Response('Something went wromg',{status:500})
    }
}