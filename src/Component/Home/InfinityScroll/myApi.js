var myApi = {};

myApi.foo = function (req, que) {
  if (req.query.param1 == "1") {
    req.json({ result: "you done said 1" });
  } else {
    req.json({ result: "you don't said 1" });
  }
};
