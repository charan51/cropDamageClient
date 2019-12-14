import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import web3 from './web3';
import contract from './contract';
import _ from 'lodash';
import weatherReport from './constants/weather';
class ClaimPolicy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            totalClaim: ''
        }
    };
    claim = async () => {   
        const policyNum = localStorage.getItem('policyNumber');
        const claim = localStorage.getItem(policyNum);
        const parsedClaim = JSON.parse(claim)
        const hasValue = weatherReport[this.state.value].filter(word => word == parsedClaim.location);
        if(hasValue.length > 0) {
            const ClaimCost = (80 / 100)*(Math.round((parsedClaim.acers * parsedClaim.commodity)));
            this.setState({
                totalClaim: Math.round(ClaimCost)
            });

            const accounts = await web3.eth.getAccounts();
            const contractClaim = await contract.methods.claimForDamage(policyNum, this.state.value, ClaimCost).send({from: accounts[0]});
            const eventListen = await contract.events.claimPolicyStatus({toBlock: 'latest'}, (err, event) => {
                toast.success(event.returnValues[0]);    
            }); 
            
        }else {
            toast.error(`We do not see ${this.state.value} in ${parsedClaim.location}, cant Claim`);
        }
    }
    handleChange = (event, index, value) => this.setState({ value });
    render() {console.log(weatherReport);
        return (
            <Paper className="loginContianer" zDepth={1}>
                <h3>Claim for crop damage</h3>
                <div>
                    <SelectField
                        floatingLabelText="Select Commodity"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={'flood'} primaryText="Flood" />
                        <MenuItem value={'drought'} primaryText="Drought" />
                        <MenuItem value={'rain'} primaryText="Heavy Rain" />
                        <MenuItem value={'snow'} primaryText="Heavy Snow Fall" />
                    </SelectField>
                    
                    <RaisedButton onClick={this.claim} label="Claim Now" primary={true} />
                </div>
                <ToastContainer />
                <h4>Total Claim for Damage: {this.state.totalClaim}</h4>
            </Paper>
        );
    }
}
export default ClaimPolicy;