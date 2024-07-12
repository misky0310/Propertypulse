const fetchProperties =  async() => {
    try {

      if(!process.env.NEXT_PUBLIC_API_DOMAIN)
        return [];

      const res=await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`)
      
        if(!res.ok) throw new Error('Error fetching properties');
  
        return res.json()
  
    } catch (error) {
      console.log(error);
      return [];
    }
}


//FETCH A SINGLE PROPERTY

const fetchProperty = async (id) => {
  try {
    
    if(!process.env.NEXT_PUBLIC_API_DOMAIN)
      return null;

    const res= await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`);
    return res.json();



  } catch (error) {
    console.log(error);
    return null;
  }
}

export {fetchProperties, fetchProperty};
