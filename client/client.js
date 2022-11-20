import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

export default client;