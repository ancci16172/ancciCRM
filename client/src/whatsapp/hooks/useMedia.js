import { useEffect, useState } from "react";
import { getAvailableMediaRequest,insertNewMediaRequest ,deleteMediaRequest} from "../api/whatsapp.api.js";

export const useMedia = () => {
  const [availableMedia, setAvailableMedia] = useState([]);

  
  const fetchAvailableMedia = async () => {
    try {
      const fetchedMedia = await getAvailableMediaRequest();
      setAvailableMedia(fetchedMedia.data.availableMedia);

    } catch (error) {
      console.log("ERROR getting available media");
    }
  };

  const submitNewFile = async (values) => {
    try {
      console.log("about to submit new file",values);
      const response = await insertNewMediaRequest(values);      
      console.log(response);
      fetchAvailableMedia()
    } catch (error) {

      console.log(error);
      return error.response.data
    }

  }

  const deleteMedia = async (mediaName) => {
    try {
      const response = await deleteMediaRequest(mediaName);
      console.log("response on delete media",response);
      return {error : false,data : response.data}

    } catch (error) {
      console.log("error",error);
      return {error : true,data : error.response.data}
    } finally{
      await fetchAvailableMedia()
    }
  } 

  useEffect(() => {
    fetchAvailableMedia();
  }, []);

  return { availableMedia ,submitNewFile,deleteMedia};
};
