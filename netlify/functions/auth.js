const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    const code = event.queryStringParameters.code;
    const client_id = process.env.GITHUB_CLIENT_ID;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;

    if (!code) {
      console.error("Missing code in query params");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing code" }),
      };
    }

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("GitHub error:", data.error, data.error_description);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

