import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState, ProjectState, initialProjectState } from "./ProjectInitialState";
import { saveProject } from "./ProjectActions";

const ProjectSlice = createSlice({
  name: "project",
  initialState: initialProjectState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setFacebookURL: (state, action: PayloadAction<string>) => {
      state.facebookURL = action.payload;
    },
    setInstagramURL: (state, action: PayloadAction<string>) => {
      state.instagramURL = action.payload;
    },
    setTwitterURL: (state, action: PayloadAction<string>) => {
      state.twitterURL = action.payload;
    },
    setPublished: (state, action: PayloadAction<boolean>) => {
      state.published = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setBannerUrl: (state, action: PayloadAction<string>) => {
      state.bannerUrl = action.payload;
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.template.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<string>) => {
      state.template.secondaryColor = action.payload;
    },
    setBodyFontColor: (state, action: PayloadAction<string>) => {
      state.template.bodyFontColor = action.payload;
    },
    setNameFontFamily: (state, action: PayloadAction<string>) => {
      state.template.nameFontFamily = action.payload;
    },
    setBodyFontFamily: (state, action: PayloadAction<string>) => {
      state.template.bodyFontFamily = action.payload;
    },
    setNameFontSize: (state, action: PayloadAction<string>) => {
      state.template.nameFontSize = action.payload;
    },
    setBodyFontSize: (state, action: PayloadAction<string>) => {
      state.template.bodyFontSize = action.payload;
    },
    setOtherFontSize: (state, action: PayloadAction<string>) => {
      state.template.otherFontSize = action.payload;
    },
    setCarouselInclude: (state, action: PayloadAction<boolean>) => {
      state.template.carouselInclude = action.payload;
    },
    addProduct: (state, action: PayloadAction<ProductState>) => {
      state.products.push(action.payload);
    },
    setContactUsPage: (state, action: PayloadAction<boolean>) => {
      state.template.contactUs = action.payload;
    },
    setAboutUsPage: (state, action: PayloadAction<string>) => {
      state.template.aboutUs = action.payload;
    },
    setProject: (state, action: PayloadAction<ProjectState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setProjectReviews: (state, action: PayloadAction<ProjectState>) => {
      state.reviews?.push(action.payload);
    },
    setProductReviews: (state, action: PayloadAction<ProjectState>) => {
      state.product_reviews?.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(saveProject.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

export const {
  addProduct, setCarouselInclude, setOtherFontSize, setBodyFontSize, setNameFontSize, setBodyFontFamily,
  setNameFontFamily, setBodyFontColor, setSecondaryColor, setPrimaryColor, setBannerUrl, setLocation,
  setAddress, setPublished, setTwitterURL, setInstagramURL, setFacebookURL, setCurrency, setCategory, setPhoneNumber,
  setDescription, setProject, setName, setContactUsPage, setAboutUsPage, setProjectReviews, setProductReviews
} = ProjectSlice.actions;

export default ProjectSlice.reducer;
