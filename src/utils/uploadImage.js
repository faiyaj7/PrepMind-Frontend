import { apiRoutes } from "./apiRoute";
import axiosInstance from "./axiosInstance";
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const response = await axiosInstance.post(
      apiRoutes.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export default uploadImage;
