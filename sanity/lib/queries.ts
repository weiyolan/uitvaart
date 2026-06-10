import { defineQuery } from "next-sanity";

/* All queries project Sanity documents into the exact shapes the components
   already consume (legacy SiteContent / ServicePage contracts), localized via
   the internationalized-array pattern:
     coalesce(field[_key == $lang][0].value, field[_key == "nl"][0].value, "")
   Queries are fully written out (no string-building) so TypeGen can analyze
   them statically. */

export const HOME_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings"][0]{
    "nav": {
      "filosofie": coalesce(nav.filosofie[_key == $lang][0].value, nav.filosofie[_key == "nl"][0].value, ""),
      "uitvaart": coalesce(nav.uitvaart[_key == $lang][0].value, nav.uitvaart[_key == "nl"][0].value, ""),
      "portret": coalesce(nav.portret[_key == $lang][0].value, nav.portret[_key == "nl"][0].value, ""),
      "huwelijk": coalesce(nav.huwelijk[_key == $lang][0].value, nav.huwelijk[_key == "nl"][0].value, ""),
      "werk": coalesce(nav.werk[_key == $lang][0].value, nav.werk[_key == "nl"][0].value, ""),
      "contact": coalesce(nav.contact[_key == $lang][0].value, nav.contact[_key == "nl"][0].value, "")
    },
    "contact": {
      "overline": coalesce(contactSection.overline[_key == $lang][0].value, contactSection.overline[_key == "nl"][0].value, ""),
      "title": coalesce(contactSection.title[_key == $lang][0].value, contactSection.title[_key == "nl"][0].value, ""),
      "body": coalesce(contactSection.body[_key == $lang][0].value, contactSection.body[_key == "nl"][0].value, ""),
      "callBtn": coalesce(contactSection.callBtn[_key == $lang][0].value, contactSection.callBtn[_key == "nl"][0].value, ""),
      "mailBtn": coalesce(contactSection.mailBtn[_key == $lang][0].value, contactSection.mailBtn[_key == "nl"][0].value, ""),
      "callHref": coalesce("tel:" + business.phone, ""),
      "mailHref": coalesce("mailto:" + business.email, ""),
      "lines": [
        {
          "k": coalesce(contactSection.phoneLabel[_key == $lang][0].value, contactSection.phoneLabel[_key == "nl"][0].value, ""),
          "v": coalesce(business.phoneDisplay, ""),
          "href": coalesce("tel:" + business.phone, "")
        },
        {
          "k": coalesce(contactSection.emailLabel[_key == $lang][0].value, contactSection.emailLabel[_key == "nl"][0].value, ""),
          "v": coalesce(business.email, ""),
          "href": coalesce("mailto:" + business.email, "")
        },
        {
          "k": coalesce(contactSection.studioLabel[_key == $lang][0].value, contactSection.studioLabel[_key == "nl"][0].value, ""),
          "v": coalesce(business.streetAddress + ", " + business.postalCode + " " + business.city, ""),
          "href": ""
        },
        {
          "k": coalesce(contactSection.instagramLabel[_key == $lang][0].value, contactSection.instagramLabel[_key == "nl"][0].value, ""),
          "v": coalesce(business.instagramHandle, ""),
          "href": coalesce(business.instagramUrl, "")
        }
      ]
    },
    "foot": {
      "tagline": coalesce(footer.tagline[_key == $lang][0].value, footer.tagline[_key == "nl"][0].value, ""),
      "navTitle": coalesce(footer.navTitle[_key == $lang][0].value, footer.navTitle[_key == "nl"][0].value, ""),
      "contactTitle": coalesce(footer.contactTitle[_key == $lang][0].value, footer.contactTitle[_key == "nl"][0].value, ""),
      "legalTitle": coalesce(footer.legalTitle[_key == $lang][0].value, footer.legalTitle[_key == "nl"][0].value, ""),
      "legal": [
        coalesce(coalesce(footer.vatLabel[_key == $lang][0].value, footer.vatLabel[_key == "nl"][0].value) + " " + business.vatNumber, ""),
        coalesce(business.bankName + " " + business.iban, "")
      ],
      "rights": coalesce(footer.rights[_key == $lang][0].value, footer.rights[_key == "nl"][0].value, ""),
      "made": coalesce(footer.made[_key == $lang][0].value, footer.made[_key == "nl"][0].value, "")
    },
    "ui": {
      "railWork": coalesce(ui.railWork[_key == $lang][0].value, ui.railWork[_key == "nl"][0].value, ""),
      "railServices": coalesce(ui.railServices[_key == $lang][0].value, ui.railServices[_key == "nl"][0].value, ""),
      "railProcess": coalesce(ui.railProcess[_key == $lang][0].value, ui.railProcess[_key == "nl"][0].value, ""),
      "showcaseHeading": coalesce(ui.showcaseHeading[_key == $lang][0].value, ui.showcaseHeading[_key == "nl"][0].value, ""),
      "serviceCta": coalesce(ui.serviceCta[_key == $lang][0].value, ui.serviceCta[_key == "nl"][0].value, ""),
      "themeLabel": coalesce(ui.themeLabel[_key == $lang][0].value, ui.themeLabel[_key == "nl"][0].value, "")
    },
    "business": {
      "siteName": coalesce(business.siteName, "Milo Weiler"),
      "jobTitle": coalesce(business.jobTitle[_key == $lang][0].value, business.jobTitle[_key == "nl"][0].value, ""),
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
      "overline": coalesce(hero.overline[_key == $lang][0].value, hero.overline[_key == "nl"][0].value, ""),
      "title": [
        coalesce(hero.titleLine1[_key == $lang][0].value, hero.titleLine1[_key == "nl"][0].value, ""),
        coalesce(hero.titleLine2[_key == $lang][0].value, hero.titleLine2[_key == "nl"][0].value, "")
      ],
      "sub": coalesce(hero.sub[_key == $lang][0].value, hero.sub[_key == "nl"][0].value, ""),
      "cue": coalesce(hero.cue[_key == $lang][0].value, hero.cue[_key == "nl"][0].value, ""),
      "cta": coalesce(hero.cta[_key == $lang][0].value, hero.cta[_key == "nl"][0].value, "")
    },
    "philosophy": {
      "overline": coalesce(philosophy.overline[_key == $lang][0].value, philosophy.overline[_key == "nl"][0].value, ""),
      "pull": coalesce(philosophy.pull[_key == $lang][0].value, philosophy.pull[_key == "nl"][0].value, ""),
      "lead": coalesce(philosophy.lead[_key == $lang][0].value, philosophy.lead[_key == "nl"][0].value, ""),
      "body": coalesce(philosophy.body[_key == $lang][0].value, philosophy.body[_key == "nl"][0].value, ""),
      "indexOverline": coalesce(philosophy.indexOverline[_key == $lang][0].value, philosophy.indexOverline[_key == "nl"][0].value, "")
    },
    "process": {
      "overline": coalesce(process.overline[_key == $lang][0].value, process.overline[_key == "nl"][0].value, ""),
      "title": coalesce(process.title[_key == $lang][0].value, process.title[_key == "nl"][0].value, ""),
      "note": coalesce(process.note[_key == $lang][0].value, process.note[_key == "nl"][0].value, ""),
      "steps": coalesce(process.steps[]{
        "no": coalesce(no, ""),
        "name": coalesce(name[_key == $lang][0].value, name[_key == "nl"][0].value, ""),
        "text": coalesce(text[_key == $lang][0].value, text[_key == "nl"][0].value, "")
      }, [])
    },
    "work": {
      "overline": coalesce(work.overline[_key == $lang][0].value, work.overline[_key == "nl"][0].value, ""),
      "title": coalesce(work.title[_key == $lang][0].value, work.title[_key == "nl"][0].value, ""),
      "note": coalesce(work.note[_key == $lang][0].value, work.note[_key == "nl"][0].value, ""),
      "frames": coalesce(work.frames[]{
        "stock": coalesce(tag, ""),
        "meta": coalesce(meta[_key == $lang][0].value, meta[_key == "nl"][0].value, ""),
        "corner": coalesce(corner, ""),
        image{
          asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } },
          hotspot,
          crop,
          "alt": coalesce(alt[_key == $lang][0].value, alt[_key == "nl"][0].value, "")
        }
      }, [])
    },
    "closing": {
      "overline": coalesce(closing.overline[_key == $lang][0].value, closing.overline[_key == "nl"][0].value, ""),
      "statement": coalesce(closing.statement[_key == $lang][0].value, closing.statement[_key == "nl"][0].value, ""),
      "sub": coalesce(closing.sub[_key == $lang][0].value, closing.sub[_key == "nl"][0].value, "")
    }
  },
  "services": *[_type == "service"] | order(order asc){
    "key": coalesce(slug.current, ""),
    "no": coalesce(number, ""),
    "name": coalesce(name[_key == $lang][0].value, name[_key == "nl"][0].value, ""),
    "note": coalesce(note[_key == $lang][0].value, note[_key == "nl"][0].value, ""),
    "fig": [
      coalesce(indexFigLabel[_key == $lang][0].value, indexFigLabel[_key == "nl"][0].value, ""),
      coalesce(indexFigCorner, "")
    ],
    "overline": coalesce(landing.overline[_key == $lang][0].value, landing.overline[_key == "nl"][0].value, ""),
    "kicker": coalesce(landing.kicker[_key == $lang][0].value, landing.kicker[_key == "nl"][0].value, ""),
    "title": coalesce(landing.title[_key == $lang][0].value, landing.title[_key == "nl"][0].value, ""),
    "why": coalesce(landing.why[_key == $lang][0].value, landing.why[_key == "nl"][0].value, ""),
    "bodyTitle": coalesce(landing.bodyTitle[_key == $lang][0].value, landing.bodyTitle[_key == "nl"][0].value, ""),
    "body": coalesce(landing.paragraphs[]{
      "value": coalesce(text[_key == $lang][0].value, text[_key == "nl"][0].value, "")
    }, []),
    "specs": coalesce(landing.specs[]{
      "value": coalesce(value[_key == $lang][0].value, value[_key == "nl"][0].value, "")
    }, []),
    "result": [
      coalesce(landing.resultLabel[_key == $lang][0].value, landing.resultLabel[_key == "nl"][0].value, ""),
      coalesce(landing.resultValue[_key == $lang][0].value, landing.resultValue[_key == "nl"][0].value, "")
    ],
    "figures": coalesce(landing.figures[]{
      _key,
      "tag": coalesce(tag, ""),
      "meta": coalesce(meta[_key == $lang][0].value, meta[_key == "nl"][0].value, ""),
      "corner": coalesce(corner, ""),
      image{
        asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } },
        hotspot,
        crop,
        "alt": coalesce(alt[_key == $lang][0].value, alt[_key == "nl"][0].value, "")
      }
    }, [])
  }
}`);

export const SERVICE_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings"][0]{
    "nav": {
      "filosofie": coalesce(nav.filosofie[_key == $lang][0].value, nav.filosofie[_key == "nl"][0].value, ""),
      "uitvaart": coalesce(nav.uitvaart[_key == $lang][0].value, nav.uitvaart[_key == "nl"][0].value, ""),
      "portret": coalesce(nav.portret[_key == $lang][0].value, nav.portret[_key == "nl"][0].value, ""),
      "huwelijk": coalesce(nav.huwelijk[_key == $lang][0].value, nav.huwelijk[_key == "nl"][0].value, ""),
      "werk": coalesce(nav.werk[_key == $lang][0].value, nav.werk[_key == "nl"][0].value, ""),
      "contact": coalesce(nav.contact[_key == $lang][0].value, nav.contact[_key == "nl"][0].value, "")
    },
    "contact": {
      "overline": coalesce(contactSection.overline[_key == $lang][0].value, contactSection.overline[_key == "nl"][0].value, ""),
      "title": coalesce(contactSection.title[_key == $lang][0].value, contactSection.title[_key == "nl"][0].value, ""),
      "body": coalesce(contactSection.body[_key == $lang][0].value, contactSection.body[_key == "nl"][0].value, ""),
      "callBtn": coalesce(contactSection.callBtn[_key == $lang][0].value, contactSection.callBtn[_key == "nl"][0].value, ""),
      "mailBtn": coalesce(contactSection.mailBtn[_key == $lang][0].value, contactSection.mailBtn[_key == "nl"][0].value, ""),
      "callHref": coalesce("tel:" + business.phone, ""),
      "mailHref": coalesce("mailto:" + business.email, "")
    },
    "foot": {
      "tagline": coalesce(footer.tagline[_key == $lang][0].value, footer.tagline[_key == "nl"][0].value, ""),
      "navTitle": coalesce(footer.navTitle[_key == $lang][0].value, footer.navTitle[_key == "nl"][0].value, ""),
      "contactTitle": coalesce(footer.contactTitle[_key == $lang][0].value, footer.contactTitle[_key == "nl"][0].value, ""),
      "legalTitle": coalesce(footer.legalTitle[_key == $lang][0].value, footer.legalTitle[_key == "nl"][0].value, ""),
      "legal": [
        coalesce(coalesce(footer.vatLabel[_key == $lang][0].value, footer.vatLabel[_key == "nl"][0].value) + " " + business.vatNumber, ""),
        coalesce(business.bankName + " " + business.iban, "")
      ],
      "rights": coalesce(footer.rights[_key == $lang][0].value, footer.rights[_key == "nl"][0].value, ""),
      "made": coalesce(footer.made[_key == $lang][0].value, footer.made[_key == "nl"][0].value, "")
    },
    "ui": {
      "themeLabel": coalesce(ui.themeLabel[_key == $lang][0].value, ui.themeLabel[_key == "nl"][0].value, ""),
      "spBack": coalesce(ui.spBack[_key == $lang][0].value, ui.spBack[_key == "nl"][0].value, ""),
      "navWhy": coalesce(ui.navWhy[_key == $lang][0].value, ui.navWhy[_key == "nl"][0].value, ""),
      "navHow": coalesce(ui.navHow[_key == $lang][0].value, ui.navHow[_key == "nl"][0].value, ""),
      "navPiece": coalesce(ui.navPiece[_key == $lang][0].value, ui.navPiece[_key == "nl"][0].value, ""),
      "navPackages": coalesce(ui.navPackages[_key == $lang][0].value, ui.navPackages[_key == "nl"][0].value, ""),
      "navFaq": coalesce(ui.navFaq[_key == $lang][0].value, ui.navFaq[_key == "nl"][0].value, ""),
      "galleryOverline": coalesce(ui.spGalleryOverline[_key == $lang][0].value, ui.spGalleryOverline[_key == "nl"][0].value, ""),
      "galleryTitle": coalesce(ui.spGalleryTitle[_key == $lang][0].value, ui.spGalleryTitle[_key == "nl"][0].value, ""),
      "galleryNote": coalesce(ui.spGalleryNote[_key == $lang][0].value, ui.spGalleryNote[_key == "nl"][0].value, ""),
      "cross": coalesce(ui.spCross[_key == $lang][0].value, ui.spCross[_key == "nl"][0].value, ""),
      "popular": coalesce(ui.spPopular[_key == $lang][0].value, ui.spPopular[_key == "nl"][0].value, ""),
      "ask": coalesce(ui.spAsk[_key == $lang][0].value, ui.spAsk[_key == "nl"][0].value, "")
    },
    "business": {
      "siteName": coalesce(business.siteName, "Milo Weiler"),
      "jobTitle": coalesce(business.jobTitle[_key == $lang][0].value, business.jobTitle[_key == "nl"][0].value, ""),
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
    "name": coalesce(name[_key == $lang][0].value, name[_key == "nl"][0].value, ""),
    "hero": coalesce(page.heroVariant, "centered"),
    "crumb": coalesce(page.crumb[_key == $lang][0].value, page.crumb[_key == "nl"][0].value, ""),
    "head": {
      "overline": coalesce(page.head.overline[_key == $lang][0].value, page.head.overline[_key == "nl"][0].value, ""),
      "title": [
        coalesce(page.head.titleLine1[_key == $lang][0].value, page.head.titleLine1[_key == "nl"][0].value, ""),
        coalesce(page.head.titleLine2[_key == $lang][0].value, page.head.titleLine2[_key == "nl"][0].value, "")
      ],
      "sub": coalesce(page.head.sub[_key == $lang][0].value, page.head.sub[_key == "nl"][0].value, ""),
      "fig": page.head.fig{
        "tag": coalesce(tag, ""),
        "meta": coalesce(meta[_key == $lang][0].value, meta[_key == "nl"][0].value, ""),
        "corner": coalesce(corner, ""),
        image{
          asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } },
          hotspot,
          crop,
          "alt": coalesce(alt[_key == $lang][0].value, alt[_key == "nl"][0].value, "")
        }
      }
    },
    "why": {
      "overline": coalesce(page.why.overline[_key == $lang][0].value, page.why.overline[_key == "nl"][0].value, ""),
      "lead": coalesce(page.why.lead[_key == $lang][0].value, page.why.lead[_key == "nl"][0].value, ""),
      "body": coalesce(page.why.paragraphs[]{
        "value": coalesce(text[_key == $lang][0].value, text[_key == "nl"][0].value, "")
      }, []),
      "pull": coalesce(page.why.pull[_key == $lang][0].value, page.why.pull[_key == "nl"][0].value, ""),
      "fig": page.why.fig{
        "tag": coalesce(tag, ""),
        "meta": coalesce(meta[_key == $lang][0].value, meta[_key == "nl"][0].value, ""),
        "corner": coalesce(corner, ""),
        image{
          asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } },
          hotspot,
          crop,
          "alt": coalesce(alt[_key == $lang][0].value, alt[_key == "nl"][0].value, "")
        }
      }
    },
    "how": {
      "overline": coalesce(page.how.overline[_key == $lang][0].value, page.how.overline[_key == "nl"][0].value, ""),
      "title": coalesce(page.how.title[_key == $lang][0].value, page.how.title[_key == "nl"][0].value, ""),
      "note": coalesce(page.how.note[_key == $lang][0].value, page.how.note[_key == "nl"][0].value, ""),
      "steps": coalesce(page.how.steps[]{
        "no": coalesce(no, ""),
        "name": coalesce(name[_key == $lang][0].value, name[_key == "nl"][0].value, ""),
        "text": coalesce(text[_key == $lang][0].value, text[_key == "nl"][0].value, "")
      }, [])
    },
    "piece": {
      "overline": coalesce(page.piece.overline[_key == $lang][0].value, page.piece.overline[_key == "nl"][0].value, ""),
      "title": coalesce(page.piece.title[_key == $lang][0].value, page.piece.title[_key == "nl"][0].value, ""),
      "body": coalesce(page.piece.body[_key == $lang][0].value, page.piece.body[_key == "nl"][0].value, ""),
      "specs": coalesce(page.piece.specs[]{
        "value": coalesce(value[_key == $lang][0].value, value[_key == "nl"][0].value, "")
      }, []),
      "result": [
        coalesce(page.piece.resultLabel[_key == $lang][0].value, page.piece.resultLabel[_key == "nl"][0].value, ""),
        coalesce(page.piece.resultValue[_key == $lang][0].value, page.piece.resultValue[_key == "nl"][0].value, "")
      ],
      "fig": page.piece.fig{
        "tag": coalesce(tag, ""),
        "meta": coalesce(meta[_key == $lang][0].value, meta[_key == "nl"][0].value, ""),
        "corner": coalesce(corner, ""),
        image{
          asset->{ _id, url, metadata{ lqip, dimensions{ width, height } } },
          hotspot,
          crop,
          "alt": coalesce(alt[_key == $lang][0].value, alt[_key == "nl"][0].value, "")
        }
      }
    },
    "packages": {
      "overline": coalesce(page.packages.overline[_key == $lang][0].value, page.packages.overline[_key == "nl"][0].value, ""),
      "title": coalesce(page.packages.title[_key == $lang][0].value, page.packages.title[_key == "nl"][0].value, ""),
      "note": coalesce(page.packages.note[_key == $lang][0].value, page.packages.note[_key == "nl"][0].value, ""),
      "priceNote": coalesce(page.packages.priceNote[_key == $lang][0].value, page.packages.priceNote[_key == "nl"][0].value, ""),
      "items": coalesce(page.packages.items[]{
        _key,
        "name": coalesce(name[_key == $lang][0].value, name[_key == "nl"][0].value, ""),
        "tagline": coalesce(tagline[_key == $lang][0].value, tagline[_key == "nl"][0].value, ""),
        "includes": coalesce(includes[]{
          "value": coalesce(value[_key == $lang][0].value, value[_key == "nl"][0].value, "")
        }, []),
        "featured": featured == true
      }, [])
    },
    "faq": {
      "overline": coalesce(page.faq.overline[_key == $lang][0].value, page.faq.overline[_key == "nl"][0].value, ""),
      "title": coalesce(page.faq.title[_key == $lang][0].value, page.faq.title[_key == "nl"][0].value, ""),
      "items": coalesce(page.faq.items[]{
        _key,
        "q": coalesce(q[_key == $lang][0].value, q[_key == "nl"][0].value, ""),
        "a": coalesce(a[_key == $lang][0].value, a[_key == "nl"][0].value, "")
      }, [])
    }
  },
  "others": *[_type == "service" && slug.current != $slug] | order(order asc){
    "key": coalesce(slug.current, ""),
    "no": coalesce(number, ""),
    "name": coalesce(name[_key == $lang][0].value, name[_key == "nl"][0].value, ""),
    "note": coalesce(note[_key == $lang][0].value, note[_key == "nl"][0].value, ""),
    "fig": [
      coalesce(indexFigLabel[_key == $lang][0].value, indexFigLabel[_key == "nl"][0].value, ""),
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
  "title": coalesce(seo.metaTitle[_key == $lang][0].value, seo.metaTitle[_key == "nl"][0].value, "Milo Weiler"),
  "description": coalesce(seo.metaDescription[_key == $lang][0].value, seo.metaDescription[_key == "nl"][0].value, ""),
  "ogImage": seo.ogImage{
    "url": asset->url,
    "alt": coalesce(alt[_key == $lang][0].value, alt[_key == "nl"][0].value, "")
  },
  "noIndex": seo.noIndex == true
}`);

