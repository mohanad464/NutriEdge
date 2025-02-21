import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: 'lm4kwhqh',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: true
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}