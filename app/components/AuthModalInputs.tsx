import { AuthInputType } from "./AuthModal";

interface Props {
  inputs: AuthInputType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
  loading: boolean;
}

const AuthModalInputs = ({
  inputs,
  handleChange,
  isSignin,
  loading,
}: Props) => {
  return (
    <div>
      <div>
        {isSignin ? null : (
          <div className="my-2 flex justify-between">
            <input
              type="text"
              className="border p-2 py-3 disabled:bg-gray-100 w-[49%]"
              placeholder="First Name"
              name="firstName"
              onChange={(e) => {
                handleChange(e);
              }}
              value={inputs.firstName}
              disabled={loading}
            />

            <input
              type="text"
              className="border rounded p-2 py-3 disabled:bg-gray-100 w-[49%]"
              placeholder="Last Name"
              name="lastName"
              onChange={(e) => {
                handleChange(e);
              }}
              value={inputs.lastName}
              disabled={loading}
            />
          </div>
        )}
        <div className="my-2 flex justify-between">
          <input
            type="email"
            className="border rounded p-2 py-3 disabled:bg-gray-100 w-full"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
            value={inputs.email}
            disabled={loading}
          />
        </div>
        {isSignin ? null : (
          <div className="my-2 flex justify-between">
            <input
              type="text"
              className="border rounded p-2 py-3 disabled:bg-gray-100 w-[49%]"
              placeholder="Phone"
              name="phone"
              onChange={(e) => {
                handleChange(e);
              }}
              value={inputs.phone}
              disabled={loading}
            />

            <input
              type="text"
              className="border rounded p-2 py-3 disabled:bg-gray-100 w-[49%]"
              placeholder="City"
              name="city"
              onChange={(e) => {
                handleChange(e);
              }}
              value={inputs.city}
              disabled={loading}
            />
          </div>
        )}

        <div className="my-2 flex justify-between">
          <input
            type="Password"
            className="border rounded p-2 py-3 disabled:bg-gray-100 w-full"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
            value={inputs.password}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthModalInputs;
