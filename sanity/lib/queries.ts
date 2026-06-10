import { defineQuery } from "next-sanity";

/* All queries project Sanity documents into the exact shapes the components
   already consume (legacy SiteContent / ServicePage contracts), localized via
   the internationalized-array pattern:
     coalesce(field[language == $lang][0].value, field[language == "nl"][0].value, "")
   Queries are fully written out (no string-building) so TypeGen can analyze
   them statically. */

export const HOME_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings"][0]{
    "nav": {
      "filosofie": coalesce(nav.filosofie[language == $lang][0].value, nav.filosofie[language == "nl"][0].value, ""),
      "uitvaart": coalesce(nav.uitvaart[language == $lang][0].value, nav.uitvaart[language == "nl"][0].value, ""),
      "portret": coalesce(nav.portret[language == $lang][0].value, nav.portret[language == "nl"][0].value, ""),
      "huwelijk": coalesce(nav.huwelijk[language == $lang][0].value, nav.huwelijk[language == "nl"][0].value, ""),
      "werk": coalesce(nav.werk[language == $lang][0].value, nav.werk[language == "nl"][0].value, ""),
      "contact": coalesce(nav.contact[language == $lang][0].value, nav.contact[language == "nl"][0].value, "")
    },
    "contact": {
      "overline": coalesce(contactSection.overline[language == $lang][0].value, contactSection.overline[language == "nl"][0].value, ""),
      "title": coalesce(contactSection.title[language == $lang][0].value, contactSection.title[language == "nl"][0].value, ""),
      "body": coalesce(contactSection.body[language == $lang][0].value, contactSection.body[language == "nl"][0].value, ""),
      "callBtn": coalesce(contactSection.callBtn[language == $lang][0].value, contactSection.callBtn[language == "nl"][0].value, ""),
      "mailBtn": coalesce(contactSection.mailBtn[language == $lang][0].value, contactSection.mailBtn[language == "nl"][0].value, ""),
      "callHref": coalesce("tel:" + business.phone, ""),
      "mailHref": coalesce("mailto:" + business.email, ""),
      "lines": [
        {
          "k": coalesce(contactSection.phoneLabel[language == $lang][0].value, contactSection.phoneLabel[language == "nl"][0].value, ""),
          "v": coalesce(business.phoneDisplay, ""),
          "href": coalesce("tel:" + business.phone, "")
        },
        {
          "k": coalesce(contactSection.emailLabel[language == $lang][0].value, contactSection.emailLabel[language == "nl"][0].value, ""),
          "v": coalesce(business.email, ""),
          "href": coalesce("mailto:" + business.email, "")
        },
        {
          "k": coalesce(contactSection.studioLabel[language == $lang][0].value, contactSection.studioLabel[language == "nl"][0].value, ""),
          "v": coalesce(business.streetAddress + ", " + business.postalCode + " " + business.city, ""),
          "href": ""
        },
        {
          "k": coalesce(contactSection.instagramLabel[language == $lang][0].value, contactSection.instagramLabel[language == "nl"][0].value, ""),
          "v": coalesce(business.instagramHandle, ""),
          "href": coalesce(business.instagramUrl, "")
        }
      ]
    },
    "foot": {
      "tagline": coalesce(footer.tagline[language == $lang][0].value, footer.tagline[language == "nl"][0].value, ""),
      "navTitle": coalesce(footer.navTitle[language == $lang][0].value, footer.navTitle[language == "nl"][0].value, ""),
      "contactTitle": coalesce(footer.contactTitle[language == $lang][0].value, footer.contactTitle[language == "nl"][0].value, ""),
      "legalTitle": coalesce(footer.legalTitle[language == $lang][0].value, footer.legalTitle[language == "nl"][0].value, ""),
      "legal": [
        coalesce(coalesce(footer.vatLabel[language == $lang][0].value, footer.vatLabel[language == "nl"][0].value) + " " + business.vatNumber, ""),
        coalesce(business.bankName + " " + business.iban, "")
      ],
      "rights": coalesce(footer.rights[language == $lang][0].value, footer.rights[language == "nl"][0].value, ""),
      "made": coalesce(footer.made[language == $lang][0].value, footer.made[language == "nl"][0].value, "")
    },
    "ui": {
      "railWork": coalesce(ui.railWork[language == $lang][0].value, ui.railWork[language == "nl"][0].value, ""),
      "railServices": coalesce(ui.railServices[language == $lang][0].value, ui.railServices[language == "nl"][0].value, ""),
      "railProcess": coalesce(ui.railProcess[language == $lang][0].value, ui.railProcess[language == "nl"][0].value, ""),
      "showcaseHeading": coalesce(ui.showcaseHeading[language == $lang][0].value, ui.showcaseHeading[language == "nl"][0].value, ""),
      "serviceCta": coalesce(ui.serviceCta[language == $lang][0].value, ui.serviceCta[language == "nl"][0].value, ""),
      "themeLabel": coalesce(ui.themeLabel[language == $lang][0].value, ui.themeLabel[language == "nl"][0].value, "")
    },
    "business": {
      "siteName": coalesce(business.siteName, "Milo Weiler"),
      "jobTitle": coalesce(business.jobTitle[language == $lang][0].value, business.jobTitle[language == "nl"][0].value, ""),
      "streetAddress": coalesce(business.streetAddress, ""),
      "postalCode": coalesce(business.postalCode, ""),
      "city": coalesce(business.city, ""),
      "countryCode": coalesce(business.countryCode, "BE"),
      "phone": coalesce(business.phone, ""),
      "phoneDisplay": coalesce(business.phoneDisplay, ""),
      "email": coalesce(business.email, ""),
      "instagramUrl": coalesce(business.instagramUrl, ""),
      "instagramHandle": coalesce(business.instagramHandle, ""),
      "vatNumber": coalesce(business.vatNumber, ""),
      "areaServed": coalesce(business.areaServed, []),
      "geo": business.geo,
      "priceRange": business.priceRange
    }
  },
  "home": *[_type == "homePage"][0]{
    "hero": {
      "overline": coalesce(hero.overline[language == $lang][0].value, hero.overline[language == "nl"][0].value, ""),
      "title": [
        coalesce(hero.titleLine1[language == $lang][0].value, hero.titleLine1[language == "nl"][0].value, ""),
        coalesce(hero.titleLine2[language == $lang][0].value, hero.titleLine2[language == "nl"][0].value, "")
      ],
      "sub": coalesce(hero.sub[language == $lang][0].value, hero.sub[language == "nl"][0].value, ""),
      "cue": coalesce(hero.cue[language == $lang][0].value, hero.cue[language == "nl"][0].value, ""),
      "cta": coalesce(hero.cta[language == $lang][0].value, hero.cta[language == "nl"][0].value, "")
    },
    "philosophy": {
      "overline": coalesce(philosophy.overline[language == $lang][0].value, philosophy.overline[language == "nl"][0].value, ""),
      "pull": coalesce(philosophy.pull[language == $lang][0].value, philosophy.pull[language == "nl"][0].value, ""),
      "lead": coalesce(philosophy.lead[language == $lang][0].value, philosophy.lead[language == "nl"][0].value, ""),
      "body": coalesce(philosophy.body[language == $lang][0].value, philosophy.body[language == "nl"][0].value, ""),
      "indexOverline": coalesce(philosophy.indexOverline[language == $lang][0].value, philosophy.indexOverline[language == "nl"][0].value, "")
    },
    "process": {
      "overline": coalesce(process.overline[language == $lang][0].value, process.overline[language == "nl"][0].value, ""),
      "title": coalesce(process.title[language == $lang][0].value, process.title[language == "nl"][0].value, ""),
      "note": coalesce(process.note[language == $lang][0].value, process.note[language == "nl"][0].value, ""),
      "steps": coalesce(process.steps[]{
        "no": coalesce(no, ""),
        "name": coalesce(name[language == $lang][0].value, name[language == "nl"][0].value, ""),
        "text": coalesce(text[language == $lang][0].value, text[language == "nl"][0].value, "")
      }, [])
    },
    "work": {
      "overline": coalesce(work.overline[language == $lang][0].value, work.overline[language == "nl"][0].value, ""),
      "title": coalesce(work.title[language == $lang][0].value, work.title[language == "nl"][0].value, ""),
      "note": coalesce(work.note[language == $lang][0].value, work.note[language == "nl"][0].value, ""),
      "frames": coalesce(work.frames[]{
        "stock": coalesce(tag, ""),
        "meta": coalesce(meta[language == $lang][0].value, meta[language == "nl"][0].value, ""),
        "corner": coalesce(corner, ""),
        image{
          asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } },
          hotspot,
          crop,
          "alt": coalesce(alt[language == $lang][0].value, alt[language == "nl"][0].value, "")
        }
      }, [])
    },
    "closing": {
      "overline": coalesce(closing.overline[language == $lang][0].value, closing.overline[language == "nl"][0].value, ""),
      "statement": coalesce(closing.statement[language == $lang][0].value, closing.statement[language == "nl"][0].value, ""),
      "sub": coalesce(closing.sub[language == $lang][0].value, closing.sub[language == "nl"][0].value, "")
    }
  },
  "services": *[_type == "service"] | order(order asc){
    "key": coalesce(slug.current, ""),
    "no": coalesce(number, ""),
    "name": coalesce(name[language == $lang][0].value, name[language == "nl"][0].value, ""),
    "note": coalesce(note[language == $lang][0].value, note[language == "nl"][0].value, ""),
    "fig": [
      coalesce(indexFigLabel[language == $lang][0].value, indexFigLabel[language == "nl"][0].value, ""),
      coalesce(indexFigCorner, "")
    ],
    "overline": coalesce(landing.overline[language == $lang][0].value, landing.overline[language == "nl"][0].value, ""),
    "kicker": coalesce(landing.kicker[language == $lang][0].value, landing.kicker[language == "nl"][0].value, ""),
    "title": coalesce(landing.title[language == $lang][0].value, landing.title[language == "nl"][0].value, ""),
    "why": coalesce(landing.why[language == $lang][0].value, landing.why[language == "nl"][0].value, ""),
    "bodyTitle": coalesce(landing.bodyTitle[language == $lang][0].value, landing.bodyTitle[language == "nl"][0].value, ""),
    "body": coalesce(landing.paragraphs[]{
      "value": coalesce(text[language == $lang][0].value, text[language == "nl"][0].value, "")
    }, []),
    "specs": coalesce(landing.specs[]{
      "value": coalesce(value[language == $lang][0].value, value[language == "nl"][0].value, "")
    }, []),
    "result": [
      coalesce(landing.resultLabel[language == $lang][0].value, landing.resultLabel[language == "nl"][0].value, ""),
      coalesce(landing.resultValue[language == $lang][0].value, landing.resultValue[language == "nl"][0].value, "")
    ],
    "figures": coalesce(landing.figures[]{
      _key,
      "tag": coalesce(tag, ""),
      "meta": coalesce(meta[language == $lang][0].value, meta[language == "nl"][0].value, ""),
      "corner": coalesce(corner, ""),
      image{
        asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } },
        hotspot,
        crop,
        "alt": coalesce(alt[language == $lang][0].value, alt[language == "nl"][0].value, "")
      }
    }, [])
  }
}`);

export const SERVICE_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings"][0]{
    "nav": {
      "filosofie": coalesce(nav.filosofie[language == $lang][0].value, nav.filosofie[language == "nl"][0].value, ""),
      "uitvaart": coalesce(nav.uitvaart[language == $lang][0].value, nav.uitvaart[language == "nl"][0].value, ""),
      "portret": coalesce(nav.portret[language == $lang][0].value, nav.portret[language == "nl"][0].value, ""),
      "huwelijk": coalesce(nav.huwelijk[language == $lang][0].value, nav.huwelijk[language == "nl"][0].value, ""),
      "werk": coalesce(nav.werk[language == $lang][0].value, nav.werk[language == "nl"][0].value, ""),
      "contact": coalesce(nav.contact[language == $lang][0].value, nav.contact[language == "nl"][0].value, "")
    },
    "contact": {
      "overline": coalesce(contactSection.overline[language == $lang][0].value, contactSection.overline[language == "nl"][0].value, ""),
      "title": coalesce(contactSection.title[language == $lang][0].value, contactSection.title[language == "nl"][0].value, ""),
      "body": coalesce(contactSection.body[language == $lang][0].value, contactSection.body[language == "nl"][0].value, ""),
      "callBtn": coalesce(contactSection.callBtn[language == $lang][0].value, contactSection.callBtn[language == "nl"][0].value, ""),
      "mailBtn": coalesce(contactSection.mailBtn[language == $lang][0].value, contactSection.mailBtn[language == "nl"][0].value, ""),
      "callHref": coalesce("tel:" + business.phone, ""),
      "mailHref": coalesce("mailto:" + business.email, "")
    },
    "foot": {
      "tagline": coalesce(footer.tagline[language == $lang][0].value, footer.tagline[language == "nl"][0].value, ""),
      "navTitle": coalesce(footer.navTitle[language == $lang][0].value, footer.navTitle[language == "nl"][0].value, ""),
      "contactTitle": coalesce(footer.contactTitle[language == $lang][0].value, footer.contactTitle[language == "nl"][0].value, ""),
      "legalTitle": coalesce(footer.legalTitle[language == $lang][0].value, footer.legalTitle[language == "nl"][0].value, ""),
      "legal": [
        coalesce(coalesce(footer.vatLabel[language == $lang][0].value, footer.vatLabel[language == "nl"][0].value) + " " + business.vatNumber, ""),
        coalesce(business.bankName + " " + business.iban, "")
      ],
      "rights": coalesce(footer.rights[language == $lang][0].value, footer.rights[language == "nl"][0].value, ""),
      "made": coalesce(footer.made[language == $lang][0].value, footer.made[language == "nl"][0].value, "")
    },
    "ui": {
      "themeLabel": coalesce(ui.themeLabel[language == $lang][0].value, ui.themeLabel[language == "nl"][0].value, ""),
      "spBack": coalesce(ui.spBack[language == $lang][0].value, ui.spBack[language == "nl"][0].value, ""),
      "navWhy": coalesce(ui.navWhy[language == $lang][0].value, ui.navWhy[language == "nl"][0].value, ""),
      "navHow": coalesce(ui.navHow[language == $lang][0].value, ui.navHow[language == "nl"][0].value, ""),
      "navPiece": coalesce(ui.navPiece[language == $lang][0].value, ui.navPiece[language == "nl"][0].value, ""),
      "navPackages": coalesce(ui.navPackages[language == $lang][0].value, ui.navPackages[language == "nl"][0].value, ""),
      "navFaq": coalesce(ui.navFaq[language == $lang][0].value, ui.navFaq[language == "nl"][0].value, ""),
      "galleryOverline": coalesce(ui.spGalleryOverline[language == $lang][0].value, ui.spGalleryOverline[language == "nl"][0].value, ""),
      "galleryTitle": coalesce(ui.spGalleryTitle[language == $lang][0].value, ui.spGalleryTitle[language == "nl"][0].value, ""),
      "galleryNote": coalesce(ui.spGalleryNote[language == $lang][0].value, ui.spGalleryNote[language == "nl"][0].value, ""),
      "cross": coalesce(ui.spCross[language == $lang][0].value, ui.spCross[language == "nl"][0].value, ""),
      "popular": coalesce(ui.spPopular[language == $lang][0].value, ui.spPopular[language == "nl"][0].value, ""),
      "ask": coalesce(ui.spAsk[language == $lang][0].value, ui.spAsk[language == "nl"][0].value, "")
    },
    "business": {
      "siteName": coalesce(business.siteName, "Milo Weiler"),
      "jobTitle": coalesce(business.jobTitle[language == $lang][0].value, business.jobTitle[language == "nl"][0].value, ""),
      "streetAddress": coalesce(business.streetAddress, ""),
      "postalCode": coalesce(business.postalCode, ""),
      "city": coalesce(business.city, ""),
      "countryCode": coalesce(business.countryCode, "BE"),
      "phone": coalesce(business.phone, ""),
      "phoneDisplay": coalesce(business.phoneDisplay, ""),
      "email": coalesce(business.email, ""),
      "instagramUrl": coalesce(business.instagramUrl, ""),
      "instagramHandle": coalesce(business.instagramHandle, ""),
      "vatNumber": coalesce(business.vatNumber, ""),
      "areaServed": coalesce(business.areaServed, []),
      "geo": business.geo,
      "priceRange": business.priceRange
    }
  },
  "page": *[_type == "service" && slug.current == $slug][0]{
    "svc": coalesce(slug.current, ""),
    "name": coalesce(name[language == $lang][0].value, name[language == "nl"][0].value, ""),
    "hero": coalesce(page.heroVariant, "centered"),
    "crumb": coalesce(page.crumb[language == $lang][0].value, page.crumb[language == "nl"][0].value, ""),
    "head": {
      "overline": coalesce(page.head.overline[language == $lang][0].value, page.head.overline[language == "nl"][0].value, ""),
      "title": [
        coalesce(page.head.titleLine1[language == $lang][0].value, page.head.titleLine1[language == "nl"][0].value, ""),
        coalesce(page.head.titleLine2[language == $lang][0].value, page.head.titleLine2[language == "nl"][0].value, "")
      ],
      "sub": coalesce(page.head.sub[language == $lang][0].value, page.head.sub[language == "nl"][0].value, ""),
      "fig": page.head.fig{
        "tag": coalesce(tag, ""),
        "meta": coalesce(meta[language == $lang][0].value, meta[language == "nl"][0].value, ""),
        "corner": coalesce(corner, ""),
        image{
          asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } },
          hotspot,
          crop,
          "alt": coalesce(alt[language == $lang][0].value, alt[language == "nl"][0].value, "")
        }
      }
    },
    "why": {
      "overline": coalesce(page.why.overline[language == $lang][0].value, page.why.overline[language == "nl"][0].value, ""),
      "lead": coalesce(page.why.lead[language == $lang][0].value, page.why.lead[language == "nl"][0].value, ""),
      "body": coalesce(page.why.paragraphs[]{
        "value": coalesce(text[language == $lang][0].value, text[language == "nl"][0].value, "")
      }, []),
      "pull": coalesce(page.why.pull[language == $lang][0].value, page.why.pull[language == "nl"][0].value, ""),
      "fig": page.why.fig{
        "tag": coalesce(tag, ""),
        "meta": coalesce(meta[language == $lang][0].value, meta[language == "nl"][0].value, ""),
        "corner": coalesce(corner, ""),
        image{
          asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } },
          hotspot,
          crop,
          "alt": coalesce(alt[language == $lang][0].value, alt[language == "nl"][0].value, "")
        }
      }
    },
    "how": {
      "overline": coalesce(page.how.overline[language == $lang][0].value, page.how.overline[language == "nl"][0].value, ""),
      "title": coalesce(page.how.title[language == $lang][0].value, page.how.title[language == "nl"][0].value, ""),
      "note": coalesce(page.how.note[language == $lang][0].value, page.how.note[language == "nl"][0].value, ""),
      "steps": coalesce(page.how.steps[]{
        "no": coalesce(no, ""),
        "name": coalesce(name[language == $lang][0].value, name[language == "nl"][0].value, ""),
        "text": coalesce(text[language == $lang][0].value, text[language == "nl"][0].value, "")
      }, [])
    },
    "piece": {
      "overline": coalesce(page.piece.overline[language == $lang][0].value, page.piece.overline[language == "nl"][0].value, ""),
      "title": coalesce(page.piece.title[language == $lang][0].value, page.piece.title[language == "nl"][0].value, ""),
      "body": coalesce(page.piece.body[language == $lang][0].value, page.piece.body[language == "nl"][0].value, ""),
      "specs": coalesce(page.piece.specs[]{
        "value": coalesce(value[language == $lang][0].value, value[language == "nl"][0].value, "")
      }, []),
      "result": [
        coalesce(page.piece.resultLabel[language == $lang][0].value, page.piece.resultLabel[language == "nl"][0].value, ""),
        coalesce(page.piece.resultValue[language == $lang][0].value, page.piece.resultValue[language == "nl"][0].value, "")
      ],
      "fig": page.piece.fig{
        "tag": coalesce(tag, ""),
        "meta": coalesce(meta[language == $lang][0].value, meta[language == "nl"][0].value, ""),
        "corner": coalesce(corner, ""),
        image{
          asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } },
          hotspot,
          crop,
          "alt": coalesce(alt[language == $lang][0].value, alt[language == "nl"][0].value, "")
        }
      }
    },
    "packages": {
      "overline": coalesce(page.packages.overline[language == $lang][0].value, page.packages.overline[language == "nl"][0].value, ""),
      "title": coalesce(page.packages.title[language == $lang][0].value, page.packages.title[language == "nl"][0].value, ""),
      "note": coalesce(page.packages.note[language == $lang][0].value, page.packages.note[language == "nl"][0].value, ""),
      "priceNote": coalesce(page.packages.priceNote[language == $lang][0].value, page.packages.priceNote[language == "nl"][0].value, ""),
      "items": coalesce(page.packages.items[]{
        _key,
        "name": coalesce(name[language == $lang][0].value, name[language == "nl"][0].value, ""),
        "tagline": coalesce(tagline[language == $lang][0].value, tagline[language == "nl"][0].value, ""),
        "includes": coalesce(includes[]{
          "value": coalesce(value[language == $lang][0].value, value[language == "nl"][0].value, "")
        }, []),
        "featured": featured == true
      }, [])
    },
    "faq": {
      "overline": coalesce(page.faq.overline[language == $lang][0].value, page.faq.overline[language == "nl"][0].value, ""),
      "title": coalesce(page.faq.title[language == $lang][0].value, page.faq.title[language == "nl"][0].value, ""),
      "items": coalesce(page.faq.items[]{
        _key,
        "q": coalesce(q[language == $lang][0].value, q[language == "nl"][0].value, ""),
        "a": coalesce(a[language == $lang][0].value, a[language == "nl"][0].value, "")
      }, [])
    }
  },
  "others": *[_type == "service" && slug.current != $slug] | order(order asc){
    "key": coalesce(slug.current, ""),
    "no": coalesce(number, ""),
    "name": coalesce(name[language == $lang][0].value, name[language == "nl"][0].value, ""),
    "note": coalesce(note[language == $lang][0].value, note[language == "nl"][0].value, ""),
    "fig": [
      coalesce(indexFigLabel[language == $lang][0].value, indexFigLabel[language == "nl"][0].value, ""),
      coalesce(indexFigCorner, "")
    ]
  }
}`);

