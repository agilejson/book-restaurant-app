const Description = ({ description }: { description: string }) => {
  return (
    <>
      {" "}
      <div className="mt-4 border-b">
        <p className="text-lg font-light">{description}</p>
      </div>
    </>
  );
};

export default Description;
