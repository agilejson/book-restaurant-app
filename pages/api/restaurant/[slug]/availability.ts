import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { BookingsOnTables, PrismaClient } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();

  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };
  // if any of the required parameter is missing then return error message
  if (!day || !time || !partySize) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  // it will return a list of time on interval of 30 minutes
  const searchTimes: string[] | undefined = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  // get all the booking between the given time interval
  const bookings:
    | {
        number_of_people: number;
        booking_time: Date;
        tables: BookingsOnTables[];
      }[]
    | [] = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTableObj: { [key: string]: { [key: number]: true } } = {};

  // format booking something like this: {date: {[table_id]: true}}
  bookings.forEach((booking) => {
    bookingTableObj[booking.booking_time.toISOString()] = booking.tables.reduce(
      (obj, table) => ({
        ...obj,
        [table.table_id]: true,
      }),
      {}
    );
  });

  // get all the tables of specific restaurant
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  const tables = restaurant.tables;

  // reformatting the search time
  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  // filter out table which is booked
  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTableObj[t.date.toISOString()]) {
        if (bookingTableObj[t.date.toISOString()][table.id]) return false;
      }
      return true;
    });
  });

  // determining the availability based on opening time and closing time
  const availabilities = searchTimesWithTables
    .map((t) => {
      const sumSeats = t.tables.reduce(
        (totalSeat, table) => (totalSeat = totalSeat + table.seats),
        0
      );
      return {
        time: t.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`);
      const timeIsBeforeClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`);

      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });

  return res.json({
    availabilities,
  });
}

export default handler;
