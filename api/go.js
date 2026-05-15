const OFFER_URL = "https://grippedtrk.co.uk/?F=ggnFF0eDd8mBiv66W6TTvPYSF0vKkW%25b";

// Change this depending on what your affiliate network uses.
// Common options: subid, s1, aff_sub, aff_sub1, sub1
const SUBID_PARAM = "subid";

const LINK_MAP = {
  "1": "Sxmmy",
  "2": "BaggedB58",
  "3": "Creator3",
  "4": "Creator4",
  "5": "Creator5"
};

export default function handler(req, res) {
  const { code } = req.query;

  const cleanCode = String(code || "")
    .replace(/[^0-9]/g, "")
    .slice(0, 10);

  const subid = LINK_MAP[cleanCode];

  if (!subid) {
    return res.status(404).send("Link not found.");
  }

  const destination = new URL(OFFER_URL);

  // Main affiliate tracking SubID
  destination.searchParams.set(SUBID_PARAM, subid);

  // Optional: also pass the simple public code
  destination.searchParams.set("link_id", cleanCode);

  // Preserve ad tracking parameters
  const passthroughParams = [
    "ScCid",
    "sccid",
    "fbclid",
    "ttclid",
    "gclid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term"
  ];

  for (const param of passthroughParams) {
    const value = req.query[param];
    if (value) {
      destination.searchParams.set(param, String(value));
    }
  }

  res.setHeader("Cache-Control", "no-store, max-age=0");

  return res.redirect(302, destination.toString());
}
