const router = require('express').Router();
const db = require('../db');

router.post('/add', async (req, res) => {
    await db.addParticipant(req.body);
    res.json({status: 'OK'});
});

router.get('/get', async (req, res) => {
    res.json(await db.getParticipants());
});

module.exports = router;