function getUser(req, res) {
  res.send({ message: "got a user" });
}

function postUser(req, res) {
  res.send({ message: "posted a user" });
}

function putUser(req, res) {
  res.send({ message: "updated a user" });
}

function deleteUser(req, res) {
  res.send({ message: "deleted a user" });
}

module.exports = { getUser, postUser, putUser, deleteUser };
