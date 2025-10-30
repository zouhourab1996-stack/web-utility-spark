import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schema?: string | object;
}

const SEO = ({ title, description, keywords, canonical, ogImage, schema }: SEOProps) => {
  const baseUrl = "https://zouhourab1996-stack.github.io/web-utility-spark";
  const fullTitle = title.includes("Smart Tools Hub") ? title : `${title} | Smart Tools Hub`;
  const defaultImage = `${baseUrl}/og-image.png`;
  
  // Support custom OG images per page/tool
  const imageUrl = ogImage ? (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`) : defaultImage;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Copyright & Security */}
      <meta name="copyright" content="© 2025 Smart Tools Hub. All rights reserved." />
      <meta name="author" content="Smart Tools Hub" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="rating" content="general" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Smart Tools Hub" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@SmartToolsHub" />
      <meta name="twitter:creator" content="@SmartToolsHub" />
      
      {/* Additional SEO & PWA */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="application-name" content="Smart Tools Hub" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Smart Tools Hub" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {typeof schema === 'string' ? schema : JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
