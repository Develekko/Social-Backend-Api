import bcrypt from 'bcryptjs';
export const Hash = (plaintext) => {
  const hashResult = bcrypt.hashSync(
    plaintext,
    parseInt(process.env.SALT_ROUNDS)
  );
  return hashResult;
};
export const compare = ({ plaintext, hash } = {}) => {
  const match = bcrypt.compareSync(plaintext, hash);
  return match;
};