export const SERVICE_SLUGS_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)]{ "slug": slug.current }
`);

/* Sitemap excludes noindex services (!= true keeps unset/null included,
   matching the page's `seo.noIndex == true` truthiness check). */
export const SITEMAP_SERVICE_SLUGS_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current) && seo.noIndex != true]{ "slug": slug.current }
`);

/* ---- SEO / metadata queries (always fetched with stega: false) -------- */

export const SETTINGS_SEO_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  "siteName": coalesce(business.siteName, "Milo Weiler"),
  "title": coalesce(seo.metaTitle[language == $lang][0].value, seo.metaTitle[language == "nl"][0].value, "Milo Weiler"),
  "description": coalesce(seo.metaDescription[language == $lang][0].value, seo.metaDescription[language == "nl"][0].value, ""),
  "ogImage": seo.ogImage{
    "url": asset->url,
    "alt": coalesce(alt[language == $lang][0].value, alt[language == "nl"][0].value, "")
  },
  "noIndex": seo.noIndex == true
}`);

export const HOME_SEO_QUERY = defineQuery(`*[_type == "homePage"][0]{
  "title": coalesce(
    seo.metaTitle[language == $lang][0].value,
    seo.metaTitle[language == "nl"][0].value,
    *[_type == "siteSettings"][0].seo.metaTitle[language == $lang][0].value,
    *[_type == "siteSettings"][0].seo.metaTitle[language == "nl"][0].value,
    "Milo Weiler"
  ),
  "description": coalesce(
    seo.metaDescription[language == $lang][0].value,
    seo.metaDescription[language == "nl"][0].value,
    *[_type == "siteSettings"][0].seo.metaDescription[language == $lang][0].value,
    *[_type == "siteSettings"][0].seo.metaDescription[language == "nl"][0].value,
    ""
  ),
  "ogImage": coalesce(
    seo.ogImage{
      "url": asset->url,
      "alt": coalesce(alt[language == $lang][0].value, alt[language == "nl"][0].value, "")
    },
    *[_type == "siteSettings"][0].seo.ogImage{
      "url": asset->url,
      "alt": coalesce(alt[language == $lang][0].value, alt[language == "nl"][0].value, "")
    }
  ),
  "noIndex": seo.noIndex == true
}`);

export const SERVICE_SEO_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0]{
  "title": coalesce(
    seo.metaTitle[language == $lang][0].value,
    seo.metaTitle[language == "nl"][0].value,
    coalesce(page.head.titleLine1[language == $lang][0].value, page.head.titleLine1[language == "nl"][0].value, "") + " " + coalesce(page.head.titleLine2[language == $lang][0].value, page.head.titleLine2[language == "nl"][0].value, "") + " — Milo Weiler"
  ),
  "description": coalesce(
    seo.metaDescription[language == $lang][0].value,
    seo.metaDescription[language == "nl"][0].value,
    page.head.sub[language == $lang][0].value,
    page.head.sub[language == "nl"][0].value,
    ""
  ),
  "ogImage": coalesce(
    seo.ogImage{
      "url": asset->url,
      "alt": coalesce(alt[language == $lang][0].value, alt[language == "nl"][0].value, "")
    },
    *[_type == "siteSettings"][0].seo.ogImage{
      "url": asset->url,
      "alt": coalesce(alt[language == $lang][0].value, alt[language == "nl"][0].value, "")
    }
  ),
  "noIndex": seo.noIndex == true,
  "name": coalesce(name[language == $lang][0].value, name[language == "nl"][0].value, ""),
  "faqItems": coalesce(page.faq.items[]{
    "q": coalesce(q[language == $lang][0].value, q[language == "nl"][0].value, ""),
    "a": coalesce(a[language == $lang][0].value, a[language == "nl"][0].value, "")
  }, [])
}`);
