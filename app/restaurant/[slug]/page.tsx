import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import {
  Cuisine,
  PRICE,
  PrismaClient,
  Restaurant,
  Review,
} from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export interface RestaurantType {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
  open_time: string;
  close_time: string;
}

const fetchRestaurant = async (slug: string): Promise<RestaurantType> => {
  const restaurant: RestaurantType | null = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    // when we want to show error.tsx
    // throw new Error("Can't find restaurant!");
    // when we want to show not-found.tsx
    notFound();
  }

  return restaurant;
};

const RestaurantDetails = async ({ params }: any) => {
  const slug = params.slug;

  const restaurant = await fetchRestaurant(slug);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />

        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] sticky top-0 text-reg">
        <ReservationCard
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
          slug={slug}
        />
      </div>
    </>
  );
};

export default RestaurantDetails;
