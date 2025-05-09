import User from "../models/user.model.js";  // <-- Also add .js if needed!

const userSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Basic input validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists." });
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password, // Assume password is hashed in pre-save middleware
    });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
};

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const token = await User.matchPasswordAndGenerateToken(email, password); // Should throw if invalid

    return res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(401).json({ error: "Invalid email or password." });
  }
};

export  {userSignup, userSignin}; // <-- Use 'export default'
