import RestaurantNavBar from "./components/RestaurantNavBar";
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
import Header from "./components/Header";

const prisma = new PrismaClient();

export interface RestaurantType {
  id: number;
  name: string;
  main_image: string;
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
      main_image: true,
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
      <Header name={restaurant.slug} mainImage={restaurant.main_image} />
      <div className="flex m-auto w-2/3 xl:w-4/5 md:w-[100%] sm:w[98%] md:p-2 justify-between -mt-11">
        <div className="z-10 bg-white w-[70%] sm:w-[100%] p-3 ">
          <RestaurantNavBar slug={restaurant.slug} />
          <Rating reviews={restaurant.reviews} />
          <Description description={restaurant.description} />
          <div className="hidden sm:block">
            <ReservationCard
              openTime={restaurant.open_time}
              closeTime={restaurant.close_time}
              slug={slug}
            />
          </div>
          <Images images={restaurant.images} />

          <Reviews reviews={restaurant.reviews} />
        </div>
        <div className="w-[27%] md:w-[29%] sticky top-0 text-reg sm:hidden">
          <ReservationCard
            openTime={restaurant.open_time}
            closeTime={restaurant.close_time}
            slug={slug}
          />
        </div>
      </div>
    </>
  );
};

export default RestaurantDetails;
