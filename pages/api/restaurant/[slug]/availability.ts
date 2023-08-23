import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import findAvailableTables from "../../../../services/restaurant/findAvailableTables";

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

  const searchTimesWithTables = await findAvailableTables({
    time,
    day,
    restaurant,
    res,
  });

  if (!searchTimesWithTables) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

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
