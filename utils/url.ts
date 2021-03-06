import { name, version } from '../package.json';
/**
 * To avoid redirect loop to the this site this function checks if redirect url
 * is equal to destination url and returns true if matches to avoid too many redirects.
 * @param {string} url
 */
const checkForUrlConflicts = async (url: string) => {
  const publicWebsiteURL: string = process.env.NEXT_PUBLIC_WEBSITE_URL;

  // Construct URL objects
  const source = new URL(url);
  const destination = new URL(publicWebsiteURL);

  return source.hostname === destination.hostname;
};

/**
 * Checks if a url is malicious, using Google's safe browsing API.
 * @param {string} url
 */
const checkForMaliciousURL = async (url: string) => {
  const baseURL: string =
    'https://safebrowsing.googleapis.com/v4/threatMatches:find';
  const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_SAFE_BROWSING_API_KEY;

  /**
   * Fetch the latest threat lists from Google
   * Returns an object with three arrays containing:
   * threatTypes, platformTypes and threatEntryTypes
   */
  const {
    threatTypes,
    platformTypes,
    threatEntryTypes,
  } = await getSafeBrowsingLists();

  const config: object = {
    client: {
      clientId: name,
      clientVersion: version,
    },
    threatInfo: {
      threatTypes,
      platformTypes,
      threatEntryTypes,
      threatEntries: [{ url }],
    },
  };

  try {
    const res = await fetch(`${baseURL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    const data = await res.json();

    /**
     * Check if the response object contains the 'matches' key
     * return true if it does, otherwise return false;
     */
    const isMalicious: boolean = 'matches' in data ? true : false;

    return isMalicious;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetches the latest safe browsing lists from Google.
 */
const getSafeBrowsingLists = async () => {
  const baseURL: string = 'https://safebrowsing.googleapis.com/v4/threatLists';
  const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_SAFE_BROWSING_API_KEY;

  try {
    const res = await fetch(`${baseURL}?key=${API_KEY}`, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    const { threatLists } = await res.json();
    const threatTypes: string[] = threatLists.map(item => item.threatType);
    const platformTypes: string[] = threatLists.map(item => item.platformType);
    const threatEntryTypes: string[] = threatLists.map(
      item => item.threatEntryType
    );

    /** Remove duplicates with 'new Set()' and return an object containing the lists */
    return {
      threatTypes: [...new Set(threatTypes)],
      platformTypes: [...new Set(platformTypes)],
      threatEntryTypes: [...new Set(threatEntryTypes)],
    };
  } catch (error) {
    console.error(error);
  }
};

export { checkForUrlConflicts, checkForMaliciousURL };
