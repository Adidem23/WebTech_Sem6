const express = require('express');
const app = express();
const PORT = 9000;
const CORS = require('cors');

app.use(express.json());
app.use(CORS({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.get('/', (req, res) => {
    res.send("Hello to Our Electricity Generator!!!");
})

function generatebill(units) {

    if (units <= 50) {
        return units * 3.50;
    }

    else if (units <= 150) {
        return (50 * 3.5) + (units - 50) * 4;
    }

    else if (units <= 250) {
        return (50 * 3.5) + (100 * 4) + (units - 250) * 5.2;
    }

    else if (units > 250) {
        return (50 * 3.5) + (100 * 4) + (100 * 5.2) + (units - 250) * 6.5;
    }

    return 0;

}

app.post("/GenBill", async (req, res) => {
    const UnitsUsed = req.body.UnitsUsed;
    const FinalBill= generatebill(UnitsUsed);
    res.send(`${FinalBill}`);
});

app.listen(PORT, () => {
    console.log(`App is Running on : ${PORT}`);
})