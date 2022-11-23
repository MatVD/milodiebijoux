// typings.d.ts => "typings" = typages et "d" = definition
// fichier source des définitions de typage Typescript

export interface Context {
  params: {
    slug: string
  }
}

export interface Products {
  _createdAt: string,
  title: string,
  _id: string,
  _type: string,
  price: number,
  currency: string,
  image: string,
  slug: {
    current: string
  },
  description: string,
  category: [
    {
      _ref: string
    }
  ]
}