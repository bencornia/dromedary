function getProduct(req, res) {
  res.send({ message: "got a product" });
}

function postProduct(req, res) {
  res.send({ message: "posted a product" });
}

function putProduct(req, res) {
  res.send({ message: "updated a product" });
}

function deleteProduct(req, res) {
  res.send({ message: "deleted a product" });
}

module.exports = {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
