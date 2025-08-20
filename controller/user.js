const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.register = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "Email already registered" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashed, isAdmin });
    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: "Invalid credentials" });

    const token = auth.createAccessToken(user);
    res.status(200).send({ access: token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};