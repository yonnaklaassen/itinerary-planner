
import { CreateTripRequest } from "@shared/model/request-bodies";
import { Pool } from "pg";
import { Trip } from "src/models/trip.js";

export async function createTrip(pool: Pool, userId: string, trip: CreateTripRequest): Promise<Trip> {

  const result = await pool.query(
    "INSERT INTO trips (owner_id, trip_name trip_destination, trip_start_date, trip_end_date) VALUES ($1, $2, $3, $4, $5)",
    [userId, trip.tripName, trip.destination, trip.startingDate, trip.startingDate, trip.endingDate]
  );
  return result.rows[0] as Trip;
}