"use strict";

var calculator = {
    a: undefined,
    b: undefined,
    operation: undefined,
    state: states.START,
    MAX_LENGTH: 30,

    display: function (el) {
        el = document.getElementsByClassName(el)[0];
        this.display = function (str) {
            el.innerHTML = str;
        }
    },

    calculateResult: function () {
        this.a = parseFloat(this.a);
        this.b = parseFloat(this.b);
        switch (this.operation) {
            case "+":
                this.a += this.b;
                break;
            case "-":
                this.a -= this.b;
                break;
            case "*":
                this.a *= this.b;
                break;
            case "/":
                this.a /= this.b;
                break;
            case "%":
                this.a = (this.a / 100) * this.b;
                break;
            case "^":
                this.a = Math.pow(this.a, this.b);
                break;
            case "sqrt":
                this.a = Math.sqrt(this.a);
        }
        this.a = Math.round(this.a * 1000000) / 1000000;
        this.state = states.RESULT;
    },

    clickOperation: function (type) {
        var self = this;
        return function () {
            switch (self.state) {
                case states.START:
                    break;
                case states.ENTERED_FIRST_ARGUMENT:
                    self.operation = type;
                    self.state = states.ENTERED_OPERATION;
                    break;
                case states.ENTERED_OPERATION:
                    self.operation = type;
                    break;
                case states.ENTERED_SECOND_ARGUMENT:
                    self.calculateResult();
                    self.operation = type;
                    self.state = states.ENTERED_OPERATION;
                    self.display(self.a);
                    break;
                case states.RESULT:
                    self.operation = type;
                    self.state = states.ENTERED_OPERATION;
                    break;
            }
        }
    },

    clickUnaryOperation: function (type) {
        var self = this;
        return function () {
            switch (self.state) {
                case states.START:
                    break;
                case states.ENTERED_FIRST_ARGUMENT:
                case states.ENTERED_OPERATION:
                case states.RESULT:
                    self.operation = type;
                    self.calculateResult();
                    self.state = states.RESULT;
                    self.display(self.a);
                    break;
                case states.ENTERED_SECOND_ARGUMENT:
                    self.calculateResult();
                    self.operation = type;
                    self.calculateResult();
                    self.state = states.RESULT;
                    self.display(self.a);
                    break;
            }
        }
    },

    clickNumber: function (n) {
        var self = this;
        return function () {
            switch (self.state) {
                case states.ENTERED_FIRST_ARGUMENT:
                    if (self.a.length < self.MAX_LENGTH) {
                        self.a = self.a.toString() + n.toString();
                        self.display(self.a);
                    }
                    break;
                case states.ENTERED_OPERATION:
                    self.b = n.toString();
                    self.state = states.ENTERED_SECOND_ARGUMENT;
                    self.display(self.b);
                    break;
                case states.ENTERED_SECOND_ARGUMENT:
                    if (self.b.length < self.MAX_LENGTH) {
                        self.b = self.b.toString() + n.toString();
                        self.display(self.b);
                    }
                    break;
                case states.RESULT:
                case states.START:
                    self.a = n.toString();
                    self.state = states.ENTERED_FIRST_ARGUMENT;
                    self.display(self.a);
                    break;
            }
        }
    },

    clickPoint: function () {
        var self = this;
        return function () {
            switch (self.state) {
                case states.START:
                case states.RESULT:
                    self.a = "0.";
                    self.state = states.ENTERED_FIRST_ARGUMENT;
                    self.display(self.a);
                    break;
                case states.ENTERED_FIRST_ARGUMENT:
                    if (!(self.a.toString().indexOf(".") + 1)) {
                        self.a = self.a + ".";
                        self.display(self.a);
                    }
                    break;
                case states.ENTERED_OPERATION:
                    self.b = "0.";
                    self.state = states.ENTERED_SECOND_ARGUMENT;
                    self.display(self.b);
                    break;
                case states.ENTERED_SECOND_ARGUMENT:
                    if (!(self.b.toString().indexOf(".") + 1)) {
                        self.b = self.b + ".";
                        self.display(self.b);
                    }
                    break;
            }
        }
    },

    clickResult: function () {
        var self = this;
        return function () {
            switch (self.state) {
                case states.START:
                case states.ENTERED_FIRST_ARGUMENT:
                case states.ENTERED_OPERATION:
                case states.RESULT:
                    break;
                case states.ENTERED_SECOND_ARGUMENT:
                    self.calculateResult();
                    self.display(self.a);
                    break;
            }
        }
    },

    clickClear: function () {
        var self = this;
        return function () {
            self.state = states.START;
            self.operation = undefined;
            self.a = undefined;
            self.b = undefined;
            self.display("0");
        }
    }
};