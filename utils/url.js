// To avoid redirect loop to the this site this function
// checks if redirect url is equal to destination url and
// returns true if matches to avoid too many redirects
const checkForUrlConflicts = async url => {
  const publicWebsiteURL = process.env.NEXT_PUBLIC_WEBSITE_URL;

  // Construct URL objects
  const source = new URL(url);
  const destination = new URL(publicWebsiteURL);

  return source.hostname === destination.hostname;
};

export default checkForUrlConflicts;
