const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

// Inside beforeEach, we will use our accounts to deploy a new instance
//of our CampaignFactory. Then, we can manipulate that factory to
//start creating campaigns and writing tests around campaigns.

let accounts; // accounts that exist on local Ganache test network.
let factory; // refers to the deployed instance of factory.

let campaignAddress;
let campaign;

beforeEach( async ()=>{

accounts = await web3.eth.getAccounts();

factory = await new web3.eth.Contract(
JSON.parse(compiledFactory.interface)
).deploy({data: compiledFactory.bytecode})
.send({from: accounts[0], gas:'1000000'});

await factory.methods.createCampaign('100').send({

 from: accounts[0],
 gas: '1000000'

});

[campaignAddress] = await factory.methods.getDeployedCampaigns().call();
campaign = await new web3.eth.Contract(

JSON.parse(compiledCampaign.interface),
campaignAddress

);

});


describe('Campaigns', ()=>{

it('deploys a factory and a campaign', ()=>{

assert.ok(factory.options.address);
assert.ok(campaign.options.address);

});

it('designates caller as the campaign manager', async ()=>{

const manager = await campaign.methods.manager().call();
assert.equal(manager,accounts[0]);
});


it('allows people to contribute money and be marked as approvers', async ()=>{

await campaign.methods.contribute().send({

 value:'200',
 from:accounts[1]
});

const isContributor = await campaign.methods.approvers(accounts[1]).call();
assert.ok(isContributor);

});

it('requires a minimum contribution', async ()=>{

try{
await campaign.methods.contribute().send({

 value:'99',
 from:accounts[1]
});

assert.ok(false)

} catch(err){

  assert.ok(err);
}


});

it('allows a manager to make a payment request', async ()=>{

await campaign.methods.createRequest('Buy Batteries',100,accounts[1]).send({

 from:accounts[0],
 gas:'1000000'

});

const request = await campaign.methods.requests(0).call();

assert.equal(request.description,'Buy Batteries');

});



});
