import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import locationList from './constants/location';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@material-ui/core/Typography';
import web3 from './web3';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import contract from './contract';
class BuyPolicy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            acers: '',
            location: '',
            premiumCost: '',
            commodityPrice: '',
            claimDetails: [],
        };
    }
    handleChange = (event, index, value) => this.setState({ value });
    getUserDetails = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount = async () => {
        const policyNum = localStorage.getItem('policyNumber');
        if (policyNum) {
            const accounts = await web3.eth.getAccounts();
            const blockNum = await web3.eth.getBlockNumber();

            const claimDetails = await contract.methods.returnClaimDetails(policyNum).call();
            console.log(claimDetails);
            this.setState({
                claimDetails: claimDetails,
                blockNum: blockNum
            });
        }
    }
    calculate = () => {
        const hasValue = locationList.filter(word => word == this.state.location);
        let commodity;
        switch (this.state.value) {
            case 'rice':
                commodity = 50;
                break;
            case 'Cardamom':
                commodity = 120;
                break;
            case 'Vegetables':
                commodity = 30;
                break;
            case 'sugarcane':
                commodity = 80;
                break;
            case 'Wheat':
                commodity = 60;
                break;
        }
        this.setState({
            commodityPrice: commodity
        });
        if (hasValue.length > 0) {
            const premiumCost = (commodity * this.state.acers) / (this.state.acers / 2);
            this.setState({
                premiumCost: premiumCost
            });
        } else {
            toast.error("We do not support that location yet!!!");
        }
    }
    payPremium = async () => {
        const policyNum = localStorage.getItem('policyNumber');
        const accounts = await web3.eth.getAccounts();
        const register = await contract.methods.buyPolicy(policyNum, this.state.acers, this.state.premiumCost, this.state.location).send({ from: accounts[0], value: this.state.premiumCost });
        const eventListen = await contract.events.claimPolicyStatus({ fromBlock: this.state.blockNum + 1, toBlock: 'latest' }, (err, event) => {
            
            toast.error(event.returnValues[0]);
        });
        const claim = {
            policy: policyNum,
            location: this.state.location,
            acers: this.state.acers,
            commodity: this.state.commodityPrice,
            premiumCost: this.state.premiumCost
        }
        console.log(claim);
        localStorage.setItem(policyNum, JSON.stringify(claim));
    }
    render() {
        return (
            <Paper className="loginContianer" zDepth={1}>
                <h3>Buy crop damage policy</h3>
                <div>
                    <SelectField
                        floatingLabelText="Select Commodity"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={'rice'} primaryText="Rice 50Rs" />
                        <MenuItem value={'Cardamom'} primaryText="Cardamom 120Rs" />
                        <MenuItem value={'Vegetables'} primaryText="Vegetables 30Rs" />
                        <MenuItem value={'sugarcane'} primaryText="sugarcane 80Rs" />
                        <MenuItem value={'Wheat'} primaryText="Wheat 60Rs" />
                    </SelectField>
                    <TextField
                        name="acers"
                        type="number"
                        onChange={this.getUserDetails}
                        hintText="Enter number of acers"
                    />
                    <TextField
                        name="location"
                        onChange={this.getUserDetails}
                        hintText="enter your Location"
                    />
                    <RaisedButton onClick={this.calculate} label="Calculate Premium" primary={true} />
                </div>
                <ToastContainer />
                <h4>Total Premium: {this.state.premiumCost}</h4>
                <RaisedButton onClick={this.payPremium} label="Pay" primary={true} />
                {this.state.claimDetails[3] === "0" ?
                    <Card style={{ 'marginTop': '40px' }}>
                        <CardContent>
                            <Typography variant="h3" color="textSecondary" gutterBottom>
                                Claim Status Details
        </Typography>
                            <Typography variant="h5" component="h2">
                                Premium : {this.state.claimDetails[0]}

                            </Typography>
                            <Typography variant="h5" component="h2">
                                Location : {this.state.claimDetails[1]}

                            </Typography>
                            <Typography variant="h5" component="h2">
                                Acers : {this.state.claimDetails[2]}

                            </Typography>
                            <Typography variant="h5" component="h2">
                                Claim Status : {this.state.claimDetails[3] == 0 && 'Active'}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Policy Already exists
        </Typography>
                        </CardContent>
                    </Card>
                    : <Card style={{ 'marginTop': '40px' }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                No Policy Activated, Please buy new policy
        
                        </Typography>
                        </CardContent>
                    </Card>
                }
            </Paper>
        );
    }
}
export default BuyPolicy;