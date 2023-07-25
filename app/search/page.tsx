import Header from "../components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE, Review, PrismaClient } from "@prisma/client";
import { Time } from "../../utils/convertToDisplayTime";

// card that will be show on the search page
export interface SearchRestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  reviews: Review[];
  open_time: string;
  close_time: string;
}

// type for the url query
export interface SearchParamType {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const prisma = new PrismaClient();

const fetchRestaurant = async (
  searchParams: SearchParamType
): Promise<SearchRestaurantCardType[]> => {
  // these are the fields that we want
  const select = {
    id: true,
    name: true,
    main_image: true,
    slug: true,
    price: true,
    cuisine: true,
    location: true,
    reviews: true,
    open_time: true,
    close_time: true,
  };

  // type for the where parameter that we will use to get filtered data from the server
  interface WhereType {
    location?: {
      name?: {
        equals?: string;
      };
    };
    cuisine?: {
      name?: {
        equals?: string;
      };
    };
    price?: {
      equals?: PRICE;
    };
  }
  // create any empty where and later we will add parameter based on the url query
  let where: WhereType = {};

  if (searchParams.city) {
    where.location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
  }
  if (searchParams.cuisine) {
    where.cuisine = {
      name: {
        equals: searchParams.cuisine,
      },
    };
  }
  if (searchParams.price) {
    where.price = {
      equals: searchParams.price,
    };
  }

  const restaurant = await prisma.restaurant.findMany({
    where,
    select,
  });

  return restaurant;
};

const fetchLocation = async (): Promise<Location[]> => {
  const locations = await prisma.location.findMany({});
  return locations;
};

const fetchCuisines = async (): Promise<Cuisine[]> => {
  const cuisines = await prisma.cuisine.findMany({});
  return cuisines;
};

const Search = async ({ searchParams }: { searchParams: SearchParamType }) => {
  const restaurants = await fetchRestaurant(searchParams);
  const locations = await fetchLocation();
  const cuisines = await fetchCuisines();
  return (
    <>
      <Header />
      <div className="py-4 w-fit xsm:w-full flex sm:flex-col mx-auto">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-[26rem] xsm:w-[96%] xsm:mx-auto">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
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
