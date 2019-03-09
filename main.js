/* eslint-disable no-console */
/* global $ */
'use strict';

// Building a waitstaff calculator so waitstaff can do 3 things:
// --Add meal items and individual costs
// --Calculate total charges for customer (subtotal) plus tip %
// --Display total earnings for the restaurant based on night's meals

// Data store for all details

const STORE = {
  price: 0,
  tax: 0,
  tip: 0,
  earnings: 0,
  mealCounter: 0,
  tipTotal: []
};

// Resetting data store for RESET button functionality

function resetAll() {
  $('.js-reset-button').on( 'click', function (event) {
    event.preventDefault();
    
    STORE.price = 0;
    STORE.tax = 0;
    STORE.tip = 0;
    STORE.earnings = 0;
    STORE.mealCounter = 0;
    STORE.tipTotal = [];
    
    $('.js-meal-entry-form')[0].reset();

    $('.customer-charges-subtotal').html('');
    $('.customer-charges-tip').html('');
    $('.customer-charges-total').html('Enter a meal to see your charges.');

    $('.earnings-info-tip-total').html('');
    $('.earnings-meal-count').html('');
    $('.earnings-average-tip').html('Enter a meal to see your total earnings.');

  });
}

// handle meal entry form 'cancel' button

function cancelButton() {
  $('.js-meal-entry-cancel').on( 'click', function (event) {
    event.preventDefault();
    $('.js-meal-entry-form')[0].reset();
  });
}

// handling price

function handlePrice(price) {
  STORE.price = price;
  console.log(`Meal price is $${STORE.price}`);
}

// handling tax

function handleTax(tax) {
  STORE.tax = tax;

  const taxInDollars = (( STORE.tax * 0.01 ) * ( STORE.price ));
  
  STORE.tax = taxInDollars;

  console.log(`Meal tax is $${STORE.tax}`);
}

// putting together tip percentage

function handleTip(tip) {
  const tipInDollars = (( tip * 0.01 ) * ( STORE.price ));
  STORE.tip = tipInDollars;
  console.log(`Meal tip is $${STORE.tip}`);
  STORE.tipTotal.push(STORE.tip);
}

// Calculating meal totals

function mealCalculator() {
  $('.js-meal-entry-form').on( 'submit', function (event) {
    event.preventDefault();

    const price = parseFloat($('.js-price').val()).toFixed(2);
    handlePrice(price);
    const tax = parseFloat($('.js-tax').val()).toFixed(2);
    handleTax(tax);
    const tip = parseFloat($('.js-tip').val()).toFixed(2);
    handleTip(tip);

    const mealTotal = ( STORE.price + STORE.tax + STORE.tip );
    parseFloat(mealTotal).toFixed(2);
    console.log(`Meal total is $${mealTotal}`);

    STORE.earnings += mealTotal;
    STORE.mealCounter++;
    console.log(`We have served ${STORE.mealCounter} meals.`);

    earningsInfo();
    customerCharges();
  });
}

// rendering customer charges - meal subtotal, tip, and total amounts into HTML

function customerCharges() {
  const subTotal = STORE.price + STORE.tax;
  const tipForPrint = STORE.tip;
  const totalCustomerCharge = subTotal + tipForPrint;
  // console.log(STORE);
  $('.customer-charges-subtotal').html(`Subtotal: $${parseFloat(subTotal).toFixed(2)}`);
  $('.customer-charges-tip').html(`Tip: $${parseFloat(tipForPrint).toFixed(2)}`);
  $('.customer-charges-total').html(`Total: $${parseFloat(totalCustomerCharge).toFixed(2)}`);
}

// rendering earnings info - tip totals, meal count, average tip per meal into HTML

function earningsInfo() {
  let tipSum = 0;
  for (let i = 0; i < STORE.tipTotal.length; i++) {
    tipSum += STORE.tipTotal[i];
  }
  let tipAvg = 0;
  tipAvg = tipSum / STORE.mealCounter;
  $('.earnings-info-tip-total').html(`Tip Total: $${parseFloat(tipSum).toFixed(2)}`);
  $('.earnings-meal-count').html(`Meal Count: ${STORE.mealCounter}`);
  $('.earnings-average-tip').html(`Average Tip: $${parseFloat(tipAvg).toFixed(2)}`);
}

// calling necessary task functions so calculator can run

function main() {
  cancelButton();
  mealCalculator();
  resetAll();
}

$(main);