/**
 * Copyright 2023-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fetch from 'node-fetch';
const baseURL = process.env.COMMERCE_BASE_URL;
const chargeCode = process.env.CHARGE_CODE;
const url = `${baseURL}/charges/${chargeCode}`;

async function viewTimeline() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      url: url,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CC-API-KEY': process.env.COMMERCE_API_KEY,
        'X-CC-Version': process.env.COMMERCE_API_VERSION,
      },
    });
    const data = await response.json();
    return console.log(data.data.timeline);
  } catch (error) {
    console.log(error);
  }
}

viewTimeline();
