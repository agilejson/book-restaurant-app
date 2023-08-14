import Link from "next/link";

const RestaurantNavBar = ({ slug }: { slug: string }) => {
  return (
    <div className="flex text-reg border-b pb-2">
      <Link href={`/restaurant/${slug}`} className="mr-7">
        Overview
      </Link>
      <Link href={`/restaurant/${slug}/menu`}>Menu</Link>
    </div>
  );
};

export default RestaurantNavBar;
