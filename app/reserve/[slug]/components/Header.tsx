import {
  convertToDisplayTime,
  Time,
} from "../../../../utils/convertToDisplayTime";
import { format } from "date-fns";

const Header = ({
  restaurantName,
  mainImage,
  bookingDate,
  partySize,
}: {
  restaurantName: string;
  mainImage: string;
  bookingDate: string;
  partySize: string;
}) => {
  const [day, time] = bookingDate.split("T");
  console.log(day, time);
  return (
    <div className="">
      <h4 className="xsm:text-center">You're almost done!</h4>
      <div className="mt-5 flex sm:flex-col ">
        <img
          src={mainImage}
          alt=""
          className="w-32 h-auto rounded xsm:w-[80%] xsm:mx-auto "
        />
        <div className="ml-4 sm:ml-0">
          <h1 className="text-4xl xsm:mt-2 xsm:text-center">
            {restaurantName}
          </h1>
          <div className="flex mt-3 xsm:w-fit xsm:mx-auto">
            <p className="mr-6 ">
              {format(new Date(bookingDate), "ccc, LLL d")}
            </p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">
              {partySize} {parseInt(partySize) === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
