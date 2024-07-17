import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/config/database";
import User from "@/models/User";

export const authOptions = {
    providers:[
        
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        })

    ],

    callbacks:{
        //INVOKED ON SUCCESSFUL SIGN IN

        async signIn({profile}){
            
            //1.Connect to DB
            await connectDB();

            //2.Check if user exists
            const userExists=await User.findOne({email:profile.email})

            //3.If user does not exist, add user to DB and return true
            if(!userExists){
                const username=profile.name.slice(0,20);
                await User.create({
                    email:profile.email,
                    username,
                    image:profile.picture
                })
            }
            return true;
        },

        //MODIFIES THE SESSION OBJECT

        async session ({session}){
            
            //1.Get user from DB
            await connectDB();
            const user=await User.findOne({ email: session.user.email });
            
            //2.Add user id to session
            session.user.id=user._id.toString();
            
            //3.Return session
            return session;
        }
    }
}