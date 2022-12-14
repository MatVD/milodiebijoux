export default {
  name: "product",
  title: "Produit",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    },
    {
      name: "body",
      title: "Description",
      type: "localeBlockContent",
    },
    {
      name: "price",
      title: "Prix",
      type: "number",
    },
    {
      name: "currency",
      title: "Devise",
      type: "string",
    },
    {
      title: "Images",
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
        },
      ],
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "category" },
        },
      ],
    },
  ],
};
