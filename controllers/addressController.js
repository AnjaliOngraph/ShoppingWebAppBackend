const Address = require("../models/addressSchema");

exports.createAddress = async (req, res) => {
  try {
    const { id } = req.user;
    let details = req.body;
    details.UserId = id;
    details.setDeleted = false;

    const address = await Address.create(details);

    console.log(address);
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.findAddress = async (req, res) => {
  const { id } = req.user;

  try {
    const addressExist = await Address.find({ UserId: id ,setDeleted:false});
    
    if (addressExist) {
      res.status(201).json(addressExist);
      
      console.log("Address exists");
    } else {
      console.log("no Address");
      res.status(401).json("no adress");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateAddress = async (req, res) => {
  const { id1 } = req.params;

  const { id } = req.user;
  let details = req.body;
  details.UserId = id;

  try {
    await Address.findByIdAndUpdate(
      { _id: id1 },
      { $set: details },
      { new: true },
      function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log("result", result);
        res.status(201).json(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const details = await Address.findByIdAndUpdate({ _id: id },{setDeleted : true});
    console.log(details, "details");
    res.status(201).json(details);
  } catch (error) {
    console.log(error);
  }
};
