import React, { useState } from 'react';
import { useAppDispatch } from '../../../store';
import { resizeImage } from './ProductEditUtils';
import { AuthLoader } from "../../../components/authComponents/AuthLoader";
import { addProduct } from '../../../Redux/Templates/ProjectSlice';
import api from '../../../Redux/axiosClient';
import { toast } from 'react-toastify';


//const IMAGE_UPLOAD_API_KEY = import.meta.env.VITE_IMAGE_UPLOAD_URL_KEY;

const ProductsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [productName, setProductName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [discount, setDiscount] = useState<string>('');
  const [initialStock, setInitialStock] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);


  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const resizedImage = await resizeImage(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImagePreview(reader.result as string);
        
        try {
          setLoader(true);
          const response = await api.post(
            "/api/merchant/upload-picture",
            { imagePreview: reader.result as string }
          );
          const imageUrl = response.data.data.url;
          setImage(imageUrl);
          setLoader(false);
          toast.success('Image upload successful');
        } catch (error) {
          setLoader(false);
          toast.error(`Something went wrong, cannot upload image. Kindly contact storefront administrator`);
        }
      };
      reader.readAsDataURL(resizedImage);
    }  
  };
  
  

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount(e.target.value);
  };

  const handleInitialStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialStock(e.target.value);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const category = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    setCategory(category);
  };
  
  

  const handleAddProduct = () => {
    const newProduct = {
      productName: productName,
      description: description,
      price: Number(price),
      image: image,
      discount: Number(discount),
      initialStock: Number(initialStock),
      unit: unit,
      category: category,
    };
    dispatch(addProduct(newProduct));

    setProductName('');
    setDescription('');
    setPrice('');
    setImage('');
    setDiscount('');
    setInitialStock('');
    setCategory('');
    setUnit('');
    setImagePreview(null);
  };

  return (
    <form className="form">
        <div className="input-containers">
          <label className="label">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={handleProductNameChange}
            className="input"
          />
        </div>
        <div className="input-containers">
          <label className="label">Unit:</label>
          <input
            type="text"
            value={unit}
            onChange={handleUnitChange}
            className="input"
          />
        </div>

        <div className="input-containers">
          <label className="label">Category:</label>
          <input
            type="text"
            value={category}
            onChange={handleCategoryChange}
            className="input"
          />
        </div>

        <div className="input-containers">
          <label className="label">Description:</label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="input"
          />
        </div>
        <div className="input-containers">
          <label className="label">Price:</label>
          <input
            type="number"
            value={price}
            pattern="\d+"
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === '.') {
                e.preventDefault();
              }
            }}
            onChange={handlePriceChange}
            className="input"
          />
        </div>
        <div className="upload-container">
          <label className="label">Product Images:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          {imagePreview && (
            <div className="image-preview-container">
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            </div>
          )}
          {loader ? <AuthLoader /> : ""}
        </div>
        <div className="input-containers">
          <label className="label">Discount:</label>
          <input
            type="number"
            min={0}
            max={100}
            pattern="\d+"
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === '.') {
                e.preventDefault();
              }
            }}
            value={discount}
            onChange={handleDiscountChange}
            className="input"
          />
        </div>
        <div className="input-containers">
          <label className="label">Initial Stock:</label>
          <input
            type="number"
            min={0}
            value={initialStock}
            onChange={handleInitialStockChange}
            pattern="\d+"
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === '.') {
                e.preventDefault();
              }
            }}
            className="input"
          />
        </div>
        <button type="button" onClick={handleAddProduct} className="add-product">
          Add Product
        </button>
      </form>
  );
};

export default ProductsForm;
