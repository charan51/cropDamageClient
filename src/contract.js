import web3 from './web3';

const address = '0xD6ba6ad018522298c5E10E4bCab5163ba7f24F82';
const abi = [{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"","type":"string"}],"name":"CallForRegister","type":"event","signature":"0x88c929d44dd361a8cc7beb8f147eaf8cd6f81ea902560f1dc8c0a861d4c0466d"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"","type":"string"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"RejectUserRegister","type":"event","signature":"0x2170080589ca98b8e645870d763d313b40a6db3ff418b68e7417538245c1eb2b"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"","type":"string"}],"name":"claimPolicyStatus","type":"event","signature":"0x759e72c010f1995439cf4ff5b311edcd3fa53f581687028941951777a0b0dab5"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"","type":"string"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"sendCropAnyalsis","type":"event","signature":"0x773a42446e69bab2ff03525ce04f3f673f9482c245e0bbebb3b135b8c9379b9a"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"verifyKissanNumber","type":"event","signature":"0xca7905099327cbd1712e2b1eff5aa6a39f788fbd49a97cf85e1e1997c74a0ed5"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_location","type":"string"},{"internalType":"uint256","name":"_kissanNumber","type":"uint256"}],"name":"addFarmer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xe4f5f01c"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_location","type":"string"},{"internalType":"uint256","name":"_kissanNumber","type":"uint256"}],"name":"addUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x964f5937"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xf851a440"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_kissanNumber","type":"uint256"},{"internalType":"uint256","name":"_acers","type":"uint256"},{"internalType":"uint256","name":"_premium","type":"uint256"},{"internalType":"string","name":"_location","type":"string"}],"name":"buyPolicy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x9efb5797"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_kissanNumber","type":"uint256"},{"internalType":"string","name":"_reason","type":"string"},{"internalType":"uint256","name":"_claimCost","type":"uint256"}],"name":"claimForDamage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x965cd21e"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"elements","outputs":[{"internalType":"address payable","name":"farmer","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"location","type":"string"},{"internalType":"uint256","name":"kisanNumber","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xe0d64b37"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_kissanNumber","type":"uint256"}],"name":"returnClaimDetails","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"enum FarmerRegister.Status","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x893688e2"},{"constant":true,"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"verifyFarmer","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xb3b819ca"}];
export default new web3.eth.Contract(abi, address);