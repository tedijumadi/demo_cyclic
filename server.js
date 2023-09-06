



const axios = require('axios'); // using Axios library
const crypto = require('crypto');
const express = require('express');
const app = express();


// Create tripay test
app.post("/tripay-test", async (req, res) => {
    var apiKey = "DEV-0YYXsD6DlWN3gJbKYmeUV5iA2xicxxx13H1qlAmg";
    var privateKey = "QWkHj-QQvCX-ZAUfI-ekwck-KGb64";
  
    var merchant_code = "T25287"; //Dapet dari page Merchant>Detail
    var merchant_ref = req.body.merchant_ref; //Dapet dari kode inputan kayaknya
    var amount = req.body.amount;
  
    var expiry = parseInt(Math.floor(new Date() / 1000) + 24 * 60 * 60); //24 jam
  
    var signature = crypto
      .createHmac("sha256", privateKey)
      .update(merchant_code + merchant_ref + amount)
      .digest("hex");
  
    var payload = {
      method: req.body.method,
      merchant_ref: merchant_ref,
      amount: amount,
      customer_name: req.body.customer_name,
      customer_email: req.body.customer_email,
      customer_phone: req.body.customer_phone,
      order_items: req.body.order_items,
      return_url: req.body.return_url,
      expired_time: expiry,
      signature: signature,
    };
  
    axios
      .post("https://tripay.co.id/api-sandbox/transaction/create", payload, {
        headers: { Authorization: "Bearer " + apiKey },
        validateStatus: function (status) {
          return status < 999; // ignore http error
        },
      })
      .then((callback) => {
        res.status(200).json({
          message: "sukses",
          callbackUrl: callback.data.data.checkout_url,
        });
      })
      .catch((error) => {
        res.status(200).json({
          message: "error",
        });
      });
  });

  app.get('/get', (req, res) => {
    res.send('Hellow World!');
});



  const HTTP_PORT = process.env.PORT || 8080;
app.listen(HTTP_PORT, () =>{
    console.log(`Server is listening at port ${HTTP_PORT}`);
});
