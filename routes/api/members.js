const express = require("express");
const router = express.Router();
const members = require("../../Members.js");
const uuid = require("uuid");

//__ get all members__
//routes here are just / because base path /api/members is specified in app.use
router.get("/", (req, res) => {
  res.json(members);
});

//___ get single member__
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No Member with id of ${req.params.id} ` });
  }
});

//------ add new member---------
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    country: req.body.country,
  };
  if (!newMember.name || !newMember.country) {
    return res.status(400).json({ msg: "Missing info" });
  }

  members.push(newMember);
  res.redirect("/")
  // res.send(
  //   `New member ${newMember.name} with id# ${newMember.id} added succesfully!`
  // );
});

//-----update member------
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.country = updateMember.country
          ? updateMember.country
          : member.country;
        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No Member with id of ${req.params.id} ` });
  }
});

//----- delete member-------
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member deleted",
      "Current members": members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `No Member with id of ${req.params.id} ` });
  }
});

module.exports = router;
