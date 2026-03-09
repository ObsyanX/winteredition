## SEO Optimization Plan for Sayan Dutta Portfolio

### What needs to be changed

**1. `index.html**` — The most impactful file for SEO:

- Update `<title>` to the optimized version with primary keywords up front
- Update `<meta name="description">` to the 150–160 char version with natural keyword inclusion
- Update all Open Graph tags (`og:title`, `og:description`, `og:url`) with the correct Vercel URL
- Add Twitter card metadata (`twitter:creator`, `twitter:site`)
- Fix `<link rel="canonical">` to point to the correct production URL (`https://sayan-dutta-portfolio.vercel.app/`)
- Add `<meta name="robots" content="index, follow">` (explicit, no noindex)
- Add JSON-LD structured data (`Person` schema) with real GitHub/LinkedIn URLs, job title, description, and location
- Add `<meta name="keywords">` (already exists, expand with secondary keywords)
- Add `<meta name="geo.region">`, `<meta name="geo.placename">` for India/Siliguri geo signals

**2. `public/robots.txt**` — Update to include Sitemap directive:

```
User-agent: *
Allow: /
Sitemap: https://sayan-dutta-portfolio.vercel.app/sitemap.xml
```

**3. `public/sitemap.xml**` — Create new file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sayan-dutta-portfolio.vercel.app/</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**4. `src/components/editions/AboutSection.tsx**` — Improve heading and copy for on-page SEO:

- Change `<h2>Get to Know Me</h2>` to `<h2>About Sayan Dutta</h2>` — direct name signal in H2
- Update bio paragraphs to naturally include "Sayan Dutta" 2–3 times as per the brief (currently uses only "I")
- Profile image already has correct alt text `"Sayan Dutta - Full-Stack Developer portrait"` ✓

**5. `src/components/editions/HeroSection.tsx**` — H1 SEO:

- Currently H1 is `"Designing intelligent, human-centric digital experiences."` — this is visually strong but has zero name signal
- Add a visually hidden (sr-only) `<h1>` OR make the existing name display semantically the H1
- Strategy: Wrap the role badge span in an `<h1>` that is visually consistent but contains "Sayan Dutta – Software Developer & AI Developer" as screen-reader text via `<span className="sr-only">`

**6. `src/components/editions/Footer.tsx**` — Minor:

- Update copyright year to 2026
- Already contains "Sayan Dutta" in footer copy ✓

### Files to modify


| File                                       | Change                                                                |
| ------------------------------------------ | --------------------------------------------------------------------- |
| `index.html`                               | Title, meta description, OG tags, canonical URL, JSON-LD, robots meta |
| `public/robots.txt`                        | Add Sitemap directive                                                 |
| `public/sitemap.xml`                       | Create new file                                                       |
| `src/components/editions/AboutSection.tsx` | H2 heading + bio copy with name                                       |
| `src/components/editions/HeroSection.tsx`  | Add sr-only H1 with name for SEO                                      |
| `src/components/editions/Footer.tsx`       | Copyright year 2026                                                   |


### What will NOT change

- No visual design changes
- No copy changes visible to users (except About bio minor wording)
- No layout or color changes
- No component structure changes

### Technical SEO notes

- JSON-LD uses real social profile URLs (`github.com/sayandutta`, `linkedin.com/in/sayandutta`)
- Canonical points to the correct Vercel URL
- `robots` meta set to `index, follow` explicitly
- Sitemap references homepage with correct `lastmod` and `priority`
- Geo tags signal India location for regional relevance

# 1️⃣ Google Search Console Verification (Add in `<head>`)

Replace `YOUR_VERIFICATION_CODE` after adding the site in Google Search Console.

```
<!-- Google Search Console Verification -->
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE">
```

---

# 2️⃣ Improved Canonical Tag

Make sure **only one canonical tag exists**.

```
<!-- Canonical URL -->
<link rel="canonical" href="https://sayan-dutta-portfolio.vercel.app/">
```

---

# 3️⃣ WebSite Structured Data (Add Below Person Schema)

```
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@type": "WebSite",
 "name": "Sayan Dutta Portfolio",
 "url": "https://sayan-dutta-portfolio.vercel.app/",
 "author": {
   "@type": "Person",
   "name": "Sayan Dutta"
 }
}
</script>
```

---

# 4️⃣ Improved Person Schema (Replace Existing JSON-LD)

```
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@type": "Person",
 "name": "Sayan Dutta",
 "url": "https://sayan-dutta-portfolio.vercel.app/",
 "image": "https://sayan-dutta-portfolio.vercel.app/profile.jpg",
 "jobTitle": "Software Developer",
 "nationality": "Indian",
 "description": "Sayan Dutta is a software developer specializing in AI, machine learning, and full stack web development.",
 "knowsAbout": [
   "Artificial Intelligence",
   "Machine Learning",
   "Full Stack Development",
   "Software Development",
   "Web Development"
 ],
 "sameAs": [
   "https://github.com/sayandutta",
   "https://linkedin.com/in/sayandutta"
 ]
}
</script>
```

Replace the **GitHub and LinkedIn URLs** if necessary.

---

# 5️⃣ Preconnect Performance Optimization

Add inside `<head>`.

```
<!-- Performance Optimization -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

This improves **Core Web Vitals and loading speed**.

---

# 6️⃣ Favicon SEO

Add these if not present.

```
<!-- Favicon -->
<link rel="icon" href="/favicon.ico">

<!-- Apple Devices -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

---

# 7️⃣ Accessibility + SEO H1 (Hero Section)

Add **hidden SEO heading**.

```
<h1 class="sr-only">
Sayan Dutta – Software Developer & AI Developer Portfolio
</h1>
```

This allows:

- Strong SEO signal
- No visual change
- Better accessibility

---

# 8️⃣ Improved About Section Copy

Replace the current paragraph with this:

```
Sayan Dutta is a software developer focused on building intelligent and scalable digital products. Specializing in artificial intelligence, machine learning, and full-stack web development, Sayan Dutta creates modern applications that combine strong engineering principles with user-centered design. This portfolio showcases the projects, technical expertise, and development journey of Sayan Dutta.
```

---

# 9️⃣ Footer SEO Signal

Update footer text:

```
<p>© 2026 Sayan Dutta. Built and maintained by Sayan Dutta.</p>
```

---

# 🔟 robots.txt (Final Version)

```
User-agent: *
Allow: /

Sitemap: https://sayan-dutta-portfolio.vercel.app/sitemap.xml
```

---

# 1️⃣1️⃣ sitemap.xml (Improved Version)

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://sayan-dutta-portfolio.vercel.app/</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

</urlset>
```