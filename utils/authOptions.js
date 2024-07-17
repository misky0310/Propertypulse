import GoogleProvider from "next-auth/providers/google";

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
            //2.Check if user exists
            //3.If user exists, return true
            //4.If user does not exist, add user to DB and return true
        },

        //MODIFIES THE SESSION OBJECT

        async session ({session}){
            //1.Get user from DB
            //2.Add user to session
            //3.Return session
        }
    }
}