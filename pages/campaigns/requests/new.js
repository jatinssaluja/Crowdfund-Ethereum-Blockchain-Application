import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import RequestForm from '../../../components/RequestForm';
import {Button} from 'semantic-ui-react';
import {Link} from '../../../routes';

class NewRequest extends Component{

  static getInitialProps(props){

    return {address:props.query.address};

  }

 render(){

 return (

  <Layout>
   <Link route={`/campaigns/${this.props.address}/requests`}>
     <a>
      <Button primary> Back</Button>
       </a>
     </Link>
   <h1>Add New Request</h1>
   <RequestForm address={this.props.address}/>
    </Layout>
 );

 }



}


export default NewRequest;
