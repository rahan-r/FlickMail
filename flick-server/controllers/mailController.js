const axios = require("axios");
const {
  generateRandomPassword,
  generateRandomString,
} = require("../utils/helpers");

const BASE_URL = process.env.MAIL_API_URL || "https://api.mail.tm";

const getActiveDomains = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/domains`);
    const activeAccounts = [];

    for (const domain of response.data["hydra:member"].filter(
      (domain) => domain.isActive
    )) {
      const randomPrefix = generateRandomString();
      const email = `${randomPrefix}@${domain.domain}`;
      const password = generateRandomPassword();

      try {
        const accountResponse = await axios.post(`${BASE_URL}/accounts`, {
          address: email,
          password: password,
        });

        if (accountResponse.status === 201) {
          activeAccounts.push({
            user: email,
            pwd: password,
            account: accountResponse.data,
          });
        }
      } catch (error) {
        console.error(
          `Failed to create account for ${email}:`,
          error.response?.data || error.message
        );
      }
    }
    return activeAccounts;
  } catch (error) {
    console.error("Error fetching domains:", error);
    throw error;
  }
};

const createAccounts = async (req, res) => {
  try {
    const accounts = await getActiveDomains();
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching domains:", error.message || error);
    res.status(500).json({
      message: "Failed to fetch domains",
      error: error.message || "Unknown error",
    });
  }
};

const refreshMessages = async (req, res) => {
  try {
    const { address, password } = req.body;

    if (!address || !password) {
      return res.status(400).json({
        message: "User and password are required in request body",
      });
    }

    const tokenResponse = await axios.post(`${BASE_URL}/token`, {
      address,
      password,
    });

    if (!tokenResponse.data.token) {
      return res.status(401).json({
        message: "Failed to authenticate",
      });
    }

    const messagesResponse = await axios.get(`${BASE_URL}/messages`, {
      headers: {
        Authorization: `Bearer ${tokenResponse.data.token}`,
      },
    });

    res.status(200).json({
      jwtToken: tokenResponse.data.token,
      messages: messagesResponse.data,
    });
  } catch (error) {
    console.error("Error in refresh:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: "Failed to refresh messages",
      error: error.response?.data?.message || error.message,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authorization token is required",
      });
    }
    if (!messageId) {
      return res.status(400).json({
        message: "Message ID is required",
      });
    }
    const messageResponse = await axios.get(
      `${BASE_URL}/messages/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status(200).json(messageResponse.data);
  } catch (error) {
    console.error(
      "Error fetching message:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      message: "Failed to fetch message",
      error: error.response?.data?.message || error.message,
    });
  }
};

const healthCheck = (req, res) => {
  res.send("<h1>Flick Running</h1>");
};

module.exports = {
  createAccounts,
  healthCheck,
  refreshMessages,
  getMessage,
};
