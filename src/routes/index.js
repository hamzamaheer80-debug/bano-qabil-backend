import { Router } from "express";


import {
  validate,
  id,
  listingRules,
  makeListingRules,
  pageRules,
  body,
} from "../validators/index.js";
import { respond } from "../controllers/http.js";


import { authRoutes } from "./auth/index.js";

export function routes(dependencies) {
const router = Router();
router.use("/auth", authRoutes(dependencies));
return router;
}
const pickAd = (body) =>
  Object.fromEntries(
    ["title", "description", "price", "city", "category", "condition"]
      .filter((key) => body[key] !== undefined)
      .map((key) => [key, body[key]]),
  );