import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../store";
import { AuthLoader } from "../../../components/authComponents/AuthLoader";
import api from "../../../Redux/axiosClient";
import { setBannerUrl } from "../../../Redux/Templates/ProjectSlice";
import { toast } from "react-toastify";

const UploadForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
    }
  };

  const handleUploadButtonClick = async () => {
    if (imagePreview) {
      setLoader(true);
      try {
        const response = await api.post(
          "/api/merchant/upload-picture",
          { imagePreview }
        );
        const imageUrl = response.data.data.url;
        dispatch(setBannerUrl(imageUrl));
        setLoader(false);
        toast.success('Image upload successful');
      } catch (error) {
        setLoader(false);
        // console.error("An error occurred:", error.response.data.message);
        console.error("An error occurred:", error);
        toast.error(`Something went wrong, cannot upload image. Kindly contact storefront administrator`);
      }
    }
  };

  return (
    <form className="form">
      <div className="upload-container">
        <label className="label">Banner Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="file-input"
        />
        {imagePreview && (
          <div className="image-preview-container">
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleUploadButtonClick}
        className="upload"
      >
        Upload
      </button>
      {loader ? <AuthLoader /> : ""}
    </form>
  );
};

export default UploadForm;