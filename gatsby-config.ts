import { execSync } from "child_process";
import type { GatsbyConfig } from "gatsby";

const name = "Noice";
const tagline = "Natural calming noise";
const siteUrl =
  (process.env.CONTEXT === "production"
    ? process.env.URL
    : process.env.DEPLOY_PRIME_URL) || "http://localhost:8000";

const config: GatsbyConfig = {
  graphqlTypegen: true,
  jsxRuntime: "automatic",
  trailingSlash: "never",
  siteMetadata: {
    name: name,
    tagline: tagline,
    description:
      "Customisable soundscapes with Noice - Create personalised ambient atmospheres by blending various sounds and adjusting volume levels.",
    twitter: "@trynoice",
    siteUrl: siteUrl,
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=com.github.ashutoshgngwr.noice",
  },
  plugins: [
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
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
      },
    },
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          quality: 90,
        },
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-image",
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
        excludes: ["/redirect", "/preset", "/sign-in"],
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
          allMdx {
            nodes {
              internal {
                contentFilePath
              }
              fields {
                slug
              }
              frontmatter {
                publishedAt
                updatedAt
              }
            }
          }
        }`,
        resolvePages: ({
          allSitePage: { nodes: sitePages },
          allMdx: { nodes: mdxPages },
        }: any) => {
          const pageLastMods: { [path: string]: string | null } = {};
          let blogLastMod: string | null = null;
          let faqsLastMod: string | null = null;
          mdxPages.forEach((page: any) => {
            let lastMod = page.fields.updatedAt || page.fields.publishedAt;
            const filePath = page.internal.contentFilePath;
            if (filePath) {
              lastMod = getLastModifiedTime(filePath) || lastMod;
            }

            pageLastMods[`/${page.fields.slug}`] = lastMod;
            if (page.fields.slug.startsWith("blog/")) {
              blogLastMod =
                blogLastMod && blogLastMod > lastMod ? blogLastMod : lastMod;
            }

            if (page.fields.slug.startsWith("faqs/")) {
              faqsLastMod =
                faqsLastMod && faqsLastMod > lastMod ? faqsLastMod : lastMod;
            }
          });

          pageLastMods["/blog"] = blogLastMod;
          pageLastMods["/faqs"] = faqsLastMod;
          pageLastMods["/"] = getLastModifiedTime(
            `${__dirname}/src/pages/index.tsx`
          );

          return sitePages.map((page: any) => {
            return { path: page.path, lastMod: pageLastMods[page.path] };
          });
        },
        serialize: ({ path, lastMod }: any) => {
          return {
            url: path,
            lastmod: lastMod,
            priority: path.startsWith("/blog/")
              ? 0.9
              : path.startsWith("/faqs/")
              ? 0.8
              : 1.0,
            changefreq:
              path.startsWith("/blog/") || path.startsWith("/faqs/")
                ? "monthly"
                : path === "/blog" || path === "/faqs"
                ? "daily"
                : "weekly",
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

export default config;

function getLastModifiedTime(path: string): string | null {
  try {
    return execSync(`git log -1 --pretty=format:%aI -- ${path}`).toString();
  } catch (error) {
    return null;
  }
}
