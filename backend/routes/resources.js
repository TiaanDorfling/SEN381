import { Router } from "express";
const router = Router();
router.get("/", (_req, res) => res.json({ ok: true, route: "resources", items: [] }));
export default router;
