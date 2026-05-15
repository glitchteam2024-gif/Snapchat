const DESTINATION_URL = "https://grippedtrk.co.uk/?F=ggnFF0eDd8mBiv66W6TTvPYSF0vKkW%b&s1=BaggedB58";

function getFirst(value) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function addPassthroughParams(baseUrl, query) {
  let finalUrl = baseUrl;

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
    const value = getFirst(query[param]);

    if (value) {
      const separator = finalUrl.includes("?") ? "&" : "?";
      finalUrl += `${separator}${encodeURIComponent(param)}=${encodeURIComponent(String(value))}`;
    }
  }

  return finalUrl;
}

export default function handler(req, res) {
  const finalUrl = addPassthroughParams(DESTINATION_URL, req.query);

  if (req.query.debug === "1") {
    return res.status(200).json({
      redirectTo: finalUrl
    });
  }

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  return res.redirect(302, finalUrl);
}
