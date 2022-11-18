import { createClient } from 'next-sanity';

const client = createClient({
  projectId: "i5ilgqfl",
  dataset: "production",
  apiVersion: "2022-11-18",
  useCdn: false,
  token: "skBRds6zkgSGZZS9VC9ZyD64bkPUJyBcxJHP9nofVc6rlO9TrNgiEhCj9BuyHvjLxyQq7vQVAAmNQDgA6HCMt5koCiZgb6hlhzEsrqJAPDvTUIm79NIbWlWwVwpmKiPXLclUMRchsKMWJDIlqNZfprVFEGnx9smAZJqR3nXPI4FrdClTs6yk"
})

export default client;