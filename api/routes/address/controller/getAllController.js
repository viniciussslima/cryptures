const { cryptureContract } = require("../../../ether");
const { getCrypture } = require("../../../helpers");

module.exports = async (req, res) => {
  const { address } = req.params;
  try {
    let qty = await cryptureContract.balanceOf(address);
    qty = qty.toNumber();
    let ids = [];
    for (let i = 0; i < qty; i++) {
      ids.push(
        (await cryptureContract.tokenOfOwnerByIndex(address, i)).toNumber()
      );
    }

    let cryptures = [];
    for (id of ids) {
      cryptures.push(await getCrypture(id));
    }

    return res.send(cryptures);
  } catch (err) {
    console.log(err);
  }
};
