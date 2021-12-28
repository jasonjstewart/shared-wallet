import { 
  Contract, 
  ContractFactory 
} from "ethers"
import { ethers } from "hardhat"

const main = async(): Promise<any> => {
  const SharedWallet: ContractFactory = await ethers.getContractFactory("SharedWallet")
  const sharedWallet: Contract = await SharedWallet.deploy()

  await sharedWallet.deployed()
  console.log(`Shared Wallet deployed to: ${sharedWallet.address}`)
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
