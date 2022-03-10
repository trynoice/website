const name = "Noice: Natural calming noise";
const short_name = "Noice";

/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    name: name,
    short_name: short_name,
    description: "Relax and boost productivity with minimal background noise.",
    twitter: "@trynoice",
    site_url: "https://trynoice.com",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: name,
        short_name: short_name,
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
        isUsingColorMode: false,
      },
    },
  ],
};
