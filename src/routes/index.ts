import express from '@feathersjs/express';

const router = express.Router();

// Add routes here
router.use('/', express.static('public'));

export default router;
