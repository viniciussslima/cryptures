const { getCrypture } = require("../../../helpers");

module.exports = async (req, res) => {
  const { cryptureId } = req.params;
  try {
    res.send(await getCrypture(cryptureId));
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
