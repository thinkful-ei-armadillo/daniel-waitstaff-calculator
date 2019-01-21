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
  STORE.price = [];
  STORE.tax = [];
  STORE.tip = [];
  STORE.earnings = [];
  STORE.mealCounter = [ 0 ];
  STORE.tipTotal = [];
}

// handling price

function handlePrice() {
  $('.js-price').on('input', function() {
    STORE.price[0] = $(this).val();
    console.log(`Meal price is $${STORE.price[0]}`);
  });
}

// handling tax

function handleTax() {
  $('.js-tax').on('input', function() {
    STORE.tax[0] = $(this).val();
    const taxInDollars = (( STORE.tax[0] * 0.1 ) * ( STORE.price[0] ));
    STORE.tax[0].push(taxInDollars);
    console.log(`Meal tax is $${STORE.tax[0]}`);
  });
}

// putting together tip percentage

function handleTip() {
  $('.js-tip').on('input', function() {
    STORE.tip[0] = $(this).val();
    const tipInDollars = (( STORE.tip[0] * 0.1 ) * ( STORE.price[0] ));
    STORE.tip[0].push(tipInDollars);
    console.log(`Meal tip is $${STORE.tip[0]}`);
    STORE.tipTotal.push(STORE.tip[0]);
  });
}

// Calculating meal totals

function mealCalculator() {
  $('.js-meal-entry-form').on( 'submit', function () {
    const mealTotal = ( STORE.price[0] + STORE.tax[0] + STORE.tip[0] );
    STORE.earnings.push(mealTotal);
    console.log(`Meal total is $${mealTotal}`);
    STORE.mealCounter++;
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
    for ( let i = 0; i < STORE.tipTotal.length; i++ ) {
      let total;
      total += STORE.tipTotal[i];
    }
    $('.earnings-info-tip-total').html(`Tip Total: ${tipTotal}`);
    $('.earnings-meal-count').html(`Meal Count: ${STORE.mealCounter}`);
    const averageTip = ( tipTotal / STORE.mealCounter );
    $('.earnings-average-tip').html(`Average Tip: ${averageTip}`);
  };
}

// calling necessary task functions so calculator can run

function main() {
  handlePrice();
  handleTax();
  handleTip();
  mealCalculator();
  customerCharges();
  earningsInfo();
}