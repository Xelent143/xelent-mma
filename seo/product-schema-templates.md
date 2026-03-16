# Xelent MMA - Product Schema Templates

## Standard Product Schema Template

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "image": [
    "https://xelentmma.com/images/product-1.jpg",
    "https://xelentmma.com/images/product-2.jpg",
    "https://xelentmma.com/images/product-3.jpg"
  ],
  "description": "Detailed product description for SEO.",
  "sku": "SKU-CODE",
  "brand": {
    "@type": "Brand",
    "name": "Xelent MMA"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Xelent Sports Industries",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sialkot",
      "addressCountry": "PK"
    }
  },
  "offers": {
    "@type": "Offer",
    "url": "https://xelentmma.com/product-url",
    "priceCurrency": "USD",
    "price": "129.00",
    "priceValidUntil": "2024-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "Xelent MMA"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0.00",
        "currency": "USD"
      },
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "US"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": "1",
          "maxValue": "2",
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": "3",
          "maxValue": "7",
          "unitCode": "DAY"
        }
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "124",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Customer Name"
      },
      "datePublished": "2024-01-15",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "Detailed review text here."
    }
  ],
  "color": ["White", "Blue", "Black"],
  "size": ["A0", "A1", "A2", "A3", "A4", "A5"],
  "material": "100% Pre-shrunk Cotton",
  "weight": {
    "@type": "QuantitativeValue",
    "value": "450",
    "unitCode": "GM"
  },
  "audience": {
    "@type": "PeopleAudience",
    "suggestedGender": "unisex",
    "suggestedMinAge": "16",
    "suggestedMaxAge": "65"
  },
  "isRelatedTo": {
    "@type": "Service",
    "name": "BJJ Training"
  }
}
```

---

## Specific Product Examples

### 1. Elite Pearl Weave BJJ Gi

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Elite Pearl Weave BJJ Gi",
  "image": [
    "https://xelentmma.com/images/elite-pearl-white-front.jpg",
    "https://xelentmma.com/images/elite-pearl-white-back.jpg",
    "https://xelentmma.com/images/elite-pearl-blue-front.jpg",
    "https://xelentmma.com/images/elite-pearl-black-front.jpg"
  ],
  "description": "The Elite Pearl Weave BJJ Gi is a lightweight competition gi featuring 450gsm pearl weave fabric. Pre-shrunk cotton, reinforced stress points, and IBJJF-approved design. Perfect for hot weather training and competition.",
  "sku": "XEL-PEARL-001",
  "mpn": "XELPEARL450",
  "brand": {
    "@type": "Brand",
    "name": "Xelent MMA"
  },
  "category": "BJJ Gi",
  "offers": {
    "@type": "Offer",
    "url": "https://xelentmma.com/products/elite-pearl-weave-gi",
    "priceCurrency": "USD",
    "price": "129.00",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "priceValidUntil": "2024-12-31",
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0.00",
        "currency": "USD"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": "1",
          "maxValue": "2",
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": "5",
          "maxValue": "10",
          "unitCode": "DAY"
        }
      }
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "156",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": {"@type": "Person", "name": "Mike Johnson"},
      "datePublished": "2024-02-10",
      "reviewRating": {"@type": "Rating", "ratingValue": "5"},
      "reviewBody": "Amazing gi for the price. Lightweight and comfortable for competition."
    },
    {
      "@type": "Review",
      "author": {"@type": "Person", "name": "Sarah Chen"},
      "datePublished": "2024-01-28",
      "reviewRating": {"@type": "Rating", "ratingValue": "5"},
      "reviewBody": "Best gi I've owned. Perfect fit and the fabric feels premium."
    }
  ],
  "color": ["White", "Royal Blue", "Black"],
  "size": ["A0", "A1", "A2", "A3", "A4", "A5"],
  "material": "100% Pre-shrunk Cotton - 450gsm Pearl Weave",
  "weight": {
    "@type": "QuantitativeValue",
    "value": "450",
    "unitCode": "GM"
  },
  "audience": {
    "@type": "PeopleAudience",
    "suggestedGender": "unisex",
    "suggestedMinAge": "16"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Weave Type",
      "value": "Pearl Weave"
    },
    {
      "@type": "PropertyValue",
      "name": "IBJJF Approved",
      "value": "Yes"
    },
    {
      "@type": "PropertyValue",
      "name": "Pre-shrunk",
      "value": "Yes"
    },
    {
      "@type": "PropertyValue",
      "name": "Jacket Weight",
      "value": "450gsm"
    },
    {
      "@type": "PropertyValue",
      "name": "Pants Material",
      "value": "Canvas (10oz)"
    },
    {
      "@type": "PropertyValue",
      "name": "Country of Manufacture",
      "value": "Pakistan"
    }
  ]
}
```

