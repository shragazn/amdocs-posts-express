import { Router } from "express";

const router = Router();

router.get("/influencers", (req, res) => {
  const { client } = req.query;
});

export default router;
