import { AuthInputType } from "./AuthModal";

interface Props {
  inputs: AuthInputType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
}

const AuthModalInputs = ({ inputs, handleChange, isSignin }: Props) => {
  return (
    <div>
      <div>
        {isSignin ? null : (
          <div className="my-2 flex justify-between text-sm">
            <input
              type="text"
              className="border rounded p-2 py-3 w-[49%]"
              placeholder="First Name"
              name="firstName"
              onChange={(e) => {
                handleChange(e);
              }}
              value={inputs.firstName}
            />

            <input
              type="text"
              className="border rounded p-2 py-3 w-[49%]"
              placeholder="Last Name"
              name="lastName"
              onChange={(e) => {
                handleChange(e);
              }}
              value={inputs.lastName}
            />
          </div>
        )}
        <div className="my-2 flex justify-between text-sm">
          <input
            type="email"
            className="border rounded p-2 py-3 w-full"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
            value={inputs.email}
          />
        </div>
        {isSignin ? null : (
          <div className="my-2 flex justify-between text-sm">
            <input
              type="text"
              className="border rounded p-2 py-3 w-[49%]"
              placeholder="Phone"
              name="phone"
              onChange={(e) => {
                handleChange(e);
              }}
              value={inputs.phone}
            />

            <input
              type="text"
              className="border rounded p-2 py-3 w-[49%]"
              placeholder="City"
              name="city"
              onChange={(e) => {
                handleChange(e);
              }}
              value={inputs.city}
            />
          </div>
        )}

        <div className="my-2 flex justify-between text-sm">
          <input
            type="Password"
            className="border rounded p-2 py-3 w-full"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
            value={inputs.password}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthModalInputs;
