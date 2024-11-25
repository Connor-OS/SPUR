import * as index from "./index.controller"
import * as search from "./search.controller"
import * as school from "./school.controller"

import { Router } from "express";

const router = Router();

router.get('/', index.get);
router.post('/', index.post);

// router.get('/search', search.get);
router.post('/search', search.post);

router.get('/school', school.get);
router.post('/school', school.post);

export default router;
