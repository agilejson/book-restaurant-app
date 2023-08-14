const Description = ({ description }: { description: string }) => {
  return (
    <>
      {" "}
      <div className="mt-2 border-b pb-2">
        <p className="text-lg font-light">{description}</p>
      </div>
    </>
  );
};

export default Description;
