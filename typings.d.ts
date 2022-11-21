// typings.d.ts => "typings" = typages et "d" = definition
// fichier source des définitions de typage Typescript

export interface Context {
  params: any,
}

export interface Products {
  _createdAt: any,
  title: string,
  _id: any,
  _type: string,
  price: number,
  currency: string,
  image: {
    asset: {
      _ref: string
    }
  },
  slug: {
    current: string
  },
  category: [
    {
      _ref: string
    }
  ]
}