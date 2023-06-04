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
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={mainImage} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{restaurantName}</h1>
          <div className="flex mt-3">
            <p className="mr-6">
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
