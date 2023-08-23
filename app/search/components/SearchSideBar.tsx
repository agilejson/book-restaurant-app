import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

interface SearchSideBarProps {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: {
    city?: string;
    cuisine?: string;
    price?: PRICE;
  };
}
const SearchSideBar = ({
  locations,
  cuisines,
  searchParams,
}: SearchSideBarProps) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "border w-full text-reg text-center font-light p-1.5",
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className:
        "border-r border-t border-b w-full text-reg text-center font-light p-1.5",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className:
        "border-r border-t border-b w-full text-center text-reg font-light p-1.5",
    },
  ];
  return (
    <div className="sticky top-16 w-36 mr-3 bg-white p-4 h-fit sm:static  sm:w-[26rem] sm:flex sm:mr-0 sm:mb-3 xsm:w-[96%] xsm:mx-auto ">
      <div className="pb-3 flex flex-col">
        <h1 className="mb-1.5 font-bold text-red-500 ">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: location.name,
              },
            }}
            className={`font-light text-reg capitalize ${
              searchParams.city === location.name && "text-red-500"
            }`}
            key={location.id}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="pb-3 mt-1 flex flex-col sm:mx-auto ">
        <h1 className="mb-1.5 font-bold text-red-500">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            className={`font-light text-reg capitalize ${
              searchParams.cuisine === cuisine.name && "text-red-500"
            }`}
            key={cuisine.id}
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-1 pb-3">
        <h1 className="mb-1.5 font-bold text-red-500">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, className }) => (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className={`${className} ${
                searchParams.price === price && "text-red-500"
              }`}
              key={price}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
