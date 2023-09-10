export const getTimeStamp = () => {
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5.5 hours)
  const istTime = new Date(Date.now() + istOffset);
  return istTime;
};

export const sanatizedUser = (user) => {
  return { _id: user._id, email: user.email, name: user.name };
};
export const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  console.log(token)
  return token;
};

const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

export const expirationDate = new Date(Date.now() + oneWeekInMilliseconds);

