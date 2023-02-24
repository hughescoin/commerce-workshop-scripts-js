const crypto = require('crypto');
const timestamp = Date.now() / 1000; // in ms
const passphrase = process.env.CB_ACCESS_PASSPHRASE;
const accessKey = process.env.CB_ACCESS_KEY;
const secret = process.env.CB_SECRET;
const profileID = process.env.EXCHANGE_PROFILE_ID;
const baseURL = process.env.BASE_URL;

const requestPath = '/withdrawals/crypto/';
const method = 'POST';
const url = baseURL + requestPath;

const userCurrency = 'USDC';
const userWithdrawlAddress = '0xb6d00d83158fee6695c72ff9c5e915478a479224';
const userWithdrawalAmount = 5;

const data = JSON.stringify({
  profile_id: profileID,
  amount: userWithdrawalAmount, //units of currency to be withdrawn ex: "3",
  crypto_address: userWithdrawlAddress, //example: "",
  currency: userCurrency, // exampple: "USDC",
});

const message = timestamp + method + requestPath + data;
const key = Buffer.from(secret, 'base64');
const hmac = crypto.createHmac('sha256', key);
const signature = hmac.update(message).digest('base64');

async function withdrawToCryptoAddress() {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CB-ACCESS-KEY': accessKey,
        'CB-ACCESS-SIGN': signature,
        'CB-ACCESS-TIMESTAMP': timestamp,
        'CB-ACCESS-PASSPHRASE': passphrase,
      },
      body: data,
    });
    const conf = await response.json();
    console.log(conf);
  } catch (error) {
    console.log(error);
  }
}

withdrawToCryptoAddress();