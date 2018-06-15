$(window).on('load', function() {
    
    var contractAddress = "0x9112f6759f24db5a641d356aaf9053b67e85e79c"; // on Ropsten testnet!
    var contractAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "newGreeting",
				"type": "string"
			}
		],
		"name": "setGreeting",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "greeting",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getGreeting",
		"outputs": [
			{
				"name": "g",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "string"
			}
		],
		"name": "GotGreeting",
		"type": "event"
	}
];

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        $('#content').text('I has web3!!!');
        window.web3 = new Web3(web3.currentProvider);
    } else {
        var errorMsg = 'I doesn\'t has web3 :( Please open in Google Chrome Browser and install the Metamask extension.';
        $('#content').text(errorMsg);
        console.log(errorMsg);
        return;
    }
    
    // create instance of contract object that we use to interface the smart contract
    var contractInstance = web3.eth.contract(contractAbi).at(contractAddress);
	
    // get last greeting on page load by calling the `view` function `getGreeting`
    contractInstance.getGreeting(function(error, greeting) {
        if (error) {
            var errorMsg = 'error reading greeting from smart contract: ' + error;
            $('#content').text(errorMsg);
            console.log(errorMsg);
            return;
        }
        $('#content').text('greeting from contract: ' + greeting);
    });
    
    // use HTML form with submit button to write data into the blockchain
    $('#my-form').on('submit', function(e) {
        e.preventDefault(); // cancel the actual submit
        var newGreeting = $('#greeting').val(); // read data that we want to write into the blockchain

	// here we write into the blockchain
        contractInstance.setGreeting(newGreeting, function(error, txHash) {
            if (error) {
                var errorMsg = 'error writing new greeting to smart contract: ' + error;
                $('#content').text(errorMsg);
                console.log(errorMsg);
                return;
            }
            $('#content').text('submitted new greeting to blockchain, transaction hash: ' + txHash);
        });
    });

    // on page load we query all past events and write them to a text 
    contractInstance.GotGreeting({}, { fromBlock: 0, toBlock: 'latest' }).watch(function(error, data) {
	console.log('got event!');
	if (error)
	    console.log('Error in event handler: ' + error);
	else {
	    console.log('got event data: ' + data);
	    $('#pastGreetings').append(JSON.stringify(data));
	}
    });

});

function cb(error, response) {
    // callback as helper function for debugging purposes
    console.log('error: ' + error + ', response: ' + response);
}
