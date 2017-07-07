$(window).on('load', function() {
    var contractAddress = "0x57b005EffEd29DFE55EAC92A6833E5328787eD83"; // in Rinkeby testnet!
    var contractAbi = [{"constant":false,"inputs":[{"name":"s","type":"string"}],"name":"setGreeting","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getGreeting","outputs":[{"name":"s","type":"string"}],"payable":false,"type":"function"}];

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        $('#content').text('I has web3!!!');
        window.web3 = new Web3(web3.currentProvider);
    } else {
        $('#content').text('I doesn\'t has web3 :( Please open in Google Chrome Browser and install the Metamask extension.');
        console.log('No web3? You should consider trying MetaMask!');
        return;
    }
    var contractInstance = web3.eth.contract(contractAbi).at(contractAddress);
    contractInstance.getGreeting(function(error, greeting) {
        if (error) {
            $('#content').text('error: ' + error);
            console.log('error: ' + error);
            return;
        }
        $('#content').text('greeting from contract: ' + greeting);
    });

});