### 2. Pro Gold Weave BJJ Gi

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Pro Gold Weave BJJ Gi",
  "image": [
    "https://xelentmma.com/images/pro-gold-white.jpg",
    "https://xelentmma.com/images/pro-gold-blue.jpg",
    "https://xelentmma.com/images/pro-gold-black.jpg"
  ],
  "description": "Heavy-duty training gi with 550gsm gold weave construction. Reinforced at all stress points for maximum durability. The Pro Gold Weave Gi is built for daily training and will withstand years of intense grappling sessions.",
  "sku": "XEL-GOLD-001",
  "brand": {
    "@type": "Brand",
    "name": "Xelent MMA"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://xelentmma.com/products/pro-gold-weave-gi",
    "priceCurrency": "USD",
    "price": "149.00",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "priceValidUntil": "2024-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "89",
    "bestRating": "5"
  },
  "color": ["White", "Royal Blue", "Black"],
  "size": ["A0", "A1", "A2", "A3", "A4", "A5"],
  "material": "100% Pre-shrunk Cotton - 550gsm Gold Weave",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Weave Type",
      "value": "Gold Weave"
    },
    {
      "@type": "PropertyValue",
      "name": "Jacket Weight",
      "value": "550gsm"
    }
  ]
}
```

### 3. Premium Rashguard

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Xelent Premium Rashguard",
  "image": [
    "https://xelentmma.com/images/rashguard-ls-black.jpg",
    "https://xelentmma.com/images/rashguard-ss-blue.jpg"
  ],
  "description": "High-performance compression rashguard for BJJ and MMA training. Moisture-wicking fabric with anti-microbial treatment. Flatlock stitching prevents chafing during intense training.",
  "sku": "XEL-RASH-001",
  "brand": {
    "@type": "Brand",
    "name": "Xelent MMA"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://xelentmma.com/products/premium-rashguard",
    "priceCurrency": "USD",
    "price": "45.00",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "priceValidUntil": "2024-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "203",
    "bestRating": "5"
  },
  "color": ["Black", "Blue", "White", "Red"],
  "size": ["S", "M", "L", "XL", "XXL"],
  "material": "88% Polyester, 12% Spandex",
  "audience": {
    "@type": "PeopleAudience",
    "suggestedGender": "unisex"
  }
}
```

