const AuthModalInputs = () => {
  return (
    <div>
      <div>
        <div className="my-2 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First Name"
          />

          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last Name"
          />
        </div>
        <div className="my-2 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-full"
            placeholder="Email"
          />
        </div>
        <div className="my-2 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Phone"
          />

          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="City"
          />
        </div>

        <div className="my-2 flex justify-between text-sm">
          <input
            type="Password"
            className="border rounded p-2 py-3 w-full"
            placeholder="Password"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthModalInputs;
