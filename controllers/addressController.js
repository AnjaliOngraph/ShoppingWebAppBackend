const Address = require("../models/addressSchema");

exports.createAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.findAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const addressExist = await Address.find({ UserId: id });
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
  const { id } = req.params;

  try {
    await Address.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
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
  try {
    
    await Address.findByIdAndDelete({_id:req.params.id})
    res.status(201).send("done")
    
  } catch (error) {
    console.log(error);
  }
};
