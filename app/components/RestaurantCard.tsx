import Link from "next/link";
import { RestaurantCardType } from "../page";
import Price from "./Price";
import Stars from "./Stars";

interface Props {
  restaurant: RestaurantCardType;
}

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <div className="w-64 sm:w-80 m-3 overflow-hidden bg-white cursor-pointer">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img
          src={restaurant.main_image}
          alt="restaurant-avatar"
          className="w-full h-36 sm:h-40"
        />
        <div className="p-3">
          <h3 className="text-2xl mb-1.5">{restaurant.name}</h3>
          <div className="flex mb-1.5">
            <Stars reviews={restaurant.reviews} />
            <p className="ml-2">
              {restaurant.reviews.length} review
              {restaurant.reviews.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p className="mr-3"></p>
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1.5 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
