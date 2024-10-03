export interface IProvince {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}
export interface Village {
    id: number;
    village_name: string;
    district_id: number;
    created_at: string;
    updated_at: string;
}

export interface District {
    id: number;
    district_name: string;
    province_id: number;
    created_at: string;
    updated_at: string;
    villages: Village[];
}

export interface IAddress {
    user_id: string;
    address_name: string;
    first_name: string;
    last_name: string;
    phone: string;
    provinces: number | null; 
    disctrict: number | null; 
    village: number | null; 
    neighborhood?: string;
    address: string;
}

