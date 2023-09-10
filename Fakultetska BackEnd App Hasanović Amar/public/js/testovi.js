import { default as AjaxPozivi } from "../../AjaxPozivi.js";

let expect = chai.expect;

describe("", function () {
  beforeEach(function () {
    this.xhr = sinon.useFakeXMLHttpRequest();
    this.requests = [];
    this.xhr.onCreate = function (xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });

  afterEach(function () {
    this.xhr.restore();
  });

  it("Provjerva studenta koji ne postoji", function () {
    var dataToSend = {
      ime: "ime",
      prezime: "prezime",
      index: "index",
      grupa: "grupa",
    };
    var dataJson = JSON.stringify(dataToSend);

    AjaxPozivi.posaljiStudent(dataToSend, (err, data) => {
      if (err) {
        expect(err).to.have.property("status").to.contain("već postoji");
      } else {
        expect(data).to.have.property("status").to.contain("Kreiran student");
      }
    });

    expect(this.requests[0].requestBody).to.be.equal(dataJson);
  });

  it("Mijenja grupu studentu koji ne postoji", function () {
    var testData = {
      grupa: "grupa",
    };
    var dataJson = JSON.stringify(testData);

    AjaxPozivi.postaviGrupu("index", "grupa", (err, data) => {
      if (err) {
        expect(err).to.have.property("status").to.contain("ne postoji");
      } else {
        expect(data).to.have.property("status").to.contain("Kreiran student");
      }
    });

    expect(JSON.parse(this.requests[0].requestBody)).to.be.deep.equal(testData);
  });
});
