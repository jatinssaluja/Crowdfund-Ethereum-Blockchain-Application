import React ,{Component} from 'react';
import {Table, Label, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import campaign from '../ethereum/campaign';
import {Link} from '../routes';

class RequestRow extends Component{


async approve(){


  const campaignInstance = campaign(this.props.address);
  const accounts = await web3.eth.getAccounts();

  await campaignInstance.methods.approveRequest(this.props.index).send({
    from:accounts[0]
  });


}

async finalize(){


  const campaignInstance = campaign(this.props.address);
  const accounts = await web3.eth.getAccounts();

  await campaignInstance.methods.finalizeRequest(this.props.index).send({
    from:accounts[0]
  });


}


render(){

const {Row, Cell} = Table;
const readyToFinalize = this.props.request.approvalCount > this.props.approversCount/2;


return (
   <Row disabled={this.props.request.complete} positive={readyToFinalize && !this.props.request.complete}>
     <Cell>
       <Label>{this.props.index}</Label>
      </Cell>
      <Cell>
        <Label>{this.props.request.description}</Label>
       </Cell>
       <Cell>
         <Label>{web3.utils.fromWei(this.props.request.value,'ether')}</Label>
        </Cell>
        <Cell>
          <Label>{this.props.request.recipient}</Label>
         </Cell>
         <Cell>
           <Label>{`${this.props.request.approvalCount}/${this.props.approversCount}`}</Label>
          </Cell>
         <Cell>
                {this.props.request.complete ? null : (
                  <Button color="green" basic onClick={this.approve.bind(this)}>Approve</Button>)
              }
          </Cell>
          <Cell>
               {this.props.request.complete ? null : (
                 <Button color="teal" basic onClick={this.finalize.bind(this)}>Finalize</Button>)

               }
           </Cell>
    </Row>
);

}

}


export default RequestRow;
