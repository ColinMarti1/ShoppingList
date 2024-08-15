export class Product{
    category: string;
    description: string;
    amount: number;

    constructor(category: string, description: string, amount: number) {
        this.category = category;
        this.description = description;
        this.amount = amount;
    }
}