import Header from "./components/Header";

const RestaurantLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default RestaurantLayout;
