import { UniqueBooksGroup } from "./UniqueBooksGroup";

export class MyCart {
  private BOOK_UNIT_COST = 8;
  private groups = [];
  constructor() {
    this.groups[0] = new UniqueBooksGroup();
  }
  public addBooks(books: number[]) {
    for (var i in books) {
      this.addBook(books[i]);
    }
  }
  public addBook(book: number) {
    if (!this.addBookInExistingGroup(book)) {
      var newGroup = new UniqueBooksGroup();
      newGroup.push(book);
      this.groups.push(newGroup);
    }
  }
  public addBookInExistingGroup(book) {
    var positionForBestPrice = this.getGroupPositionForBestPrice(book);
    if (positionForBestPrice < 0) {
      return false;
    }
    this.groups[positionForBestPrice].push(book);
    return true;
  }
  public getGroupPositionForBestPrice(book) {
    let positionForBestPrice = -1;
    var bestPrice = -1;
    for (var j in this.groups) {
      if (!this.groups[j].exists(book)) {
        var newPrice = this.priceIfBookIsAddedToGroup(book, j);
        if (bestPrice < 0 || newPrice < bestPrice) {
          positionForBestPrice = parseInt(j);
          bestPrice = newPrice;
        }
      }
    }
    return positionForBestPrice;
  }
  public priceIfBookIsAddedToGroup(book, positionOfGroup) {
    this.groups[positionOfGroup].push(book);
    var newPrice = this.price();
    this.groups[positionOfGroup].pop();

    return newPrice;
  }
  public price() {
    var price = 0;
    for (var i in this.groups) {
      price += this.groups[i].price();
    }
    return price;
  }

  public toString() {
    var result = "";
    result += "price: [" + this.price() + "]\n";
    for (var i in this.groups) {
      result += "  group (" + i + "): " + this.groups[i].toString() + "\n";
    }
    return result;
  }
  public getTotalCost(books) {
    this.addBooks(books);
    return this.price();
  }
}
