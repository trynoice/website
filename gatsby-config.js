const name = "Noice";
const tagline = "Natural calming noise";

/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  trailingSlash: "never",
  siteMetadata: {
    name: name,
    tagline: tagline,
    description: "Relax and improve focus with natural calming noise.",
    twitter: "@trynoice",
    siteUrl:
      (process.env.CONTEXT === "production"
        ? process.env.URL
        : process.env.DEPLOY_PRIME_URL) || "http://localhost:8000",
    playstoreUrl:
      "https://play.google.com/store/apps/details?id=com.github.ashutoshgngwr.noice",
    fdroidUrl:
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
    "gatsby-plugin-offline",
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
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
  ],
};
