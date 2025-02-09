import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export interface SiteSetting {
  id: number;
  brand_name: string;
  description: string;
  email: string;
  phone_number: string;
  selected_language_id: number;
  selected_currencies_id: number;
  initial_selected_currencies_id:number;
  social_media_details: string;
  vat_amount: string;
  shipping_amount: string;
  initial_shipping_amount: string;
  free_shipping_threshold: string;
  initial_free_shipping_threshold: string;
  created_at: string;
  updated_at: string;
  site_status: number;
  email_verification_status: number;
  site_url: string;
  address: string;
  state: string;
  city: string;
  country: string;
  postal_code: string;
  logo_url: string;
}

interface SiteSettingDB {
  id: 0;
  key: "";
  value: "";
  created_at: "";
  updated_at: "";
  selected_currencies_id:number
}

const initialState: SiteSetting = {
  id: 0,
  brand_name: "",
  description: "",
  email: "",
  phone_number: "",
  selected_language_id: 0,
  selected_currencies_id: 0,
  initial_selected_currencies_id:0,
  social_media_details: "",
  vat_amount: "",
  shipping_amount: "",
  initial_shipping_amount: "",
  free_shipping_threshold: "",
  initial_free_shipping_threshold: "",
  created_at: "",
  updated_at: "",
  site_status: 0,
  email_verification_status: 0,
  site_url: "",
  address: "",
  state: "",
  city: "",
  country: "",
  postal_code: "",
  logo_url: "",
};

const preserveInitialValuesKeys: string[] = ["selected_currencies_id","free_shipping_threshold","shipping_amount"];

export const siteSettingSlice = createSlice({
  name: "siteSetting",
  initialState,
  reducers: {
    updateSiteSettings: (
      state,
      action: PayloadAction<Partial<SiteSettingDB[]>>
    ) => {
      let obj: any = {};
      action.payload.map((item) => {
       
        if (item  && item.key) {
          if(preserveInitialValuesKeys.includes( item.key)){
            const initialKey = `initial_${item.key}` as keyof SiteSetting; ;
            const getType = typeof state[initialKey];
            if (getType === 'string') {
              obj[initialKey] = String(item.value); 
            } else if (getType === 'number') {
              obj[initialKey] = Number(item.value); 
            }
          }
          obj[item.key] = item.value;
        }
      });

      Object.assign(state, obj);
    },
    updateSiteName: (state, action: PayloadAction<SiteSetting>) => {
      state.selected_language_id = action.payload.selected_language_id;
    },
    updateSiteCurrency: (state, action: PayloadAction<{selected_currencies_id:number}>) => {
      state.selected_currencies_id = action.payload.selected_currencies_id;
    },
    updateSiteShippingData:(state, action: PayloadAction<{free_shipping_threshold:string,shipping_amount:string}>) => {
      state.free_shipping_threshold = action.payload.free_shipping_threshold;
      state.shipping_amount = action.payload.shipping_amount;
    },
  },
});

export const { updateSiteSettings, updateSiteName ,updateSiteCurrency ,updateSiteShippingData} = siteSettingSlice.actions;

// Selectors
export const selectSiteSetting = (state: RootState) => state.siteSettingSlice;

export default siteSettingSlice.reducer;
