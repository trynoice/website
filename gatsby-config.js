const name = "Noice";
const tagline = "Natural calming noise";
const siteUrl =
  (process.env.CONTEXT === "production"
    ? process.env.URL
    : process.env.DEPLOY_PRIME_URL) || "http://localhost:8000";

/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  trailingSlash: "never",
  siteMetadata: {
    name: name,
    tagline: tagline,
    description: "Focus, meditate and relax with natural calming noise.",
    twitter: "@trynoice",
    siteUrl: siteUrl,
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=com.github.ashutoshgngwr.noice",
    fDroidUrl:
      "https://f-droid.org/en/packages/com.github.ashutoshgngwr.noice/",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `${name}: ${tagline}`,
        short_name: name,
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#23232d",
        display: "browser",
        icon: "src/assets/icon-round.png",
        crossOrigin: "anonymous",
      },
    },
    "gatsby-plugin-emotion",
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
      },
    },
    "gatsby-plugin-anchor-links",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".md", ".mdx"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              isIconAfterHeader: true,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/redirect"],
        serialize: ({ path }) => {
          return {
            url: path,
            priority: 1,
          };
        },
      },
    },
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: siteUrl,
      },
    },
  ],
};
