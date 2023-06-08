export interface ProductInitState {
    category: string;
    colors_available: string[];
    created_at: string;
    description: string;
    discount: string;
    id: string;
    image: string;
    initialStock: number;
    package: string[]; 
    paragraphs: string[]; 
    price: number;
    productName: string;
    project_id: string;
    quantity: string;
    quantity_sold: string;
    raw_material: string[]; 
    sizes_available: string[];
    sku: string;
    stars: string;
    stockAvailable: string;
    sub_description: string;
    unit: string;
    updated_at: string;
  }
  
  export interface OrderInitState {
    amount: number;
    associated_account_number: string;
    created_at: string;
    delivery_completed: boolean;
    delivery_level_reached: string;
    id: string;
    paid: boolean;
    payment_method: string;
    pickup_mode: string;
    products: string; 
    project_id: string;
    shipping_reciepient_address: string;
    shipping_reciepient_contacts: string[]; 
    shipping_reciepient_names: string[]; 
    updated_at: string;
    userId: string;
  }
  
  export interface TemplateInitState {
    aboutUs: string;
    bodyFontColor: string;
    bodyFontFamily: string;
    bodyFontSize: string;
    carouselInclude: boolean;
    contactUs: boolean;
    id: string;
    nameFontFamily: string;
    nameFontSize: string;
    otherFontSize: string;
    primaryColor: string;
    project_id: string;
    secondaryColor: string;
  }

export const ProductInit = {
    category: "",
    colors_available: [],
    created_at: "",
    description: "",
    discount: "",
    id: "",
    image: "",
    initialStock: 0,
    package: [],
    paragraphs: [],
    price: 0,
    productName: "",
    project_id: "",
    quantity: "",
    quantity_sold: "",
    raw_material: [],
    sizes_available: [],
    sku: "",
    stars: "",
    stockAvailable: "",
    sub_description: "",
    unit: "",
    updated_at: ""
}


export const OrderInit = {
    amount: 0,
    associated_account_number: "",
    created_at: "",
    delivery_completed: false,
    delivery_level_reached: "",
    id: "",
    paid: true,
    payment_method: "",
    pickup_mode: "",
    products: "",
    project_id: "",
    shipping_reciepient_address: "",
    shipping_reciepient_contacts: [],
    shipping_reciepient_names: [],
    updated_at: "",
    userId: ""
}

export const TemplateInit = {
    aboutUs: "",
    bodyFontColor: "",
    bodyFontFamily: "",
    bodyFontSize: "",
    carouselInclude: false,
    contactUs: false,
    id: "",
    nameFontFamily: "",
    nameFontSize: "",
    otherFontSize: "",
    primaryColor: "",
    project_id: "",
    secondaryColor: "",
}

export const StoreInit = {
    address:             "",
    bannerUrl:           "",
    business_id:         "",
    category:            "",
    currency:            "",
    description:         "",
    facebookURL:         "",
    id:                  "",
    instagramURL:        "",
    location:            "",
    name:                "",
    orders:              [OrderInit],
    phoneNumber:         "",
    products:            [ProductInit],
    published:           false,
    subscription_emails: [],
    template:            TemplateInit,
    twitterURL:          "",
    view_count:          0,
}

export interface StoreState {
    address: string;
    bannerUrl: string;
    business_id: string;
    category: string;
    currency: string;
    description: string;
    facebookURL: string;
    id: string;
    instagramURL: string;
    location: string;
    name: string;
    orders: OrderInitState[];
    phoneNumber: string;
    products: ProductInitState[];
    published: boolean;
    subscription_emails: string[];
    template: TemplateInitState;
    twitterURL: string;
    view_count: number;
  }

export interface Order {    
    amount?: number;
    created_at: string;
    paid?: boolean;
    delivery_completed?: boolean;
    shipping_reciepient_address?: string;
    delivery_level_reached?: string;
    id?: string;
    payment_method?: string;
    pickup_mode?: string;
    products?: string;
    shipping_reciepient_contacts?: string[];
    shipping_reciepient_names?: string[];
    userId?: string;
}

export interface Project {
  id: number;
  orders: Order[];
}
