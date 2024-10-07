export interface OrderItem {
    product_id: number | string;
    quantity: number | string;
    price_at_order: number | string;
    variant_id: number | string;
}

export interface OrderPayload {
    user_id: number;
    coupon_code?: string;
    // total_amount: string | number;
    shipping_address_id: number | string;
    billing_address_id: number | string;
    order_items: OrderItem[];
    card_holder_name: string;
    card_number: string;
    expire_month: string;
    expire_year: string;
    cvc: string;
    // province_name: string;
    // district_name: string;
    // village_name: string;
}
