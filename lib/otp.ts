export function generateOTP(length = 6) {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpExpiry(minutes = 10) {
  return new Date(Date.now() + minutes * 60000);
}
