export class Product {
    constructor(
        public productId: number,
        public title: string,
        public description: string,
        public estimatedComplexity: string, // S, M, L, XL
        public status: string, // New, Active, Closed, Abandoned
        public targetCompletionDate: Date | null,
        public actualCompletionDate: Date | null
    ) { }

}