### 4. MMA Fight Shorts

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Xelent Pro MMA Fight Shorts",
  "image": [
    "https://xelentmma.com/images/fight-shorts-black.jpg",
    "https://xelentmma.com/images/fight-shorts-camo.jpg"
  ],
  "description": "Professional-grade MMA fight shorts with 4-way stretch fabric. Side slits for full range of motion. Velcro closure with drawstring for secure fit. Perfect for training and competition.",
  "sku": "XEL-SHORTS-001",
  "brand": {
    "@type": "Brand",
    "name": "Xelent MMA"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://xelentmma.com/products/pro-mma-fight-shorts",
    "priceCurrency": "USD",
    "price": "55.00",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "78",
    "bestRating": "5"
  },
  "color": ["Black", "Camo", "Blue", "Red"],
  "size": ["28", "30", "32", "34", "36", "38"],
  "material": "100% Polyester Microfiber",
  "audience": {
    "@type": "PeopleAudience",
    "suggestedGender": "male"
  }
}
```

---

## Product Schema with Variants

For products with multiple variants (sizes, colors):

```json
{
  "@context": "https://schema.org",
  "@type": "ProductGroup",
  "name": "Elite Pearl Weave BJJ Gi",
  "description": "Lightweight competition BJJ gi available in multiple colors and sizes",
  "brand": {
    "@type": "Brand",
    "name": "Xelent MMA"
  },
  "hasVariant": [
    {
      "@type": "Product",
      "sku": "XEL-PEARL-W-A2",
      "name": "Elite Pearl Weave BJJ Gi - White - A2",
      "color": "White",
      "size": "A2",
      "offers": {
        "@type": "Offer",
        "price": "129.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Product",
      "sku": "XEL-PEARL-B-A2",
      "name": "Elite Pearl Weave BJJ Gi - Blue - A2",
      "color": "Blue",
      "size": "A2",
      "offers": {
        "@type": "Offer",
        "price": "129.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    }
  ]
}
```

---

## Product Schema with Aggregate Offer (Multiple Sellers)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Elite Pearl Weave BJJ Gi",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "119.00",
    "highPrice": "139.00",
    "priceCurrency": "USD",
    "offerCount": "3",
    "offers": [
      {
        "@type": "Offer",
        "seller": {"@type": "Organization", "name": "Xelent MMA"},
        "price": "129.00",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "seller": {"@type": "Organization", "name": "Amazon"},
        "price": "139.00",
        "availability": "https://schema.org/InStock"
      }
    ]
  }
}
```

---

## Availability Status Options

| Status | Schema Value | Use When |
|--------|-------------|----------|
| In Stock | `https://schema.org/InStock` | Item available now |
| Out of Stock | `https://schema.org/OutOfStock` | Temporarily unavailable |
| Pre-order | `https://schema.org/PreOrder` | Available for pre-order |
| Backorder | `https://schema.org/BackOrder` | Will ship when available |
| Discontinued | `https://schema.org/Discontinued` | No longer made |

---

## Review Schema Guidelines

### Best Practices for Reviews

1. **Authentic Reviews Only:** Only include genuine customer reviews
2. **Verify Purchases:** Mark reviews as "verified purchase" when possible
3. **Update Regularly:** Keep review counts current
4. **Moderation:** Remove fake or spam reviews
5. **Diverse Opinions:** Include a range of ratings (not just 5-star)

### Review Snippet Example

```json
{
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Verified Customer"
  },
  "datePublished": "2024-03-01",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "Excellent gi! The fit is perfect and the fabric feels premium.",
  "positiveNotes": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Great fit"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Premium fabric"
      }
    ]
  }
}
```

---

## Implementation Checklist

### Required Fields
- [ ] `@context`: "https://schema.org"
- [ ] `@type`: "Product"
- [ ] `name`: Product name
- [ ] `offers` with `price` and `priceCurrency`
- [ ] `aggregateRating` (if reviews exist)

### Recommended Fields
- [ ] `image`: Multiple product images
- [ ] `description`: SEO-optimized description
- [ ] `sku`: Unique product identifier
- [ ] `brand`: Brand information
- [ ] `availability`: Stock status
- [ ] `review`: Individual reviews
- [ ] `color`: Available colors
- [ ] `size`: Available sizes
- [ ] `material`: Fabric/material details

### Optional Fields
- [ ] `mpn`: Manufacturer Part Number
- [ ] `gtin`: Global Trade Item Number (UPC/EAN)
- [ ] `weight`: Product weight
- [ ] `audience`: Target demographic
- [ ] `additionalProperty`: Custom specifications

---

## Testing & Validation

### Test Your Schema

1. **Google Rich Results Test:** https://search.google.com/test/rich-results
2. **Schema.org Validator:** https://validator.schema.org/
3. **JSON-LD Playground:** https://json-ld.org/playground/

### Common Errors to Avoid

- Missing required fields (name, offers, price)
- Invalid JSON syntax
- Incorrect schema.org URLs
- Missing `@context` declaration
- Mismatched data types

### Monitoring

Track in Google Search Console:
- Products with valid schema
- Rich result impressions
- Click-through rates
- Enhancement reports
