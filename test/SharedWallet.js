// THESE TEST ARE NOT COMPLETE, THEY WERE ONLY USED IN TESTING THE CODE IN AN INFORMAL WAY


// test/Airdrop.js
// Load dependencies
const { expect } = require('chai');
const { assert } = require('console');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const Web3 = require('web3');
const SharedWalletAbi = require("/Users/jstewart/Documents/jason/interview/artifacts/contracts/SharedWallet.sol/SharedWallet.json")

const OWNER_ADDRESS = ethers.utils.getAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
const SECOND_ADDRESS = "0x7b4198529994b0dc604278c99d153cfd069d594753d471171a1d102a10438e07";;
// let wallet = new ethers.Wallet(SECOND_ADDRESS);

// const provider = new ethers.providers.JsonRpcProvider(
//     "http://localhost:9650/ext/bc/C/rpc"
//   );

///////////////////////////////////////////////////////////
// SEE https://hardhat.org/tutorial/testing-contracts.html
// FOR HELP WRITING TESTS
// USE https://github.com/gnosis/mock-contract FOR HELP
// WITH MOCK CONTRACT
///////////////////////////////////////////////////////////

// Start test block
describe('SharedWallet', function () {
    before(async function () {
        this.SharedWallet = await ethers.getContractFactory("SharedWallet");
        // this.MockContract = await ethers.getContractFactory("contracts/SharedWallet.sol:SharedWallet");
    });

    beforeEach(async function () {
        this.sharedWallet = await this.SharedWallet.deploy()
        await this.sharedWallet.deployed()
    });

    // Test cases

    //////////////////////////////
    //       Constructor 
    //////////////////////////////
    describe("Constructor", function () {
        it('make sure owner is sender', async function () {
            // If another contract calls balanceOf on the mock contract, return AMT
            const owner = await this.sharedWallet.getOwner();
            expect(owner).to.equal(OWNER_ADDRESS)
        });
    });

    //////////////////////////////
    //  setRemainderDestination 
    //////////////////////////////
    describe("deposit funds", function () {
        it('check if deposit works', async function (){
            const funds = 100000000
            await this.sharedWallet.deposit({value: funds});
            const balance = await this.sharedWallet.getBalance(OWNER_ADDRESS);
            expect(balance).to.equal(funds);
        }),
        it('check if fails on not enough blocks before withdrawl', async function (){
            const funds = 100000000
            const tx = await this.sharedWallet.deposit({value: funds});
            const balance = await this.sharedWallet.getBalance(OWNER_ADDRESS);
            expect(balance).to.equal(funds);
            const withdrawn = await this.sharedWallet.withdraw(funds);
            const blockNumber = await this.sharedWallet.getBlockNumber(OWNER_ADDRESS);

            expect(blockNumber.toNumber()+2).lessThan(withdrawn.blockNumber)
        }),
        // it('check if withdraw works', async function (){
        //     const funds = 100000000
        //     var tx = await this.sharedWallet.deposit(funds, {value: funds});
        //     const balance = await this.sharedWallet.getBalance(OWNER_ADDRESS);
        //     tx = await this.sharedWallet.deposit(funds, {value: funds});
        //     const blockNumber = await this.sharedWallet.getBlockNumber(OWNER_ADDRESS)
        //     console.log(blockNumber);
        //     console.log(tx.blockNumber)
        //     var count=1;
        //     while (blockNumber > tx.blockNumber-2){
        //         tx = await this.sharedWallet.deposit(funds, {value: funds});
        //         count++;
        //     }
        //     console.log(count)
        //     var totalBalance = await this.sharedWallet.getTotalBalance();
        //     console.log(totalBalance)
        //     const withdrawn = await this.sharedWallet.withdraw(funds*(count+5));
        //     console.log("WITHDRAWN")
        //     console.log(withdrawn)
        //     totalBalance = await this.sharedWallet.getTotalBalance();
        //     console.log(totalBalance)
        // }),
        it('check withdraw all funds works', async function (){
            const funds = 100000000
            await this.sharedWallet.deposit({value: funds});
            const balance = await this.sharedWallet.getBalance(OWNER_ADDRESS);
            expect(balance).to.equal(funds);
            const emerencyfunds = await this.sharedWallet.emergencyWithdrawAllFunds();
            console.log(emerencyfunds);
            const totalFunds = await this.sharedWallet.getTotalBalance();
            expect(totalFunds).to.equal(0)
        })
    });

    
});