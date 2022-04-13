// Remember this is now a dynamic site and I should pass in the name props
import Head from 'next/head'
import Link from 'next/link'
import { NavLink } from '../../components'

const ProductPage = () => {
  function addProductJsonLd() {
    return {
      __html: `{
		  "@context": "https://schema.org/",
		  "@type": "Product",
		  "name": "Executive Anvil",
		  "image": [
			"https://example.com/photos/1x1/photo.jpg",
			"https://example.com/photos/4x3/photo.jpg",
			"https://example.com/photos/16x9/photo.jpg"
		   ],
		  "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
		  "sku": "0446310786",
		  "mpn": "925872",
		  "brand": {
			"@type": "Brand",
			"name": "ACME"
		  },
		  "review": {
			"@type": "Review",
			"reviewRating": {
			  "@type": "Rating",
			  "ratingValue": "4",
			  "bestRating": "5"
			},
			"author": {
			  "@type": "Person",
			  "name": "Fred Benson"
			}
		  },
		  "aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": "4.4",
			"reviewCount": "89"
		  },
		  "offers": {
			"@type": "Offer",
			"url": "https://example.com/anvil",
			"priceCurrency": "USD",
			"price": "119.99",
			"priceValidUntil": "2020-11-20",
			"itemCondition": "https://schema.org/UsedCondition",
			"availability": "https://schema.org/InStock"
		  }
		}
	  `,
    }
  }

  return (
    <div>
      <Head>
        <title>Current Product</title>{' '}
        <meta
          name="description"
          content="Super product with free shipping."
          key="desc"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <h1>Product</h1>
      <p>Product for sale</p>
      <NavLink href="/products">Back to products</NavLink>
    </div>
  )
}

export default ProductPage
