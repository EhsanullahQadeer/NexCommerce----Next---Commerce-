import { IReview } from "@/types/order";

export const calculateAverageRating = (reviews: IReview[]): number => {

    if (!reviews) return 0
    if (reviews.length === 0) return 0;

    const totalRatings = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
    );
    const averageRating = totalRatings / reviews.length;

    return parseFloat(averageRating.toFixed(2));
};