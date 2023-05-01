import otpGenerator from "otp-generator";
export const otp = () => {
  return otpGenerator.generate(parseInt(process.env.OTP_DIGETS), {
    digits: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: false,
  });
};
