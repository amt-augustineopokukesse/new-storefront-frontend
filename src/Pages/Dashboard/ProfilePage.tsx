import "../../assets/styles/dashboardStyles/ProfilePage.scss";
import editLogo from "../../assets/svg/icons8-edit.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AuthLoader } from "../../components/authComponents/AuthLoader";
import api from "../../Redux/axiosClient";

type UserProfile = {
  profile_picture: string;
  business_name: string;
  email: string;
};

type EditForm = {
  value: string;
  editmode: boolean;
};

interface EditUser {
  user: UserProfile;
  editForm: EditForm;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProfilePage: React.FC<EditUser> = (props) => {
  const { user } = props;

  const [merchantExists, setmerchantExists] = useState(user);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const merchant = localStorage.getItem("merchant");
    if (merchant) {
      const hasMerchant = JSON.parse(merchant);
      setmerchantExists(hasMerchant);
      if (hasMerchant && hasMerchant.email) {
        formik.values.email = hasMerchant.email || "";
        formik.values.contact = hasMerchant?.contact || "";
        formik.values.address = hasMerchant?.address || "";
      }
    }
  }, []);

  const [contact, setContact] = useState({ value: "", editmode: true });
  const [address, setAddress] = useState({ value: "", editmode: true });
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleAddressChange = () =>
    setAddress({
      value: address.value,
      editmode: address.editmode ? false : true,
    });

  const handleContactChange = () =>
    setContact({
      value: contact.value,
      editmode: contact.editmode ? false : true,
    });

  const formik = useFormik({
    initialValues: { email: "", contact: "", address: "" },
    onSubmit: async (values) => {
      const vals = { ...values };

      try {
        setLoader(true);
        const projectUpdated = await api.put(
          `${API_BASE_URL}/merchant/update`,
          vals
        );
        if (projectUpdated) {
          toast.info("You have updated your information!!");
          localStorage.setItem(
            "merchant",
            JSON.stringify(projectUpdated.data.data)
          );
          setTimeout(() => {
            setLoader(false);
          }, 300);
        } else throw Error("");
        return;
      } catch (error) {
        setTimeout(() => {
          setLoader(false);
        }, 300);
        toast.warn("could not update information");
      }
    },
  });

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // Set the image preview URL
        setProfilePicture(reader.result as string);
      };

      // Read the image file as a data URL
    }
  };

  const uploadProfilePicture = async () => {
    try {
      if (profilePicture) {
        setLoader(true);
        const upload = await api.put(`/api/merchant/profile-picture`, {
          profilePicture,
        });
        if (upload.data.data) {
          toast.info("You have updated your information!!");
          localStorage.setItem("merchant", JSON.stringify(upload.data.data));
          window.location.reload()
          setLoader(true)
        } else throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(
        `Something went wrong, cannot upload image. Kindly contact storefront administrator`
      );
    }
  };

  useEffect(() => {
    uploadProfilePicture();
  }, [profilePicture]);

  return (
    <div className="profile-details">
      {loader ? <AuthLoader /> : ""}

      <div className="image-name">
        <span className="image-input-span">
          <img
            className="photo"
            id="profile-photo"
            src={merchantExists?.profile_picture}
            alt=""
          />
          <input
            type="file"
            onChange={handleFileInputChange}
            className="upload-input"
            id="upload-input"
          />
        </span>
        
        {loader ? <AuthLoader /> : ""}
        <h3 className="name">
          {merchantExists ? merchantExists.business_name : "Merchant"}
        </h3>
      </div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="form-div">
          <label className="profile-label">Email</label>
          <input
            disabled
            type="email"
            name="email"
            value={merchantExists?.email}
          />
        </div>
        <div className="form-div">
          <label htmlFor="contact" className="profile-label">
            Phone
          </label>
          <input
            disabled={contact.editmode}
            onChange={formik.handleChange}
            onBlur={handleContactChange}
            type="tel"
            name="contact"
            value={formik.values.contact}
            placeholder="edit your contact..."
            maxLength={12}
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          />
          <img
            className="edit-button contact-edit-button"
            src={editLogo}
            alt=""
            onClick={handleContactChange}
          />
        </div>
        <div className="form-div">
          <label className="profile-label">Address</label>
          <input
            disabled={address.editmode}
            onChange={formik.handleChange}
            onBlur={handleAddressChange}
            type="text"
            name="address"
            value={formik.values.address}
            placeholder="edit your address..."
            maxLength={15}
          />
          <img
            className="edit-button location-edit-button"
            src={editLogo}
            alt=""
            onClick={handleAddressChange}
          />
        </div>
        <span className="button-span">
          <button
            disabled={
              !formik.values.contact &&
              !formik.values.email &&
              !formik.values.address
            }
            type="submit"
            className="save-profile-details-button"
          >
            Save
          </button>
        </span>
      </form>
    </div>
  );
};
