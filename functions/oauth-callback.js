const { Router } = require('express');
const fetch = require('node-fetch');

const app = Router();

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new URLSearchParams({ client_id, client_secret, code })
  });
  const { access_token } = await tokenRes.json();

  // Redirect back to Decap CMS with the token
  res.redirect(`/admin/?access_token=${access_token}`);
});

module.exports = app;
