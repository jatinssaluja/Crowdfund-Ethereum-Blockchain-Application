import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react';
import campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class RequestForm extends Component{

  constructor(props){

   super(props);

   this.state = {desc:'',
                 amount:'',
                 recipient:'',
                 errorMessage:undefined,
                 loading:false
               };

  }

  onDescriptionChange(event){

    const desc = event.target.value;

    this.setState(()=>{

     return {desc,errorMessage:undefined};

    });
  }

  onAmountChange(event){

    const amount = event.target.value;

    this.setState(()=>{

     return {amount,errorMessage:undefined};

    });
  }

  onRecipientChange(event){

    const recipient = event.target.value;

    this.setState(()=>{
     return {recipient,errorMessage:undefined};

    });
  }



  async onSubmit(event) {

    event.preventDefault();
    const campaignInstance = campaign(this.props.address);
    const {desc,amount,recipient} = this.state;

    this.setState(()=>{
     return {loading:true};
    });

   try{
    const accounts = await web3.eth.getAccounts();

    await campaignInstance.methods
    .createRequest(desc,web3.utils.toWei(amount,'ether'),recipient)
    .send({from: accounts[0]});

    Router.pushRoute(`/campaigns/${this.props.address}/requests`);

  } catch(err){

    this.setState(()=>({errorMessage:err.message}));

  }

  this.setState(()=>{

   return {loading:false, amount:'', desc:'', recipient:''};


  });



}




 render(){


   return (

   <Form onSubmit = {this.onSubmit.bind(this)} error={this.state.errorMessage?true:false}>
     <Form.Field>
       <label>Description</label>
       <Input
         value={this.state.desc}
         onChange = {this.onDescriptionChange.bind(this)}
       />
      </Form.Field>

      <Form.Field>
        <label>Amount</label>
        <Input
          label="ether"
          labelPosition="right"
          value={this.state.amount}
          onChange = {this.onAmountChange.bind(this)}
        />
       </Form.Field>

       <Form.Field>
         <label>Recipient</label>
         <Input
           value={this.state.recipient}
           onChange = {this.onRecipientChange.bind(this)}
         />
        </Form.Field>



      <Message error header="Ooops!" content={this.state.errorMessage}/>
      <Button loading={this.state.loading} primary type='submit'>

       Create
      </Button>
     </Form>
   );



 }



}


export default RequestForm;
