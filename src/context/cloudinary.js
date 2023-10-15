import React, { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import Axios from "axios";
const cloudinaryContext = createContext(null);
export const useCloudinary = () => useContext(cloudinaryContext);

export const CloudinaryProvider = (props) => {
  const uploadImage = async (image,public_id) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("public_id", public_id);
    formData.append("upload_preset", "muhaman");

    Axios.post(
      `https://api.cloudinary.com/v1_1/dmlxb4ea9/image/upload`,
      formData
    ).then((response) => {
      console.log(response);
    });
  };
  const downloadImage = (public_id) => {
    // Construct the Cloudinary URL to download the image
    const cloudinaryURL = `https://res.cloudinary.com/dmlxb4ea9/image/upload/${public_id}`;

    // You can use this URL in an <img> tag or for other purposes to display or download the image.
    console.log("Downloading image:", cloudinaryURL);
  };
  const deleteImage = (public_id) => {
    // Make a DELETE request to Cloudinary to delete the image by public_id
    
    Axios.delete(
      `https://api.cloudinary.com/v1_1/dmlxb4ea9/image/destroy/${public_id}`,
      {
        headers: {
          Authorization: 'aBk_O_ropa3Qq6HOfJsn4oWkyt0', // Replace with your API secret
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log("Image deleted:", response.data);
      } else {
        console.error("Failed to delete image:", response.data);
      }
    })
    .catch((error) => {
      console.error("Error deleting image:", error);
    });
  };
  const cloudinaryFunctions = {
    uploadImage,
    downloadImage,
    deleteImage
  };

  return (
    <cloudinaryContext.Provider value={cloudinaryFunctions}>
      {props.children}
    </cloudinaryContext.Provider>
  );
};

export default CloudinaryProvider;
