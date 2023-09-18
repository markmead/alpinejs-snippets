import Head from 'next/head'
import Script from 'next/script'

import { Inter } from 'next/font/google'

import matter from 'gray-matter'
import { join } from 'path'
import { promises as fs } from 'fs'

import 'prismjs/themes/prism-okaidia.css'
import '@style/site.css'
import '@style/prism.css'

import { siteMeta, ogMeta, twitterMeta } from '@data/metadata'

import Ads from '@/ads'
import Container from '@component/Container'

export const metadata = {
  ...siteMeta,
  openGraph: {
    ...ogMeta,
  },
  twitter: {
    ...twitterMeta,
  },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

async function getComponents() {
  const componentsPath = join(process.cwd(), '/src/data/components')
  const componentSlugs = await fs.readdir(componentsPath)

  const componentItems = await Promise.all(
    componentSlugs.map(async (componentSlug) => {
      const componentPath = join(componentsPath, componentSlug)
      const componentItem = await fs.readFile(componentPath, 'utf-8')

      const {
        data: { title, group },
      } = matter(componentItem)

      return {
        title,
        group,
        slug: componentSlug.replace('.mdx', ''),
      }
    })
  )

  const groupedComponentItems = componentItems.reduce((groupAcc, groupItem) => {
    const itemGroup = groupItem.group

    if (!groupAcc[itemGroup]) {
      groupAcc[itemGroup] = []
    }

    groupAcc[itemGroup].push(groupItem)

    return groupAcc
  }, {})

  Object.keys(groupedComponentItems).forEach((groupKey) => {
    groupedComponentItems[groupKey].sort((groupA, groupB) => {
      return groupA.title.localeCompare(groupB.title)
    })
  })

  Object.keys(groupedComponentItems).forEach((itemKey) => {
    groupedComponentItems[itemKey].sort((itemA, itemB) => {
      // return itemA.title.localeCompare(itemB.title)

      const itemALength = itemA.title.length
      const itemBLength = itemB.title.length

      return itemALength - itemBLength
    })
  })

  return groupedComponentItems
}

export default async function RootLayout({ children }) {
  const componentItems = await getComponents()

  return (
    <html className="h-full scroll-smooth" lang="en" dir="ltr">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_KEY}`}
      />

      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GA_KEY}');
        `}
      </Script>

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <body
        className={`${inter.variable} font-sans antialiased h-full bg-gray-50`}
      >
        <Container navItems={componentItems}>{children}</Container>

        <Ads />
      </body>
    </html>
  )
}
