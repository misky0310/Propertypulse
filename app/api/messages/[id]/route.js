import connectDB from "@/app/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const GET= async(request,{params}) => {
    try {
        
        await connectDB();
        const session=await getSessionUser();
        
        if(!session || !session.userId)
            return new Response(JSON.stringify('User must be logged in'),{status:401});

        const {id}=params;
        const {userId}=session;

        const message= await Message.findById(id);

        if(message.recipient.toString()!==userId)
            return new Response(JSON.stringify('This user cannot modify '),{status:400})

        message.read=!message.read;
        await message.save();

        return new Response(message.read);


    } catch (error) {
        console.log(error);
        return new Response('Something went wromg',{status:500})
    }
}