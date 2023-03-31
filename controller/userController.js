import { attachCookies } from "../attachCookies.js";
import BadRequestError from "../errors/bad-request.js";
import { User } from "../models/User.js";

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({
      username,
      password,
    });
    await user.save();
    console.log(`success`);
    res.status(200).send({ success: true, msg: `User created successfully` });
  } catch (error) {
    console.log(error);

    res.status(400).send({ msg: `some error occured` });
  }
};

// const loginUser = async (req, res) => {
//   const { username, password } = req.body;
//   console.log(username, password);

//   if (!username || !password) {
//     res.status(401).send({ msg: `Please provide both credentials` });
//   }

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res
//         .status(401)
//         .send({ success: false, msg: `Invalid credentials, please try again` });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).send({ success: false, msg: `Invalid password` });
//     }

//     const token = await user.createJWT();
//     console.log(token);
//     attachCookies({ res, token });
//     res
//       .status(200)
//       .json({ success: true, msg: `User authenticated!`, user: username });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ msg: error });
//   }
// };
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
      return res.status(401).send({ msg: `Please provide both credentials!` });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .send({
          success: false,
          msg: `Invalid credentials, please try again!`,
        });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, msg: `Invalid password, please try again!!` });
    }

    const token = await user.createJWT();
    console.log(token);
    attachCookies({ res, token });
    res
      .status(200)
      .json({ success: true, msg: `User authenticated!`, user: username });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ msg: "Something went wrong, please try again later." });
  }
};

export { registerUser, loginUser };
