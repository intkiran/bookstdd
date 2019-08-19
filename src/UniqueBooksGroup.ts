export class UniqueBooksGroup {
  private books = new Array();

  constructor() {}

  public exists(book) {
    return this.books.indexOf(book) >= 0 ? true : false;
  }
  public push(book: number) {
    this.books.push(book);
  }

  public pop() {
    this.books.pop();
  }

  public price = function() {
    return 8 * this.books.length * this.calculateDiscount();
  };

  public calculateDiscount() {
    switch (this.books.length) {
      case 2:
        return 0.95;
      case 3:
        return 0.9;
      case 4:
        return 0.8;
      case 5:
        return 0.75;
      default:
        return 1;
    }
  }

  public toString() {
    return this.books;
  }
}
