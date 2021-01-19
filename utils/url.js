// Checks if redirect url is equal to destination url
// Returns true if matches too avoid too many redirects
const checkForUrlConflicts = async (url, short_code) => {
  const publicWebsiteURL = process.env.NEXT_PUBLIC_WEBSITE_URL;

  // Construct URL objects
  const sourceURL = new URL(`${url}`);
  const destinationURL = new URL(`${publicWebsiteURL}/${short_code}`);

  // Removing query params from urls
  const source = `${sourceURL.origin}${sourceURL.pathname}`;
  const destination = `${destinationURL.origin}${destinationURL.pathname}`;

  return source === destination;
};

export default checkForUrlConflicts;
