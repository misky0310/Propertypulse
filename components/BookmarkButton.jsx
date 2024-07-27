"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBookmarked = async () => {

      if (!userId) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        if (!res.ok) {
          console.log("An error occurred");
          return;
        }

        const data = await res.json();
        setIsBookmarked(data.isBookmarked);

      } catch (error) {
        console.log(error);
      } finally{
        setIsLoading(false);
      }
    };
    checkBookmarked();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be logged in to bookmark a property");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (!res.ok) {
        toast.error("An error occurreds");
        return;
      }

      const data = await res.json();
      toast.success(data.msg);

      setIsBookmarked(data.isBookmarked);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {<p>Loading...</p>}
  return( 
    isBookmarked? (
      <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Property
    </button>
    ) : (
      <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
    )
  );
};

export default BookmarkButton;
