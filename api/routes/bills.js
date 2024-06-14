const router = require('express').Router();
const db = require('../db');

 router.post('/add', async (req, res) => {
    await db.addBill(req.body);
    res.json({status: 'OK'});
 });


 router.get('/get', async (req, res) => {
   res.json(await db.getBills());
 });

 router.get('/getdetails', async (req, res) => {
  res.json(await db.getBillDetails(req.Id));
 });

module.exports = router;
