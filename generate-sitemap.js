const fs = require("fs");
const path = require("path");

// Folder containing your HTML files
const siteRoot = "C:/TheBicycleShop"; // change "public" to your folder name
const baseUrl = "https://thebicycleshop.com"; // replace with your domain

function walk(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walk(filepath, filelist);
    } else if (file.endsWith(".html")) {
      const relativePath = path.relative(siteRoot, filepath);
      const url = `${baseUrl}/${relativePath.replace(/\\/g, "/")}`;
      filelist.push(url);
    }
  });
  return filelist;
}

const urls = walk(siteRoot);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap);
console.log("✅ Sitemap generated with", urls.length, "URLs");