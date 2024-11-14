import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

const parser = new MarkdownIt()

export const GET: APIRoute = async context => {
  const posts = await getCollection('posts')

  return rss({
    stylesheet: '/rss/styles.xsl',
    title: 'Astro Blog',
    description: 'A simple astro blog created by roblesdotdev',
    site: context.site?.toString() ?? '',
    items: posts.map(post => ({
      title: post.data.title,
      link: `/blog/${post.slug}`,
      pubDate: new Date(post.data.date),
      content: sanitizeHtml(parser.render(post.body)),
      image: post.data.image,
    })),
  })
}
