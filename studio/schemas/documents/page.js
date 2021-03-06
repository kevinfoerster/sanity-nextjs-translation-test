import { MasterDetailIcon } from '@sanity/icons'
const contentTypes = [
  // { type: 'hero' },
  // { type: 'imageSection' },
  // { type: 'mailchimp' },
  // { type: 'textSection' },
  { type: 'm0016' },
]

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: MasterDetailIcon,
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'link',
      type: 'internalLink'
    },
    {
      name: 'cta',
      type: 'cta',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      of: contentTypes,
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'This description populates meta-tags on the webpage',
      fieldset: 'metadata',
    },
    {
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      fieldset: 'metadata',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'openGraphImage',
    },
  },
}

export {contentTypes}
