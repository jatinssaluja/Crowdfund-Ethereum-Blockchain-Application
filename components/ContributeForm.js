import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react';
import campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ContributeForm extends Component{

  constructor(props){

   super(props);

   this.state = {amount:'',
                 errorMessage:undefined,
                 loading:false
               };

  }

  onTextChange(event){

    const amount = event.target.value;

    this.setState(()=>{

     return {amount,errorMessage:undefined};


    });


  }



  async onSubmit(event) {

    event.preventDefault();
    const campaignInstance = campaign(this.props.address);

    this.setState(()=>{
     return {loading:true};
    });

   try{
    const accounts = await web3.eth.getAccounts();

   // send requires the value to be specified in wei.

    await campaignInstance.methods
    .contribute()
    .send({
     from: accounts[0],
     value:web3.utils.toWei(this.state.amount,'ether')
    });

    Router.replaceRoute(`/campaigns/${this.props.address}`);

  } catch(err){

    this.setState(()=>({errorMessage:err.message}));

  }

  this.setState(()=>{

   return {loading:false, amount:''};


  });



  }




 render(){


   return (

   <Form onSubmit = {this.onSubmit.bind(this)} error={this.state.errorMessage?true:false}>
     <Form.Field>
       <label>Amount to Contribute</label>
       <Input
         label="ether"
         labelPosition="right"
         value={this.state.amount}
         onChange = {this.onTextChange.bind(this)}
       />
      </Form.Field>

      <Message error header="Ooops!" content={this.state.errorMessage}/>
      <Button loading={this.state.loading} primary type='submit'>

       Conntribute!
      </Button>
     </Form>
   );



 }



}


export default ContributeForm;
