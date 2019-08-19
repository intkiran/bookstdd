import { MyCart } from "../src/MyCart";
import { expect } from "chai";
describe("Shooping Cart Books Tests", () => {
  let bookCart: MyCart;

  beforeEach(() => {
    bookCart = new MyCart();
  });
  it("Basic Tests", () => {
    console.log(typeof bookCart);
    expect(typeof bookCart).to.eql("object");
    expect(new MyCart().getTotalCost([])).to.eql(0);
    expect(new MyCart().getTotalCost([0])).to.eql(8);
    expect(new MyCart().getTotalCost([1])).to.eql(8);
    expect(new MyCart().getTotalCost([2])).to.eql(8);
    expect(new MyCart().getTotalCost([0, 0])).to.eql(8 * 2);
    expect(new MyCart().getTotalCost([1, 1, 1])).to.eql(8 * 3);
  });
  it("Basic Tests with discounts", () => {
    expect(new MyCart().getTotalCost([0, 1])).to.eql(8 * 2 * 0.95);
    expect(new MyCart().getTotalCost([0, 1, 2])).to.eql(8 * 3 * 0.9);
    expect(new MyCart().getTotalCost([0, 1, 2, 3])).to.eql(8 * 4 * 0.8);
    expect(new MyCart().getTotalCost([0, 1, 2, 3, 4])).to.eql(8 * 5 * 0.75);
  });
  it(" Tests with different set of books discounts", () => {
    expect(new MyCart().getTotalCost([0, 0, 1])).to.eql(8 + 8 * 2 * 0.95);
    expect(new MyCart().getTotalCost([0, 0, 1, 1])).to.eql(2 * (8 * 2 * 0.95));
    expect(new MyCart().getTotalCost([0, 0, 1, 2, 2, 3])).to.eql(
      8 * 4 * 0.8 + 8 * 2 * 0.95
    );
    expect(new MyCart().getTotalCost([0, 1, 1, 2, 3, 4])).to.eql(
      8 + 8 * 5 * 0.75
    );
    console.log("price 0", new MyCart().getTotalCost([0, 0, 1, 1, 2, 2, 3, 4]));
    expect(new MyCart().getTotalCost([0, 0, 1, 1, 2, 2, 3, 4])).to.eql(
      2*(8 * 3 * 0.75) + 8 * 2 * 0.95)
    );
  });
});
