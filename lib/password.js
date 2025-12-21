// Password hashing and verification utility
// Uses bcryptjs for secure password hashing

import bcrypt from 'bcryptjs'

// Hash password
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10)
}

// Compare password
export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash)
}

