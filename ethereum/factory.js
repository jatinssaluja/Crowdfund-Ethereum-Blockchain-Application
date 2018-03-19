import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

//Anytime that we wnat to tell web3 about a already
//deployed contract, we have to give web3 that contract's interface.

const instance = new web3.eth.Contract(

JSON.parse(CampaignFactory.interface),
'0x0Ab7A9AF5A26cE98020dcf78BE6DbFb144BceC74'

);

export default instance;
