"use client";
import { useRef, useState } from "react";
import { partySize, times, TimeType } from "../../../../data";
import DatePicker from "react-datepicker";
import useAvailabilities from "../../../../hooks/useAvailabilities";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import {
  Time,
  convertToDisplayTime,
} from "../../../../utils/convertToDisplayTime";

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [requiredPartySize, setRequiredPartySize] = useState<number>(1);
  const [requiredTime, setRequiredTime] = useState<string>(openTime);
  const requiredDate = useRef<string>(new Date().toISOString().split("T")[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      requiredDate.current = date.toISOString().split("T")[0];
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const filterTimeByRestaurantOpenWindow = (): TimeType[] => {
    const timesWithinWindow: TimeType[] = [];

    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }

      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }

      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });
    return timesWithinWindow;
  };

  return (
    <div className="bg-white p-3 md:p-2 sm:p-0">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="text-lg text-center">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          onChange={(e: any) => setRequiredPartySize(e.target.value)}
          value={requiredPartySize}
        >
          {partySize.map((size) => (
            <option value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-20"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            value={requiredTime}
            onChange={(e) => setRequiredTime(e.target.value)}
          >
            {filterTimeByRestaurantOpenWindow().map((time) => (
              <option value={time.time}>{time.displayTime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-500 hover:bg-red-600 transition-all rounded w-full px-4 text-white font-bold h-16"
          onClick={() => {
            fetchAvailabilities({
              slug,
              partySize: requiredPartySize,
              time: requiredTime,
              day: requiredDate.current,
            });
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
        </button>
      </div>
      {data && Date.length ? (
        <div className="mt-4">
          <p className="text-reg">Select Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${requiredDate.current}T${time.time}&partySize=${requiredPartySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </Link>
              ) : (
                <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3">x</p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationCard;
