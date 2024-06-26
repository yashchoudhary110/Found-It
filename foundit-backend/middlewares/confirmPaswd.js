const conpassword = (req, res, next) =>{
  if (req.body.cpassword !== req.body.password) {
    res.status(401).send({error:"Please enter the password and confirm password same"});
    return;
  }
  try {
    next();
  } catch (error) {
    res.status(401).send({error:"Please enter the password and confirm password same"});
  }
}

module.exports = conpassword;