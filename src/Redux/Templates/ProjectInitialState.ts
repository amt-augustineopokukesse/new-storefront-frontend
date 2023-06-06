export interface ProductState {
  productName: string;
  category: string;
  unit?: string;
  description?: string;
  price: number;
  image?: string;
  discount?: number;
  initialStock?: number;
  sku?: string;
  id?: string;
  sub_description?: string;
  paragraphs?: string[];
  quantity?: number;
  stockAvailable?: string;
  quantity_sold?: number;
  colors_available?: string[];
  sizes_available?:  string[];
  raw_material?:     string[];
  package?:          string[];
  created_at?:       Date;
  updated_at?:       Date;
}

export const InitialProductState: ProductState = {
  productName: '',
  category: '',
  unit: '',
  description: '',
  price: 0,
  image: '',
  discount: 0,
}
export interface Review {
  id?: string;
  name?: string;
  picture?: string;
  comment?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  projectId?: string;
}
export interface ProductReview {
  id?: string;
  name?: string;
  picture?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  projectId?: string;
  productId?: string;
}


export interface ProjectState {
  id?: string;
  name: string;
  description: string;
  phoneNumber?: string;
  business_id?: string;
  category: string;
  view_count?: number;
  currency?: string;
  facebookURL?: string;
  instagramURL?: string;
  twitterURL?: string;
  subscription_emails?: string[];
  published: boolean;
  address?: string;
  location?: string;
  reviews?: Review[];
  product_reviews?: ProductReview[];
  bannerUrl: string;
  template: {
    primaryColor: string;
    secondaryColor: string;
    bodyFontColor: string;
    nameFontFamily: string;
    bodyFontFamily: string;
    nameFontSize: string;
    bodyFontSize: string;
    otherFontSize: string;
    carouselInclude: boolean;
    id?: string;
    project_id?: string;
    aboutUs?: string;
    contactUs?: boolean;
  };
  products: ProductState[];
}

import image from "../../assets/images/Templates/Ecommerce/heroBackground.png";

export const initialProjectState: ProjectState ={
  name: "Store Name",
  description: "Add your Ecommerce store description",
  phoneNumber: "",
  category: "Ecommerce",
  currency: "GHS",
  facebookURL: "",
  instagramURL: "",
  twitterURL: "",
  published: false,
  address: "",
  location: "",
  bannerUrl: image,
  template: {
    primaryColor: "#15616B",
    secondaryColor: "#ffffff",
    bodyFontColor: "#222222",
    nameFontFamily: "Poppins, sans-serif",
    bodyFontFamily: "Roboto, sans-serif",
    nameFontSize: "96px",
    bodyFontSize: "24px",
    otherFontSize: "40px",
    carouselInclude: true,
    aboutUs: '',
    contactUs: false,
  },
  products: [],
};