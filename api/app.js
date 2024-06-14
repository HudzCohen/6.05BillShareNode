const express = require('express');
const participantsRoutes = require('./routes/participants');
const billsRoutes = require('./routes/bills');
const camelCaseObjectDeep = require('camelcase-object-deep');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/participants', participantsRoutes);
app.use('/api/bills', billsRoutes);

app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
        originalJson.call(this, camelCaseObjectDeep(data));
    };
    next();
});

app.listen(4000, () => console.log('server started'));