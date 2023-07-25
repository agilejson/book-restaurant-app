import Link from "next/link";
import { SearchRestaurantCardType } from "../page";
import Price from "../../components/Price";
import { calculateReviewsRatingAverage } from "../../../utils/calculateReviewsRatingAverage";
import Stars from "../../components/Stars";
import { convertToDisplayTime } from "../../../utils/convertToDisplayTime";

const RestaurantCard = ({
  restaurant,
}: {
  restaurant: SearchRestaurantCardType;
}) => {
  const renderRatingText = (): string => {
    const rating = calculateReviewsRatingAverage(restaurant.reviews);
    if (rating > 4) return "Awesome";
    else if (rating <= 4 && rating > 3) return "Good";
    else if (rating <= 3 && rating > 0) return "Average";
    else return "";
  };
  return (
    <div className="bg-white flex h-42 mb-3">
      <img src={restaurant.main_image} alt="" className="w-44 xsm:w-36" />
      <div className="p-1 pl-2 flex flex-col">
        <h2 className="text-2xl xsm:text-[18px]">{restaurant.name}</h2>
        <div className="flex mb-1">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-md">{renderRatingText()}</p>
        </div>

        <div className="font-light flex items-center text-reg">
          <Price price={restaurant.price} />
          <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
          <p className="capitalize">{restaurant.location.name}</p>
        </div>
        <div className="pt-1">
          <p>{`${convertToDisplayTime(
            restaurant.open_time
          )} - ${convertToDisplayTime(restaurant.close_time)}`}</p>
        </div>
        <div className="text-red-500">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
