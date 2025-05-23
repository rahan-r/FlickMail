const LoginDetail = require("../models/LoginDetails");

const addLoginDetail = async (req, res) => {
  try {
    const {
      flickuserId,
      token,
      verifiedAt,
      identityType,
      identityValue,
      ip,
      timezone,
    } = req.body;

    if (
      !flickuserId ||
      !token ||
      !verifiedAt ||
      !identityType ||
      !identityValue ||
      !ip ||
      !timezone
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const loginDetail = await LoginDetail.create({
      flickuserId,
      token,
      verifiedAt: new Date(verifiedAt),
      identityType,
      identityValue,
      ip,
      timezone,
    });

    res.status(201).json({
      success: true,
      message: "User added to database",
    });
  } catch (error) {
    console.error("Error in addLoginDetail:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add login detail",
      error: error.message,
    });
  }
};

const checkUserExists = async (req, res) => {
  try {
    const { flickuserId } = req.params;

    if (!flickuserId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    const user = await LoginDetail.findOne({ flickuserId });

    if (user) {
      return res.status(200).json({
        success: true,
        message: "User exists",
      });
    }

    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  } catch (error) {
    console.error("Error in checkUserExists:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addLoginDetail,
  checkUserExists,
};
