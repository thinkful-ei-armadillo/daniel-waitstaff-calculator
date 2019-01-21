/* eslint-disable no-console */
/* global $ */
'use strict';

// Building a waitstaff calculator so waitstaff can do 3 things:
// --Add meal items and individual costs
// --Calculate total charges for customer (subtotal) plus tip %
// --Display total earnings for the restaurant based on night's meals

// Data store for all details

const STORE = {
  price: [],
  tax: [],
  tip: [],
  earnings: [],
  mealCounter: [ 0 ],
  tipTotal: []
};

// Resetting data store for RESET button functionality

function resetAll() {
  $('.js-reset-button').on( 'click', function (event) {
    event.preventDefault();
    STORE.price = [];
    STORE.tax = [];
    STORE.tip = [];
    STORE.earnings = [];
    STORE.mealCounter = [ 0 ];
    STORE.tipTotal = [];
    $('.js-meal-entry-form')[0].reset();
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

function handlePrice() {
  $('.js-price').on('keypress', function() {
    parseFloat($(this).val()).toFixed(2);
    STORE.price[0] = $(this).val();
    console.log(`Meal price is $${STORE.price[0]}`);
  });
}

// handling tax

function handleTax() {
  $('.js-tax').on('keypress', function() {
    parseFloat($(this).val()).toFixed(2);
    STORE.tax[0] = $(this).val();
    const taxInDollars = (( STORE.tax[0] * 0.01 ) * ( STORE.price[0] ));
    console.log(taxInDollars);
    STORE.tax[0] = taxInDollars;
    console.log(`Meal tax is $${STORE.tax[0]}`);
  });
}

// putting together tip percentage

function handleTip() {
  $('.js-tip').on('keypress', function() {
    parseFloat($(this).val()).toFixed(2);
    STORE.tip[0] = $(this).val();
    const tipInDollars = (( STORE.tip[0] * 0.01 ) * ( STORE.price[0] ));
    console.log(tipInDollars);
    STORE.tip[0] = tipInDollars;
    console.log(`Meal tip is $${STORE.tip[0]}`);
    STORE.tipTotal.push(STORE.tip[0]);
  });
}

// Calculating meal totals

function mealCalculator() {
  $('.js-meal-entry-form').on( 'submit', function (event) {
    event.preventDefault();
    const mealTotal = ( STORE.price[0] + STORE.tax[0] + STORE.tip[0] );
    console.log(`Meal total is $${mealTotal}`);
    STORE.earnings = mealTotal;
    STORE.mealCounter++;
    console.log(STORE.mealCounter);
  });
}

// rendering customer charges - meal subtotal, tip, and total amounts into HTML

function customerCharges() {
  const subTotal = STORE.price[0] + STORE.tax[0];
  const tipForPrint = STORE.tip[0];
  const totalCustomerCharge = subTotal + tipForPrint;
  $('.customer-charges-subtotal').html(`Subtotal: ${subTotal}`);
  $('.customer-charges-tip').html(`Tip: ${tipForPrint}`);
  $('.customer-charges-total').html(`Total: ${totalCustomerCharge}`);
}

// rendering earnings info - tip totals, meal count, average tip per meal into HTML

function earningsInfo() {
  const tipTotal = function calculateTipTotal() {
    const reducer = ( sum, curr ) => sum + curr;
    STORE.tipTotal[0] = STORE.tipTotal.reduce( reducer );
  };
  $('.earnings-info-tip-total').html(`Tip Total: ${STORE.tipTotal[0]}`);
  $('.earnings-meal-count').html(`Meal Count: ${STORE.mealCounter}`);
  const averageTip = ( tipTotal / STORE.mealCounter );
  $('.earnings-average-tip').html(`Average Tip: ${averageTip}`);
}

// calling necessary task functions so calculator can run

function main() {
  cancelButton();
  handlePrice();
  handleTax();
  handleTip();
  mealCalculator();
  customerCharges();
  earningsInfo();
  resetAll();
}

$(main);