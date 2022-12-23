"use strict";

// Variables
let myHeaders = new Headers();
myHeaders.append("apikey", "IF6mbQgEgqq7MUMKAZU2QeI5KXIVyhbI");
const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};
const API_KEY = "IF6mbQgEgqq7MUMKAZU2QeI5KXIVyhbI";
const authAPI = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;
const symbolsURL = `https://api.exchangeratesapi.io/v1/symbols?access_key=${API_KEY}`;
let symbolsData;

// DOM Elements
const symbolsList = document.querySelector(".symbols-list");
const submitConvBtn = document.querySelector(".submit-conversion");
const fromCur = document.querySelector("#from-cur");
const toCur = document.querySelector("#to-cur");
const amountToConvert = document.querySelector("#amount-to-convert");
const conversionOutput = document.querySelector(".conversion-output");

// Event Listeners
document.addEventListener("DOMContentLoaded", requestSymbols);
submitConvBtn.addEventListener("click", doConversion);

function requestSymbols() {
  fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      symbolsData = data;
      generateSymbolsList();
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function generateSymbolsList() {
  const symbols = symbolsData.symbols;
  const symbolKeys = Object.keys(symbols);
  let html = ``;
  symbolKeys.forEach(
    (key) =>
      (html += `<li class="symbol-list-item">${key}: ${symbols[key]}</li>`)
  );
  symbolsList.insertAdjacentHTML("afterbegin", html);
}

function doConversion() {
  const from = fromCur.value.toUpperCase();
  const to = toCur.value.toUpperCase();
  const amount = amountToConvert.value;
  if (!(from in symbolsData.symbols) || !(to in symbolsData.symbols)) {
    alert("Enter real currencies!!");
    return;
  }
  if (amount === "") {
    alert("Enter the amount!!");
  }
  fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
    requestOptions
  )
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      conversionOutput.textContent = `${amount} ${from} is equal to ${data.result} ${to}`;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
