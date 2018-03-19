pragma solidity ^0.4.17;

contract CampaignFactory{

    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {

        address newCampaign = new Campaign(minimum,msg.sender);
        deployedCampaigns.push(newCampaign);

    }

    function getDeployedCampaigns() public view returns(address[]) {

        return deployedCampaigns;

    }



}

contract Campaign {

  struct Request{

      string description;
      uint value;
      address recipient;
      bool complete;
      uint approvalCount;
      mapping(address => bool) approvals;
  }

  Request[] public requests;
  address public manager;
  uint public minimumContribution;
  mapping(address => bool) public approvers;
  uint public approversCount;

  modifier restricted() {

      require(msg.sender == manager);
      _;

  }


  function Campaign(uint minimum, address sender) public{
      // here the minimum is in wei
      manager = sender; // sender property describes who is attempting to create the contract.
      minimumContribution = minimum;

  }

  function contribute() public payable {

      require(msg.value >= minimumContribution); // value is the amount in wei that someone has sent along the transaction that is targeting this function.
      approvers[msg.sender] = true;
      approversCount++;

  }

  // Only the Manager should be able to call createRequest
  function createRequest(string description, uint value, address recipient) public restricted {
     // When we initialize properties of a struct, we only have to initialize value types.
     // We do not have to initialize reference types.
     Request memory request = Request({

         description: description,
         value: value,
         recipient: recipient,
         complete: false,
         approvalCount:0
     });

     requests.push(request);

  }

  function approveRequest(uint index) public {

      require(approvers[msg.sender]);
      require(!requests[index].approvals[msg.sender]);


      requests[index].approvals[msg.sender] = true;
      requests[index].approvalCount++;


  }

  function finalizeRequest(uint index) public restricted {

      Request storage request = requests[index];

      require(!request.complete);
      require(request.approvalCount > (approversCount/2));

      request.recipient.transfer(request.value);
      requests[index].complete = true;
  }

  function getSummary() public view returns (

  uint, uint, uint, uint, address

  ){

       return (

          minimumContribution,
          this.balance,
          requests.length,
          approversCount,
          manager

       );
  }

 function getRequestsCount() public view returns (uint){

   return requests.length;

 }


}
