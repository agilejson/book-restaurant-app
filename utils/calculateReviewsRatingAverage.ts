import { Review } from "@prisma/client";

export const calculateReviewsRatingAverage = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const reviewSum = reviews.reduce((sum, reviews) => {
    return sum + reviews.rating;
  }, 0);
  return reviewSum / reviews.length;
};
