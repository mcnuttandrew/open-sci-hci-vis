const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");

module.exports = function (eleventyConfig) {
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
