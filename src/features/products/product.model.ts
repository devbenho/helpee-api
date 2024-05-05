class Product {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public brand: string,
    public category: string,
    public subcategory: boolean,
    public isBoycott: boolean,
    public imagePath: string
  ) {}
  static create(
    name: string,
    brand: string,
    description: string | undefined,
    category: string,
    subcategory: boolean,
    isBoycott: boolean,
    imagePath: string
  ) {
    return new Product(
      0,
      name,
      description ? description : "",
      brand,
      category,
      subcategory,
      isBoycott,
      imagePath
    );
  }
}

export { Product };
