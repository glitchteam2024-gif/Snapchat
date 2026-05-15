export function GET(request) {
  const url = new URL(request.url);

  // Gets SubID from /r/Sxmmy or from ?subid=Sxmmy
  let subid = url.searchParams.get("subid") || "unknown";

  // Clean SubID so nobody can inject weird characters
  subid = subid.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 60);

  // Your real affiliate offer URL
  const destination = new URL("https://YOUR-AFFILIATE-OFFER-LINK-HERE.com");

  // Change this key if your affiliate network uses s1, aff_sub, sub1, etc.
  destination.searchParams.set("subid", subid);

  // Optional: pass through tracking params from ads
  const passthroughParams = [
    "fbclid",
    "ttclid",
    "gclid",
    "utm_source",
    "utm_campaign",
    "utm_content",
    "utm_medium"
  ];

  for (const param of passthroughParams) {
    const value = url.searchParams.get(param);
    if (value) destination.searchParams.set(param, value);
  }

  return Response.redirect(destination.toString(), 302);
}
