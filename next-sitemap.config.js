// next-sitemap.config.js
module.exports = {
    siteUrl: "https://www.chuzol.org/",
    generateRobotsTxt: true,
    exclude: [
        "/admin",
        "/admin/*",
        "/admin-guide",
        "/cart",
        "/checkout",
        "/checkout/*",
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin/", "/checkout/", "/cart"],
            },
        ],
    },
};
