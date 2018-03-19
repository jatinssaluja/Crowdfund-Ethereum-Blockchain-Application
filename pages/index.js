import React , {Component} from 'react';
import factory from '../ethereum/factory';
import {Card, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';


class CampaignIndex extends Component{

static async getInitialProps(){

  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {campaigns};// this object will be provided to our component as props.

}

renderCampaigns(){

const cardCampaigns = this.props.campaigns.map((campaign)=>{

       return {

      header: campaign,
      description:<Link route={`/campaigns/${campaign}`}><a>View Campaign</a></Link>,
      fluid:true
       };

});

return <Card.Group items={cardCampaigns}/>;

}


render(){

return (

  <Layout>
  <div>
  <h3>Open Campaigns</h3>

<Link route="/campaigns/new">
   <a>
    <Button
       floated="right"
       content = "Create Campaign"
       icon = "add circle"
       primary
    />

    </a>
  </Link>

  {this.renderCampaigns()}

  </div>

  </Layout>);

}

}


export default CampaignIndex;
