const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =====================================================
// EMAIL VALIDATION
// =====================================================

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// =====================================================
// GENERATE JWT TOKEN
// =====================================================

const generateToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

// =====================================================
// REGISTER
// =====================================================

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Name, email and password are required",
      });
    }

    // Name validation
    const cleanName = name.trim();

    if (cleanName.length < 2) {
      return res.status(400).json({
        message:
          "Name must be at least 2 characters",
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters",
      });
    }

    // Normalize email
    const normalizedEmail = email
      .trim()
      .toLowerCase();

    // Email validation
    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        message:
          "Please provide a valid email address",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Unable to create account",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // Create user
    const user = await User.create({
      name: cleanName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(
      user._id.toString()
    );

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// =====================================================
// LOGIN
// =====================================================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // -------------------------------------------------
    // REQUIRED FIELDS
    // -------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }

    // -------------------------------------------------
    // NORMALIZE EMAIL
    // -------------------------------------------------

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    // -------------------------------------------------
    // FIND USER
    // -------------------------------------------------

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    // -------------------------------------------------
    // INVALID USER
    // -------------------------------------------------

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // -------------------------------------------------
    // COMPARE PASSWORD
    // -------------------------------------------------

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    // -------------------------------------------------
    // INVALID PASSWORD
    // -------------------------------------------------

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // -------------------------------------------------
    // GENERATE TOKEN
    // -------------------------------------------------

    const token = generateToken(
      user._id.toString()
    );

    // -------------------------------------------------
    // RESPONSE
    // -------------------------------------------------

    return res.json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  register,
  login,
};