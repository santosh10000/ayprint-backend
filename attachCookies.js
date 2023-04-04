export const attachCookies = ({ res, token }) => {
  const oneDay = 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: true,
    sameSite: "none",
  });
};
