class CardModel {
  constructor(data = {}) {
    this.companyName = data.companyName || "";
    this.personName = data.personName || "";
    this.address = data.address || "";
    this.telephoneNo = data.telephoneNo || "";
    this.phoneNo = data.phoneNo || "";
    this.emailId = data.emailId || "";
    this.companyDomainName = data.companyDomainName || [];
  }
}

module.exports = CardModel;