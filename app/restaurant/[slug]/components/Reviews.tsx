import { Review } from "@prisma/client";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h1 className="font-bold text-2xl mt-10 mb-7 borber-b pb-5 sm:text-center">
        {`What ${reviews.length}  ${
          reviews.length <= 1 ? "person" : "people"
        } are saying`}
      </h1>
      {reviews.map((review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </div>
  );
};

export default Reviews;
