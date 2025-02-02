const login = async (req, res) => {
  try {
    // ... your existing login logic ...

    // Generate token with proper payload
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      "secret key",
      { expiresIn: "2h" } // Add expiration time
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        // ... other user data
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

module.exports = { login };
