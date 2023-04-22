import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";

export interface SearchRestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
}

const prisma = new PrismaClient();

const fetchRestaurantByCity = (
  city: string | undefined
): Promise<SearchRestaurantCardType[]> => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    slug: true,
    price: true,
    cuisine: true,
    location: true,
  };
  // when user does not provide the city i.e. searched without city
  if (!city) return prisma.restaurant.findMany({ select });

  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select,
  });
};
const Search = async ({ searchParams }: { searchParams: { city: string } }) => {
  const restaurants = await fetchRestaurantByCity(searchParams.city);
  console.log(restaurants);
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} />
            ))
          ) : (
            <p>No Restaurant Found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
