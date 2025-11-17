// Simple authentication module
// TODO: Add password validation - security requirement!

function login(username, password) {
  if (!username || !password) {
    throw new Error('Missing credentials');
  }

  // No password validation - security gap!
  return {
    token: 'fake-token-' + Math.random().toString(36).substr(2),
    user: username
  };
}

module.exports = { login };
