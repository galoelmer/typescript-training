import { isFormatter } from '../interfaces/isFormatter.js';

export class Payment implements isFormatter {
    constructor(
        readonly recipient: string,
        private details: string,
        public amount: number
    ) { }

    format() {
        return `${this.recipient} owes for ${this.details} $${this.amount}`;
    }
}