import React, {Component} from 'react';
import {Card, Grid, Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component{

// Anytime we want to fetch some data about a
//given campaign inside one of these page components
//we will define getInitialProps method. That method
//gets called automatically before our component
//gets rendered on the screen.

//getInitialProps is not part of the component instance.

static async getInitialProps(props){

const campaignInstance = campaign(props.query.address);

const summary = await campaignInstance.methods.getSummary().call();

return {
address:props.query.address,
minimumContribution: summary['0'],
balance: summary['1'],
requestsCount: summary['2'],
approversCount: summary['3'],
manager: summary['4']

};
}


renderCards(){

  const {minimumContribution,balance,requestsCount,approversCount,manager} = this.props;

 const items = [

 {
   header:manager,
   meta:'Address of Manager',
   description:'The Manager created this campaign and can create requests to withdraw money',
   style:{overflowWrap:'break-word'}
 },

 {
   header:minimumContribution,
   meta:'Minimum Contribution (wei)',
   description:'You must contribute atleast this much wei to become an approver',
   style:{overflowWrap:'break-word'}
 },

 {
   header:requestsCount,
   meta:'Number of requests',
   description:'A request tries to withdraw money from the contract. A Request must be approved by the approvers',
   style:{overflowWrap:'break-word'}
 },

 {
   header:approversCount,
   meta:'Number of approvers',
   description:'Number of people who already have donated to this campaign.',
   style:{overflowWrap:'break-word'}
 },


  {
    header:web3.utils.fromWei(balance,'ether'),
    meta:'Campaign Balance (ether)',
    description:'Money that the campaign is left with to spend.',
    style:{overflowWrap:'break-word'}
  }


 ];

  return <Card.Group items={items}/>;


}




render(){

return (

  <Layout>
   <h3>Campaign Details</h3>
    <Grid>
     <Grid.Row>
       <Grid.Column width={10}>
          {this.renderCards()}
       </Grid.Column>

       <Grid.Column width={6}>
          <ContributeForm address={this.props.address}/>
        </Grid.Column>
      </Grid.Row>

    <Grid.Row>
     <Grid.Column>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>
          <Button primary>View Requests</Button>
          </a>
        </Link>
       </Grid.Column>
      </Grid.Row>
    </Grid>
  </Layout>

);

}


}

export default CampaignShow;
