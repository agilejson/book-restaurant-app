const Header = ({ name, mainImage }: { name: string; mainImage: string }) => {
  const renderTitle = () => {
    const nameArray = name.split("-");
    nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`;
    return nameArray.join(" ");
  };
  return (
    <div
      className="h-72 bg-cover"
      style={{ backgroundImage: `url(${mainImage})` }}
    >
      <div className="h-full flex justify-center items-center bg-opacity-30 backdrop-filter backdrop-blur-sm">
        <h1 className="text-6xl font-bold text-white capitalize text-shadow text-center md:text-5xl">
          {renderTitle()}
        </h1>
      </div>
    </div>
  );
};

export default Header;
