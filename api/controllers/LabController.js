module.exports = {
  getParts: function (req, res) {
    console.log("i am here");
    sails.models.jobs456.find().exec(function (err, result) {
      if (err) {
        console.log("inside err");
        res.status(500).send(err);
        //        res.send(500, { error: "Database Error" });
      }
      console.log("going for results");
      res.send(result);
    });
  },
  getPartsByNameID: function (req, res) {
    console.log(
      "inside getpartsbyid" +
        "-----------" +
        req.query.jobName +
        " ----- " +
        req.query.partID
    );
    sails.models.jobs456
      .find({ jobName: req.query.jobName, partID: req.query.partID })
      .exec(function (err, result) {
        if (err) {
          res.send(500, { error: "Database Error" });
        }
        res.view("pages/viewData", { parts: result });
      });
  },
  addParts: function (req, res) {
    var jobName = req.body.jobName;
    var pID = req.body.partID;
    var quantity = req.body.qty;
    console.log("for post we will fetch");
    sails.models.jobs456
      .find({ jobName: jobName, partID: pID })
      .exec(function (err, result) {
        if (err) {
          res.send(500, { error: "Database Error" });
        }
        if (result == "") {
          sails.models.jobs456
            .create({ jobName: jobName, partID: pID, qty: quantity })
            .exec(function (err) {
              if (err) {
                res.send(500, { error: "Database Error" });
              }

              sails.models.jobs456.find().exec(function (err, result) {
                if (err) {
                  console.log("inside err");
                  res.status(500).send(err);
                  //        res.send(500, { error: "Database Error" });
                }
                console.log("going for results");
                //                res.send(result);
                res.redirect("/viewData");
              });
            });
        } else
          res
            .status(404)
            .send(
              "Job with with jobName: " +
                jobName +
                ", partId: " +
                pID +
                " already exists"
            );
      });
  },
  updateParts: function (req, res) {
    var jobName = req.body.jobName;
    var pID = req.body.partID;
    var quantity = req.body.qty;
    console.log("update --" + req.body);
    sails.models.jobs456
      .find({ jobName: jobName, partID: pID })
      .exec(function (err, result) {
        if (err) {
          res.send(500, { error: "Database Error" });
        }
        if (result != "") {
          console.log(result);
          sails.models.jobs456
            .update({ jobName: jobName, partID: pID })
            .set({ qty: quantity })
            .exec(function (err) {
              if (err) {
                res.send(500, { error: "Database Error" });
              }

              res.redirect("/viewData");
            });
        } else
          res
            .status(404)
            .send(
              "Job with with jobName: " +
                jobName +
                ", partId: " +
                pID +
                " doesn't exists"
            );
      });
  },

  viewData: function (req, res) {
    sails.models.jobs456.find().exec(function (err, result) {
      if (err) {
        console.log("inside err");
        res.status(500).send("Cannot find anything to show!");
        //        res.send(500, { error: "Database Error" });
      }
      console.log("going for results");
      //res.send(result);
      res.view("pages/viewData", { parts: result });
    });
  },
};
