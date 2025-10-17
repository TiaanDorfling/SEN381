import { Router } from "express";
const router = Router();
router.get("/", (_req, res) => res.json({ ok: true, route: "messages", items: [] }));
export default router;
