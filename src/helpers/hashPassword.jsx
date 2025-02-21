import bcrypt from "bcryptjs";
const hashPassword = async (password) => {
  const salt = "$2b$10$em5jhARB8MEhi4SbIsNvvu";
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
export default hashPassword;
