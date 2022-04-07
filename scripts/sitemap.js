const fs = require("fs");
const globby = require("globby");
const axios = require("axios");

const NEXT_JS_STUDY_DOMAIN = "https://next-js-study-five.vercel.app";
const getDate = new Date().toISOString();

async function generateSiteMap() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const posts = res.data;

  const postList = `
        ${posts
          .map((post) => {
            return `
              <url>
                <loc>${`${NEXT_JS_STUDY_DOMAIN}/posts/${post.id}`}</loc>
                <lastmod>${getDate}</lastmod>
              </url>`;
          })
          .join("")}
      `;

  const pages = await globby([
    "./pages/*.tsx",
    "!./pages/_*.tsx",
    "!./pages/**/[id].js",
    "!./pages/api",
  ]);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset 
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
          ${pages
            .map((page) => {
              const regex = /(.\/pages\/)|(src)|(.js)|(.tsx)|(.md)|(index)/gi;
              const route = page.replace(regex, "");
              return `
                      <url>
                          <loc>${`${NEXT_JS_STUDY_DOMAIN}/${route}`}</loc>
                          <lastmod>${getDate}</lastmod>
                      </url>
                  `;
            })
            .join("")} 
           ${postList}
      </urlset>
  `;

  fs.writeFileSync("./public/sitemap.xml", sitemap, "utf8");
}

generateSiteMap();
