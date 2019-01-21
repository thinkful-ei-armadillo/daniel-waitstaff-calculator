/* global $ */
'use strict';

// Building a waitstaff calculator so waitstaff can do 3 things:
// --Add meal items and individual costs
// --Calculate total charges for customer (subtotal) plus tip %
// --Display total earnings for the restaurant based on night's meals

// Data store for all details

const STORE = {
  earnings: [],
  meal: [],
  tax: []
};

// Resetting data store for RESET button functionality

function resetAll() {
  STORE.earnings = [];
  STORE.meal = [];
  STORE.tax = [];
  STORE.tip = [];
}

// putting together tip percentage

function handleTip() {
  $('.js-tip').on('entry', function() {
    STORE.tip = $(this).val();
  });
}

// handling tax

function handleTip() {
  $('.js-tax').on('entry', function() {
    STORE.tax = $(this).val();
  });
}

// Calculating meal totals

function mealCalculator(price, tax, tip) {
  $('.js-meal-calculator').on( 'submit', function (price, tax, tip) {
    let mealTotal = price + tax + tip;
    STORE.earnings.push(mealTotal);
  });
}


// calling necessary task functions so calculator can run

function main() {
  mealCalculator();
}