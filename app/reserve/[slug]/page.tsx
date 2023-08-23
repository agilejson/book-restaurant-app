import Header from "./components/Header";
import Form from "./components/Form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const fetchRestaurantBySlug = async (slug: string) => {
  const prisma = new PrismaClient();
  const restaurant: {
    name: string;
    main_image: string;
  } | null = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      main_image: true,
    },
  });

  if (!restaurant) notFound();

  return restaurant;
};

const Reserve = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <div className="border-t h-screen md:px-3 lg:h-screen sm:w-[80%] sm:mx-auto xs:px-1 xsm:w-[100%]">
      <div className="py-9 w-fit mx-auto flex flex-col">
        <Header
          restaurantName={restaurant?.name}
          mainImage={restaurant?.main_image}
          bookingDate={searchParams.date}
          partySize={searchParams.partySize}
        />
        <Form
          slug={params.slug}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
      </div>
    </div>
  );
};

export default Reserve;
