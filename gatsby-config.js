/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: "Noice: Natural calming noise",
    description: "Relax and boost productivity with minimal background noise.",
    twitterUsername: "@trynoice",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Noice: Natural calming noise",
        short_name: "Noice",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#23232d",
        display: "browser",
        icon: "src/assets/favicon.png",
        crossOrigin: "anonymous",
      },
    },
    "gatsby-plugin-offline",
  ],
};
