import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';
import axios, { AxiosError } from 'axios';

interface UploadImageResponse {
  imageUrl: string; // Replace with the actual response structure
}

const uploadImage = async (imageFile: File): Promise<UploadImageResponse> => {
  const formData = new FormData();
  // Append image file to form data
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post<UploadImageResponse>(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Set header for file upload
        },
      }
    );
    return response.data; // Return response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error uploading the image:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error uploading the image:', error);
    }
    throw error; // Rethrow error for handling
  }
};

export default uploadImage;