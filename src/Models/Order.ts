import { OrderItem } from "./OrderItem";

export class Order {
    constructor(
        public id = 0,
        public name = "",
        public email = "",
        public total = 0,
        public order_items:OrderItem[] = []
    ){}
}