export const HOME_SEO_QUERY = defineQuery(`*[_type == "homePage"][0]{
  "title": coalesce(
    seo.metaTitle[_key == $lang][0].value,
    seo.metaTitle[_key == "nl"][0].value,
    *[_type == "siteSettings"][0].seo.metaTitle[_key == $lang][0].value,
    *[_type == "siteSettings"][0].seo.metaTitle[_key == "nl"][0].value,
    "Milo Weiler"
  ),
  "description": coalesce(
    seo.metaDescription[_key == $lang][0].value,
    seo.metaDescription[_key == "nl"][0].value,
    *[_type == "siteSettings"][0].seo.metaDescription[_key == $lang][0].value,
    *[_type == "siteSettings"][0].seo.metaDescription[_key == "nl"][0].value,
    ""
  ),
  "ogImage": coalesce(
    seo.ogImage{
      "url": asset->url,
      "alt": coalesce(alt[_key == $lang][0].value, alt[_key == "nl"][0].value, "")
    },
    *[_type == "siteSettings"][0].seo.ogImage{
      "url": asset->url,
      "alt": coalesce(alt[_key == $lang][0].value, alt[_key == "nl"][0].value, "")
    }
  ),
  "noIndex": seo.noIndex == true
}`);

export const SERVICE_SEO_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0]{
  "title": coalesce(
    seo.metaTitle[_key == $lang][0].value,
    seo.metaTitle[_key == "nl"][0].value,
    coalesce(page.head.titleLine1[_key == $lang][0].value, page.head.titleLine1[_key == "nl"][0].value, "") + " " + coalesce(page.head.titleLine2[_key == $lang][0].value, page.head.titleLine2[_key == "nl"][0].value, "") + " — Milo Weiler"
  ),
  "description": coalesce(
    seo.metaDescription[_key == $lang][0].value,
    seo.metaDescription[_key == "nl"][0].value,
    page.head.sub[_key == $lang][0].value,
    page.head.sub[_key == "nl"][0].value,
    ""
  ),
  "ogImage": coalesce(
    seo.ogImage{
      "url": asset->url,
      "alt": coalesce(alt[_key == $lang][0].value, alt[_key == "nl"][0].value, "")
    },
    *[_type == "siteSettings"][0].seo.ogImage{
      "url": asset->url,
      "alt": coalesce(alt[_key == $lang][0].value, alt[_key == "nl"][0].value, "")
    }
  ),
  "noIndex": seo.noIndex == true,
  "name": coalesce(name[_key == $lang][0].value, name[_key == "nl"][0].value, ""),
  "faqItems": coalesce(page.faq.items[]{
    "q": coalesce(q[_key == $lang][0].value, q[_key == "nl"][0].value, ""),
    "a": coalesce(a[_key == $lang][0].value, a[_key == "nl"][0].value, "")
  }, [])
}`);
