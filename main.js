const SHA256= require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class Blockchain{
	constructor(){
		this.chain=[this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0, "01/01/2017", "Genesis Block","0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length -1];
	}

	addBlock(newBlock){
		newBlock.previousHash=this.getLatestBlock().hash;
		newBlock.hash=newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}

let masterCoin = new Blockchain();
masterCoin.addBlock(new Block(1, "02/01/2017", {amount:4}));
masterCoin.addBlock(new Block(2, "10/01/2017", {amount:10}));

console.log(JSON.stringify(masterCoin, null, 4));