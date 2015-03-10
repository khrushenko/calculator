"use strict";

// set click elements
attachCalcEvent("js-calc-plus", calculator.clickOperation("+"));
attachCalcEvent("js-calc-minus", calculator.clickOperation("-"));
attachCalcEvent("js-calc-product", calculator.clickOperation("*"));
attachCalcEvent("js-calc-division", calculator.clickOperation("/"));
attachCalcEvent("js-calc-percent", calculator.clickOperation("%"));
attachCalcEvent("js-calc-sqrt", calculator.clickUnaryOperation("sqrt"));
attachCalcEvent("js-calc-exp", calculator.clickOperation("^"));
for (var i = 0; i <= 9; i++) {
    attachCalcEvent("js-calc-number-" + i, calculator.clickNumber(i, calculator));
}
attachCalcEvent("js-calc-point", calculator.clickPoint());
attachCalcEvent("js-calc-clear", calculator.clickClear());
attachCalcEvent("js-calc-result", calculator.clickResult());

// set display element
calculator.display("js-calc-display");