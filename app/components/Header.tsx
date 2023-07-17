import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <>
      <div
        className="h-64 bg-cover"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/theprakashkumar/image/upload/v1689581800/Tavolo/dinner-is-served_imhgrg.jpg)",
        }}
      >
        <div className="p-2 sm:p-0.5 h-full bg-opacity-30 backdrop-filter backdrop-blur-sm">
          <div className="text-center mt-10">
            <h1 className="text-5xl md:text-4xl xsm:text-3xl text-white font-bold mb-2">
              Find your table for any occasion
            </h1>
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
