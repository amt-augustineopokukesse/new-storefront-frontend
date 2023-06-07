import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosClient";
import { AxiosError } from "axios";
import { ProjectState } from "./ProjectInitialState";

const getBusinessId = async () => {
    const merchant = localStorage.getItem("merchant"); 
    
    if (merchant) {
      const mX = JSON.parse(merchant)
      return mX.business.id;
    } else return ""
  };
  
  const getProjectId = async () => {
    const project = localStorage.getItem("project"); 
    
    if (project) {
      const pX = JSON.parse(project)
      return pX.id;
    } else return ""
  };

// handle Get All Stores
export const getStores = createAsyncThunk(
    "project/getStores",
    async () => {
      try {
        const business_id = await getBusinessId()
        const response = await api.get(`/project/all/${business_id}`);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            return error.response.data.message;
          }
        }
        return "An error occurred";
      }
    }
  );

  // handle customer gets all his orders info
  export const getOrders = createAsyncThunk(
    "project/getMyOrders",
    async () => {
      try {
        const response = await api.get("/market/orders");
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            return error.response.data.message;
          }
        }
        return "An error occurred";
      }
    }
  );
  
  // handle GetAll Published Stores
  export const getPublishedStores = createAsyncThunk(
    "project/getPublishedstores",
    async () => {
      try {
        const response = await api.get("/market/stores");
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            return error.response.data.message;
          }
        }
        return "An error occurred";
      }
    }
  );
  
  // handleSave
  export const saveProject =  createAsyncThunk(
    "project/saveProject",
    async (project: ProjectState) => {
      try {
        const response = await api.post("/project/new", {
          business_id: await getBusinessId(),
          ...project,
        });
        console.log(response)
        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.log(error)
            return error.response.data.message;
          }
        }
        return "An error occurred";
      }
    }
  );
  
  
  // handleUpdate
  export const updateProject =  createAsyncThunk(
    "project/updateProject",
    async (project: ProjectState) => {
      try {
        const { template, ...values } = project;
        const response = await api.put("/project/update", {
          project_id: await getProjectId(),
          template: template,
          ...values
        });
        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response) {
            return error.response.data.message;
          }
        }
        return "An error occurred";
      }
    }
  );
  
  /**Add to store view count */
  export const addToViewCount =  createAsyncThunk(
    "project/addViews",
    async (id: string) => {
      try {
        const response = await api.put("/market/store/views", {storeId: id});
        return response;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response) {
            return error.response.data.message;
          }
        }
        return "An error occurred";
      }
    }
  );
  
  
  // handlePublish
  export const publishProject =  createAsyncThunk(
    "project/publishProject",
    async () => {
      try {
        const response = await api.put("/project/publish", {
          project_id: await getProjectId(),
        });
        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response) {
            return error.response.data.message;
          }
        }
        return "An error occurred";
      }
    }
  );

  // handle update order delivery level
export const updateDelivery = createAsyncThunk("project/delivery", async (order: {orderId: string, deliveryLevel: string}) => {
    try {
      const response = await api.put("/delivery/update", {
        order_id: order.orderId,
        delivery_level: order.deliveryLevel
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return error.response.data.message;
        }
      }
      return "An error occurred";
    }
  });
  