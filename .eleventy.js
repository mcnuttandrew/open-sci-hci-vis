const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");

module.exports = function (eleventyConfig) {
  // Actually write passthrough files (style.css, assets, robots.txt) to dist during
  // `--serve` too; Eleventy 3 otherwise only emulates them from src in dev.
  eleventyConfig.setServerPassthroughCopyBehavior("copy");

  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "/robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "/assets" });
  eleventyConfig.addPlugin(inclusiveLangPlugin);

  // Collection for year pages
  eleventyConfig.addCollection("year", (collection) => {
    return collection.getFilteredByGlob("src/year/*.md");
  });

  // Get current year data for index page
  eleventyConfig.addGlobalData("currentYear", () => {
    const currentYear = new Date().getFullYear() + 1;
    return currentYear;
  });

  // Root-relative -> page-relative path, so links work when dist is opened
  // directly (file://) or deployed under a subpath (e.g. /open-sci-hci-vis/).
  eleventyConfig.addFilter("relativeTo", (target, pageUrl) => {
    const depth = pageUrl.split("/").filter(Boolean).length;
    const prefix = depth === 0 ? "./" : "../".repeat(depth);
    return prefix + target.replace(/^\/+/, "");
  });

  // Create permalink structure for year pages
  eleventyConfig.addFilter("yearPermalink", (page) => {
    const year = page.fileSlug;
    return `/years/${year}/`;
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
