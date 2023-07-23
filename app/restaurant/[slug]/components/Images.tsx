const Images = ({ images }: { images: string[] }) => {
  return (
    <div>
      <h1 className="font-bold text-2xl mt-10 mb-7 sm:text-center">
        {`${images.length} photo${images.length > 1 ? "s" : ""}`}
      </h1>
      <div className="flex flex-wrap sm:justify-center">
        {images.map((image, index) => (
          <img
            className="w-56 h-44 sm:w-40 sm:h-auto mr-1 mb-1"
            src={image}
            alt=""
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
