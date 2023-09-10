import crypto from 'crypto';
import { promisify } from 'util';

const pbkdf2Async = promisify(crypto.pbkdf2);;//for async await syntax

export const generateHash = async (password, salt = null) => {
  if (!salt) {
    salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
  }

  const iterations = 10000;
  const keyLength = 64;
  const hashAlgorithm = 'sha512';

  const derivedKey = await pbkdf2Async(
    password,
    salt,
    iterations,
    keyLength,
    hashAlgorithm
  );

  const hashedPassword = derivedKey.toString('hex');

  return {
    salt: salt,
    hash: hashedPassword,
  };
};

export const validatePassword = async (password, storedHash, salt) => {
    var derivedKey =await pbkdf2Async(password, salt, 10000, 64, 'sha512')
    const hashVerify =derivedKey.toString('hex');
    // *. When comparing the hashed values, it's possible that the promise returned by pbkdf2Async is being compared directly, leading to unexpected results.
    return storedHash.toString() === hashVerify.toString();
};
