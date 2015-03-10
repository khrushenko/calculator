"use strict";

var states = {
    START: 0,
    ENTERED_FIRST_ARGUMENT: 1,
    ENTERED_OPERATION: 2,
    ENTERED_SECOND_ARGUMENT: 3,
    RESULT: 4
};

function attachCalcEvent(el, func) {
    el = document.getElementsByClassName(el)[0];
    el.addEventListener('click', func);
};