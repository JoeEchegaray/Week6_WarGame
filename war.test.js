const expect = chai.expect;

//This unit test is to verify that the method is creating cards properly in the correct order.
describe("Create a Card", function () {
    it("Should Create an object with 3 Paramaters", function () {
        console.log('card');
        let suit = 'Diamonds';
        let name = 'Ace';
        let value = 14;
        let card = new Card(suit, name, value)
        console.log(card);
        console.log({ suit: suit, name: name, value: value });
        expect(card).to.deep.equal({ suit: suit, name: name, value: value });
    });
});



