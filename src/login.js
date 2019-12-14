import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import KissanNumber from './constants/kissanNumbers';
import { ToastContainer, toast } from 'react-toastify';
import web3 from './web3';
import contract from './contract';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import { withRouter } from 'react-router-dom'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kissanNum: '',
            registerUser: false,
            accounts: []
        }
    }
    async componentDidMount () {
        
        const accounts =await web3.eth.getAccounts();
        this.setState({
            accounts:accounts
        })
    }
    notify = async () => {
        const hasValue = KissanNumber.filter(word => word == this.state.kissanNum);
        if (hasValue.length > 0) {
            try {
                localStorage.setItem('policyNumber', this.state.kissanNum);
                const accounts = await web3.eth.getAccounts();
                const sen = await contract.methods.verifyFarmer(this.state.kissanNum).call({from: accounts[0]});
                if (sen === '0x0000000000000000000000000000000000000000' || sen == null) {
                    toast.error("Please register in contract, Not registered!!");
                    this.setState({
                        registerUser: true
                    });
                    
                } else {
                    toast.success("Valid User, Plese contiune to buy policy");
                }
                //const manager = await contract.events.CallForRegister({fromBlock: 0, toBlock: 'latest'},(err, evet) => console.log(evet));

                // this.setState({
                //   manager: manager
                // });
            } catch (err) {
                console.log(err);
            }
        }
        else {
            this.setState({
                registerUser: false
            });
            toast.error("Invalid kissan number, please try again!!");
        }


    }
    getKissanNumber = (e) => {
        this.setState({
            kissanNum: e.target.value
        });
    }
    render() {
        return (
            <Paper className="loginContianer" zDepth={1}>
    <h4>{this.state.accounts.length === 0 && 'Please login to meta mask account'}</h4>
                <h3>{this.state.registerUser ? <span>Please Register</span> : <div>Please login </div>}</h3>
                {this.state.registerUser ? <RaisedButton onClick={() => this.props.history.push('/newFarmer')} label="Register" primary={true} />: 
                this.state.accounts.length !== 0 &&
                <div>
                <TextField
                        onChange={this.getKissanNumber}
                        hintText="Enter your Kissan Number"
                    />
                    <RaisedButton onClick={this.notify} label="Submit" primary={true} />
                    </div>
                }
                <ToastContainer />

            </Paper>
        )
    }
};
export default withRouter(Login);