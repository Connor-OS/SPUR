import * as index from "./index.controller"
import * as payment from "./payment.controller"
import * as paymentReturn from "./payment.return.controller"
import * as paymentSession from "./payment.session.controller"
import * as school from "./school.controller"
import * as details from "./your.details.controller"
import * as search from "./search.controller"
import * as answers from "./check.your.answers.controller"

import { Router } from "express"
import {mandatoryFields} from "../middleware/manditory.fields.middleware";
import {searchFields} from "../middleware/search.data.middleware";

const router = Router();

router.get('/', index.get);
router.post('/', index.post);

router.get('/search', searchFields, search.get);

router.get('/school', school.get);
router.post('/school', school.post);

router.get('/your-details', details.get);
router.post('/your-details', mandatoryFields, details.post);

router.get('/check-your-answers', answers.get);

router.get('/payment', payment.get);

router.get('/session-status', paymentSession.getStatus)
router.post('/create-checkout-session', paymentSession.post)

router.get('/return', paymentReturn.get)


export default router;
