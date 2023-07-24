import { Item, PrismaClient, Review } from "@prisma/client";
import Menu from "../components/Menu";
import RestaurantNavBar from "../components/RestaurantNavBar";
import { notFound } from "next/navigation";
import Header from "../components/Header";
import ReservationCard from "../components/ReservationCard";

const prisma = new PrismaClient();

export interface RestaurantType {
  id: number;
  name: string;
  main_image: string;
  images: string[];
  description: string;
  items: Item[];
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
      items: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
  console.log(params);
  const slug = params.slug;
  const restaurant = await fetchRestaurant(slug);

  return (
    <>
      <Header name={restaurant.slug} mainImage={restaurant.main_image} />
      <div className="flex m-auto w-2/3 xl:w-4/5 md:w-[100%] sm:w[98%] md:p-2 justify-between -mt-11">
        <div className="bg-white w-[70%] sm:w-[100%] p-3">
          <RestaurantNavBar slug={restaurant.slug} />
          <Menu menu={restaurant.items} />
          <div className="hidden sm:block">
            <ReservationCard
              openTime={restaurant.open_time}
              closeTime={restaurant.close_time}
              slug={restaurant.slug}
            />
          </div>
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

export default RestaurantMenu;
