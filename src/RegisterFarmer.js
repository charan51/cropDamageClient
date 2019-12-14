import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import KissanNumber from './constants/kissanNumbers';
import web3 from './web3';
import contract from './contract';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
class NewFarmer extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            name: '',
            location: '',
            kissanNumber: ''
        }

    }
    getUserDetails = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    }
    register = async () => {
        const hasValue = KissanNumber.filter(word => word == this.state.kissanNumber);
        
        if (hasValue.length > 0) {
            const accounts = await web3.eth.getAccounts();
            const register = await contract.methods.addFarmer(this.state.name, this.state.location, this.state.kissanNumber).send({from : accounts[0]});
            if(register) {
            toast.success("Registration completed, please wait for a moment");
            } 
        } else {
            toast.error("Invalid kissan number, please verify again!!");
        }
    }
    render() {
        return (
            <Paper className="loginContianer" zDepth={1}>
            <h3>Register account</h3>
            <div>
            <TextField
            name="name"
                    onChange={this.getUserDetails}
                    hintText="Enter your Name"
                />
                <TextField
                name="location"
                    onChange={this.getUserDetails}
                    hintText="enter your Location"
                />
                <TextField
                name="kissanNumber"
                    onChange={this.getUserDetails}
                    hintText="Enter your kissan number"
                />
                <RaisedButton onClick={this.register} label="Submit" primary={true} />
                </div>
            
            <ToastContainer />

        </Paper>
        )
    }
}
export default NewFarmer;