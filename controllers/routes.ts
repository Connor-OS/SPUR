import * as index from "./index.controller"
import * as search from "./search.controller"
import * as school from "./school.controller"
import * as payment from "./payment.controller"

import { Router } from "express";

const router = Router();

router.get('/', index.get);
router.post('/', index.post);

// router.get('/search', search.get);
router.get('/search', search.get);

router.get('/school', school.get);
router.post('/school', school.post);

router.get('/payment', payment.get);
router.post('/payment', payment.post);

export default router;
