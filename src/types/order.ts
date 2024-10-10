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

export interface IOrderListParams {
    user_id: string;
    page?: number;
    limit?: number;
    filter?: string;
    search?: string;
}

export interface IProductReviewParams {
    user_id: string;
    product_id: string | number;
    review: string;
    rating: number;
}

export interface IReview {
    id: number;
    user_id: number;
    product_id: number;
    review: string;
    rating: number;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
}


