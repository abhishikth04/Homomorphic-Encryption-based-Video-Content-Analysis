import express from "express";
import Analysis from "../models/Analysis.js";

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const total = await Analysis.countDocuments();
    const unique = await Analysis.countDocuments({ status: "unique" });
    const duplicate = await Analysis.countDocuments({ status: "duplicate" });

    const avgScore = await Analysis.aggregate([
      { $match: { score: { $ne: null } } },
      { $group: { _id: null, avg: { $avg: "$score" } } }
    ]);

    res.json({
      total,
      unique,
      duplicate,
      avgScore: avgScore[0]?.avg || 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Dashboard summary error" });
  }
});

router.get("/recent", async (req, res) => {
  try {
    const recent = await Analysis.find()
      .sort({ createdAt: -1 })
      .limit(6);

    res.json(recent);
  } catch (err) {
    res.status(500).json({ error: "Recent analysis error" });
  }
});

export default router;
