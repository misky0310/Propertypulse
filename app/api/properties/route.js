import connectDB from "@/app/config/database"
import Property from "@/models/Property";


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