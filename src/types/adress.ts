export interface IProvince {
    id: number | string;
    name: string;
    created_at: string;
    updated_at: string;
}
export interface Village {
    id: number | string;
    village_name: string;
    district_id: number;
    created_at: string;
    updated_at: string;
}

export interface District {
    id: number | string;
    district_name: string;
    province_id: number;
    created_at: string;
    updated_at: string;
    villages: Village[];
}

export interface IAddress {
    id?: string
    user_id: string;
    address_name: string;
    first_name: string;
    last_name: string;
    phone: string;
    provinces: number | string;
    disctrict: number | string;
    village: number | string;
    neighborhood?: string;
    address: string;
    postal_code: number | string
}

export type TadressType = "shippingaddress" | "billingaddress";
export type TlocationType = "provinces" | "districts" | "villages";
export interface IlocationItem {
    id: number | string;
    name: string;
}
export interface IlocationData {
    provinces: IlocationItem;
    disctrict: IlocationItem;
    village: IlocationItem;
}