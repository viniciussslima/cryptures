const { ethers } = require("ethers");

const manager = require("../contracts/manager.json");
const cryptures = require("../contracts/cryptures.json");

const RequestBattle = require("../models/BattleRequest");

const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner(process.env.API_ETHERIUM_ADDRESS);

const managerAbi = manager.abi;
const managerContract = new ethers.Contract(
  process.env.MANAGER_CONTRACT_ADDRESS,
  managerAbi,
  provider
).connect(signer);

const cryptureAbi = cryptures.abi;
const cryptureContract = new ethers.Contract(
  process.env.CRYPTURE_CONTRACT_ADDRESS,
  cryptureAbi,
  provider
).connect(signer);

managerContract.on(
  "BattleRequested",
  async (requested, requester, cryptureId, cherishAmount) => {
    const requestBattle = await RequestBattle.findOneAndDelete({
      requester: requested,
    });

    if (requestBattle) {
      // Processar e informar o resultado
      if (Math.random() > 0.5) {
        await managerContract.battleResult(requested, requester);
      } else {
        await managerContract.battleResult(requester, requested);
      }
    } else {
      await RequestBattle.create({
        requested,
        requester,
        cryptureId,
        cherishAmount,
      });
    }
  }
);

module.exports = {
  managerContract,
  cryptureContract,
};
