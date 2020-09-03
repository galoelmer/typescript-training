import { isFormatter } from '../interfaces/isFormatter.js';

export class Invoice implements isFormatter {
    constructor(
        readonly client: string,
        private details: string,
        public amount: number
    ) { }

    format() {
        return `${this.client} owes for ${this.details} $${this.amount}`;
    }
}

