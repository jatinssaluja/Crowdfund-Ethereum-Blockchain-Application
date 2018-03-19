import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component{

 static async getInitialProps(props){

   const {address} = props.query;

   const campaignInstance = campaign(address);

   const requestCount = await campaignInstance.methods.getRequestsCount().call();
   const approversCount = await campaignInstance.methods.approversCount().call();

   const requests = await Promise.all(
    Array(requestCount).fill().map((element, index)=>{
     return campaignInstance.methods.requests(index).call();
    })
   );


   return {address, requests, requestCount, approversCount};

 }

renderRows(){

const rows = this.props.requests.map((request,index)=>{


           return (<RequestRow key={index}
             index={index}
             request={request}
             address = {this.props.address}
             approversCount = {this.props.approversCount}/>);


});
return rows;

}


render(){

  const {Header, Row, HeaderCell, Body} = Table;

  return (
    <Layout>
    <h1>List of requests</h1>
    <Link route={`/campaigns/${this.props.address}/requests/new`}>
    <a>
    <Button primary>Add Request</Button>
    </a>
    </Link>

     <Table>
       <Header>
         <Row>
           <HeaderCell>ID</HeaderCell>
           <HeaderCell>Description</HeaderCell>
           <HeaderCell>Amount</HeaderCell>
           <HeaderCell>Recipient</HeaderCell>
           <HeaderCell>Approval Count</HeaderCell>
           <HeaderCell>Approve</HeaderCell>
           <HeaderCell>Finalize</HeaderCell>
         </Row>
       </Header>
      <Body>

       {this.renderRows()}

       </Body>
      </Table>
    </Layout>
  );

}

}

export default RequestIndex;
