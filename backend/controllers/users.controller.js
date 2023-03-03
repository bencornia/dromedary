function getUser(req, res) {
  res.send({ message: "got a user" });
}

module.exports = { getUser };
