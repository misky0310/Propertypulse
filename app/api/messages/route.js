import connectDB from "@/app/config/database";
import Message from "@/models/Message";
import "@/models/User";
import "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic='force-dynamic' // force dynamic import, otherwise it will 
                                     // cause errors in deploying

//POST /api/messages
export const POST = async(request) => {
    try {
        await connectDB();
        
        //get the form data
        const { name, email, phone, message, property,recipient } = await request.json();

        //get the session user
        const session=await getSessionUser();

        if(!session || !session.userId)
            return new Response(JSON.stringify({message:'User must be logged in'}),{status:401});
        
        //get the user
        const {user}=session;

        //cannot send message to self
        if(user.id===recipient)
            return new Response(JSON.stringify({message:'Cannot send message to self'}),{status:400});
        
        //create the message
        const newMessage =  new Message({
            sender:user.id,
            recipient,
            property,
            name,
            email,
            phone,
            body:message
        })

        //save the message
        await newMessage.save();

        return new Response(JSON.stringify({message:'Message sent successfully'}),{status:200});

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message:'Something went wrong'}),{status:500});
    }
}

//GET /api/messages to get read messages
export const GET= async (request) => {
    try {
        
        await connectDB();

        const session=await getSessionUser();

        if(!session || !session.userId)
            return new Response(JSON.stringify({message:'User must be logged in'}),{status:401});

        const {userId}=session;

        const readMessages=await Message.find({recipient:userId,read:true}).sort({createdAt:-1})
            .populate('sender','username')
            .populate('property','title')
            .lean();

        const unreadMessages=await Message.find({recipient:userId,read:false}).sort({createdAt:-1})
            .populate('sender','username')
            .populate('property','name')
            .lean();

        const messages=[...unreadMessages,...readMessages];

        return new Response(JSON.stringify(messages),{status:200});


    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message:'Something went wrong'}),{status:500});
    }
}