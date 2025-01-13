import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import service from '../appwrite/conf';

function PostCard({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
      service.getFilePreview(featuredImage)
      .then((imageUrl)=>{
        if(imageUrl){
            setImageUrl(imageUrl)
        }
    })
  }, []);
  
  
  

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {imageUrl && ( // Conditionally render the image
            <img
              src={imageUrl}
              alt={title}
              className="rounded-xl"
            />
          )}
          {!imageUrl && ( // Render a placeholder or loading indicator
            <div className="w-full h-24 bg-gray-200 rounded-xl" /> 
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;