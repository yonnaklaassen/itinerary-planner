import { CreateTripRequest } from "@shared/model/request-bodies.js";
import { Router } from "express";
import { Pool } from "pg";
import { createTrip } from "src/services/trip-service.js";

export default function tripRoutes(db: Pool) {
    const router = Router();

    router.post("/create", async (req, res) => {
        const tripRequest = req.body as CreateTripRequest;
        const userId = req.cookies["user_id"];

        try {
            const trip = await createTrip(db, userId, tripRequest);
            res.status(201).json(trip);
        }
        catch (err: any) {
            console.error("Error creating trip:", err);
            res.status(400).json({ error: err.message });
        }

    });

    return router;
}