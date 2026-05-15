const OFFER_BASE = "https://grippedtrk.co.uk/?F=ggnFF0eDd8mBiv66W6TTvPYSF0vKkW%25b";

const LINK_MAP = {
  "1": "Sxmmy",
  "2": "BaggedB58",
  "3": "Creator3",
  "4": "Creator4",
  "5": "Creator5"
};

export default function handler(req, res) {
  const code = String(req.query.code || "")
    .replace(/[^0-9]/g, "")
    .slice(0, 10);

  const subid = LINK_MAP[code];

  if (!subid) {
    return res.status(404).send("Link not found.");
  }

  let redirectUrl = `${OFFER_BASE}&s1=${encodeURIComponent(subid)}`;

  // Optional click ID passthrough
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
      redirectUrl += `&${encodeURIComponent(param)}=${encodeURIComponent(String(value))}`;
    }
  }

  // Debug mode: visit /1?debug=1 to see final link without redirecting
  if (req.query.debug === "1") {
    return res.status(200).json({
      code,
      subid,
      redirectTo: redirectUrl
    });
  }

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  return res.redirect(302, redirectUrl);
}
