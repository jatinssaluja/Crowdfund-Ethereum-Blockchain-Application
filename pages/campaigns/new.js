import React, {Component} from 'react';
import Layout from '../../components/Layout';
import {Button, Form, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

class CampaignNew extends Component{

 constructor(props){

  super(props);

  this.state = {minimumContribution:'',
                errorMessage:undefined,
                loading:false
              };

 }

 onTextChange(event){

   const minimumContribution = event.target.value;

   this.setState(()=>{

    return {minimumContribution,errorMessage:undefined};


   });


 }


 async onSubmit(event) {


   event.preventDefault();

   this.setState(()=>{

    return {loading:true};


   });

  try{
   const accounts = await web3.eth.getAccounts();

   await factory.methods
   .createCampaign(this.state.minimumContribution)
   .send({
    from: accounts[0]
   });

   Router.pushRoute('/');

 } catch(err){

   this.setState(()=>({errorMessage:err.message}));

 }

 this.setState(()=>{

  return {loading:false};


 });



 }



render(){

return (

   <Layout>
     <h3>Create a New Campaign</h3>

     <Form onSubmit = {this.onSubmit.bind(this)} error={this.state.errorMessage?true:false}>

      <Form.Field>
        <label>Minimum Contribution</label>
        <Input onChange = {this.onTextChange.bind(this)}
        value = {this.state.minimumContribution}
        label="wei"
        labelPosition = "right"
        placeholder='Enter Minimum Contribution'/>
        </Form.Field>

      <Message error header="Ooops!" content={this.state.errorMessage}/>
      <Button loading={this.state.loading} primary type='submit'>Create</Button>

        </Form>
    </Layout>);
}




}

export default CampaignNew;
