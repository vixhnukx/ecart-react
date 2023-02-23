// sk_test_51MbrmYSAroG87VgbKYWaioQdSvAB5gH7w9hWq7NBeANr63sFlWpHTQMyhGeN1PCcJ7ywQawXGhkVKr2BczN4P4T400xjg8uWEI
// coffee:price_1Mbs4sSAroG87VgbSoz1ERQJ
// sunglass:price_1Mbs7eSAroG87VgbTq2igm7M
// camera:price_1Mbs9HSAroG87VgbMIhDFhmS

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51MbrmYSAroG87VgbKYWaioQdSvAB5gH7w9hWq7NBeANr63sFlWpHTQMyhGeN1PCcJ7ywQawXGhkVKr2BczN4P4T400xjg8uWEI');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {

    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log("Listening on port 4000!"));