import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import findAvailableTables from "../../../../services/restaurant/findAvailableTables";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();

    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    const {
      bookerEmail,
      bookerPhone,
      bookerFirstName,
      bookerLastName,
      bookerOccasion,
      bookerRequest,
    } = req.body;

    // validation: if restaurant exits and restaurant is open in the give time
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
        id: true,
      },
    });

    if (!restaurant) {
      return res.status(400).json({
        errorMessage: "Restaurant not found!",
      });
    }

    if (
      new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {
      return res.status(400).json({
        errorMessage: "Restaurant is not open at this time!",
      });
    }

    const searchTimesWithTables = await findAvailableTables({
      day,
      time,
      res,
      restaurant,
    });

    if (!searchTimesWithTables) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    // out of all the tables in the time intervals choose the one with specific time
    const searchTimeWithTables = searchTimesWithTables.find((t) => {
      return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
    });

    if (!searchTimeWithTables) {
      return res.status(400).json({
        errorMessage: "No availability, cannot book",
      });
    }

    // make an object which has property as number of seats and array which contains id for that number of seats
    const tablesCount: { 2: number[]; 4: number[]; [key: number]: any } = {
      2: [],
      4: [],
    };

    searchTimeWithTables.tables.forEach((t) => tablesCount[t.seats].push(t.id));

    // assign table for a specific partySize
    const tableToBooks: number[] = [];
    let seatsRemaining = parseInt(partySize);

    while (seatsRemaining > 0) {
      // if the seat remaining is more than 3 then we would get the table with 4 seats
      if (seatsRemaining >= 3) {
        // if table with 4 seats exits the take those first
        if (tablesCount[4].length) {
          tableToBooks.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
          // if table with 4 doesn't exits then take the one with 2 seats
        } else {
          tableToBooks.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
        }
        // if required sets is less than 3
      } else {
        // try to get table with 2 seats first
        if (tablesCount[2].length) {
          tableToBooks.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
          // if tables with 2 seats doesn't exits then take the one with 4 seats
        } else {
          tableToBooks.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
        }
      }
    }

    // create booking
    const booking = await prisma.booking.create({
      data: {
        number_of_people: parseInt(partySize),
        booking_time: new Date(`${day}T${time}`),
        booker_email: bookerEmail,
        booker_phone: bookerPhone,
        booker_first_name: bookerFirstName,
        booker_last_name: bookerLastName,
        booker_occasion: bookerOccasion,
        booker_request: bookerRequest,
        restaurant_id: restaurant.id,
      },
    });

    const bookingOnTablesData = tableToBooks.map((table_id) => ({
      table_id,
      booking_id: booking.id,
    }));

    // link booking to the tables
    await prisma.bookingsOnTables.createMany({
      data: bookingOnTablesData,
    });

    return res.json(booking);
  }
}
