// Simple authentication module
const bcrypt = require('bcrypt');

// Password validation configuration
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REQUIREMENTS = {
  minLength: PASSWORD_MIN_LENGTH,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true
};

/**
 * Validates password against security requirements
 * @param {string} password - The password to validate
 * @returns {object} - {valid: boolean, errors: string[]}
 */
function validatePassword(password) {
  const errors = [];

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`);
  }

  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (PASSWORD_REQUIREMENTS.requireNumber && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (PASSWORD_REQUIREMENTS.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Hash a password using bcrypt
 * @param {string} password - The password to hash
 * @returns {Promise<string>} - The hashed password
 */
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Verify a password against a hash
 * @param {string} password - The plain text password
 * @param {string} hash - The hashed password to compare against
 * @returns {Promise<boolean>} - True if password matches
 */
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

/**
 * Login function with password validation
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {object} - Login result with token and user info
 */
function login(username, password) {
  if (!username || !password) {
    throw new Error('Missing credentials');
  }

  // Validate password meets security requirements
  const validation = validatePassword(password);
  if (!validation.valid) {
    throw new Error(`Password validation failed: ${validation.errors.join(', ')}`);
  }

  // In a real app, you would:
  // 1. Look up the user in the database
  // 2. Verify the password against the stored hash using verifyPassword()
  // 3. Generate a proper JWT token

  return {
    token: 'fake-token-' + Math.random().toString(36).substr(2),
    user: username
  };
}

module.exports = {
  login,
  validatePassword,
  hashPassword,
  verifyPassword,
  PASSWORD_REQUIREMENTS
};
