// Tests if the visitor count is a string as well as a number
describe('API Smoke Test', () => {
  it('visit count is returned', () => {
  cy.request('POST', 'https://n2uco1ui1g.execute-api.us-east-2.amazonaws.com/visits')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.a('string');
        expect(!isNaN(Number(JSON.parse(response.body)))).to.be.true;
      });
  })
})