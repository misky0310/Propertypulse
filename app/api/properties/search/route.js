import connectDB from "@/app/config/database";
import Property from "@/models/Property";

export const GET = async (request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    
    //Create a pattern to search for the location in the database
    const locationPattern=new RegExp(location, 'i');
    
    // Create a query object to search for the location in the database
    let query={
      $or:[
        {name:locationPattern},
        {description:locationPattern},
        {'location.street':locationPattern},
        {'location.city':locationPattern},
        {'location.state':locationPattern},
        {'location.zipcode':locationPattern},
      ]
    };

    // If propertyType is not 'All', add it to the query
    if(propertyType && propertyType!=='All'){
      const typePattern=new RegExp(propertyType, 'i');
      query.type=typePattern;
    }

    const properties=await Property.find(query);
    
    return new Response(JSON.stringify(properties), { status: 200 });
  
  } catch (error) {
    
    console.log(error);
    return new Response(JSON.stringify({message:"An error occured"}), { status: 500 });
  }
};
