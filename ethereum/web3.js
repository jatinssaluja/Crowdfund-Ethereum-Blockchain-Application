import Web3 from 'web3';

//currently, we are assuming that metamask has already injected
// the instance of web3 into the page

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){

// We are in the browser and metamask is running.

web3 = new Web3(window.web3.currentProvider);

} else {

// We are on the server or the user is not running metamask.
// We are going to set up our own provider that connects to
//Rinkeby test network through Infura.

const provider = new Web3.providers.HttpProvider(

 'https://rinkeby.infura.io/mXM4tRPZNVTw2DN8AlE4'
  
);

web3 = new Web3(provider);


}




export default web3;
