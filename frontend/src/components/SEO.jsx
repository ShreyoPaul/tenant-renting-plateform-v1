import { Helmet } from "react-helmet-async";

const DEFAULT_TITLE = "Rommate — Verified Student Rentals & Roommate Finder in Kolkata";
const DEFAULT_DESCRIPTION =
  "Rommate helps students find verified rentals and roommate-friendly accommodations near top Kolkata universities. Discover safe, affordable college housing with curated listings and easy booking.";
const DEFAULT_KEYWORDS =
  "student housing Kolkata, student accommodation, roommate finder, verified listings, college rentals, shared apartments, student flats, property search";
const DEFAULT_IMAGE = "/logostart.png";
const DEFAULT_URL = "https://rommate.in";

function buildAbsoluteUrl(path) {
  if (!path) return DEFAULT_URL;
  if (path.startsWith("http")) return path;
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
  }
  return `${DEFAULT_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function SEO({
  title,
  description,
  url,
  image,
  keywords,
  type = "website",
  canonical,
}) {
  const pageTitle = title ? `${title}` : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const pageUrl = canonical || url || (typeof window !== "undefined" ? window.location.href : DEFAULT_URL);
  const pageImage = buildAbsoluteUrl(image || DEFAULT_IMAGE);
  const pageKeywords = keywords || DEFAULT_KEYWORDS;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    url: pageUrl,
    description: pageDescription,
  };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={buildAbsoluteUrl(pageUrl)} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={buildAbsoluteUrl(pageUrl)} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:alt" content="Rommate student housing platform" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:url" content={buildAbsoluteUrl(pageUrl)} />

      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
}
