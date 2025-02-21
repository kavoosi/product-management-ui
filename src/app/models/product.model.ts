export class Product {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public estimatedComplexity: string, // S, M, L, XL
        public status: string, // New, Active, Closed, Abandoned
        public targetCompletionDate?: Date,
        public actualCompletionDate?: Date
    ) { }
}
