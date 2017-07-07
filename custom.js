$(window).on('load', function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        $('#content').text('I has web3!!!');
        window.web3 = new Web3(web3.currentProvider);
    } else {
        $('#content').text('I doesn\'t has web3 :(')
        console.log('No web3? You should consider trying MetaMask!')
    }

  // Now you can start your app & access web3 freely:

  // do whatever you want to here!

});
