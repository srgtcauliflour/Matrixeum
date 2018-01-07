const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash, splitHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
    this.nonce = 0;
    this.split = this.splitHash
  }

  calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + this.splitHash + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
        this.nonce++;
        this.hash = this.calculateHash();
    }

    console.log("BLOCK MINED: " + this.hash + this.timestamp);
  }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

var matrixRain = new Object({
	canvas: false,
	context: false,
	interval: false,
	fontSize: 0,
	columns: 0,
	rnd: 0,
	chars: 'abcdefghijklmnopqrstuvwxyz0123456789',
	drops: [],
	first: [],
	init: function(idCanvas, size, fps, rnd) {
		this.canvas = document.getElementById(idCanvas);
		this.context = this.canvas.getContext('2d');
		this.canvas.style.background = 'rgb(0, 0, 0)';
		this.fontSize = size;
		this.columns = this.canvas.width / this.fontSize;
		for (var i = 0; i < this.columns; i++) {
			this.drops[i] = this.canvas.height / this.fontSize + 1;
			this.first[i] = '';
		}
		this.rnd = rnd || 0.975;
		clearInterval(this.interval);
		this.interval = setInterval(function() {
			matrixRain.draw();
		}, ((typeof fps === 'undefined') ? 30 : fps) < 0 ? 30 : fps) / 1000;
    },
    
    splitHash: function () {
    return this.split ("")
    }

	hashChar: function() {
		return this.splitHash * this.chars.length;
	},
	draw: function() {
		this.context.fillStyle = 'rgba(0, 0, 0, 0.15)';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.font = this.fontSize + 'px MatrixCode';
		for (var i = 0; i < this.drops.length; i++) {
			this.context.fillStyle = 'rgb(0, 255, 0)';
			this.context.fillText(this.first[i], i * this.fontSize, (this.drops[i] - 1) * this.fontSize);
			this.context.fillStyle = 'rgb(255, 255, 255)';
			this.context.fillText(this.first[i] = this.hashChar(), i * this.fontSize, this.drops[i] * this.fontSize);
			if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > this.rnd)
				this.drops[i] = 0;
			this.drops[i]++;
		}
	}
});
let TestBuck = new Blockchain();
console.log('Mining block 1...');
TestBuck.addBlock(new Block(1, "20/07/2017", { amount: 100 }));

console.log('Mining block 2...');
TestBuck.addBlock(new Block(2, "20/07/2017", { amount: 500 }));