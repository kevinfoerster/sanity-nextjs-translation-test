export const m0016Links = {
name: 'm0016Links',
title: 'm0016Links',
type: 'object',
fields: [
    {
    name: 'categoryLink',
    title: 'Category link',
    description: 'Either an external or internal link can be maintained',
    type: 'array',
    of: [{ type: 'internalLink' }, { type: 'externalLink' }],    },
    {
    name: 'childLinks',
    title: 'Child links',
    type: 'array',
    of: [{ type: 'internalLink' }, { type: 'externalLink' }],    },
]
};

export const m0016SocialMediaLogos = {
name: 'm0016SocialMediaLogos',
title: 'm0016SocialMediaLogos',
type: 'object',
fields: [
    {
    name: 'socialMediaLogoLink',
    title: 'Link',
    type: 'externalLink',
    },
    {
    name: 'image',
    title: 'Image',
    type: 'imageWithAlt',    },
]
};

const m0016 = {
name: 'm0016',
title: '4. Footer - M0016',
type: 'object',
fields: [
    {
    name: 'logoLink',
    title: 'Logo link',
    type: 'internalLink',
    },
    {
    name: 'text',
    title: 'Text',
    type: 'text',
    description: 'Text below the logo.',
    translatable: true,
    searchable: true,    },
    {
    name: 'buttonText',
    title: 'Button text',
    type: 'string',
    description: 'Label of the Button.',
    translatable: true,
    searchable: true,
    },
    {
    name: 'contactModule',
    title: 'Contact Modal',
    description:
        'Optional Contact Modal (with Partner Finder). Can be opened with the previous `ButtonText` button',
    type: 'reference',
    to: [{ type: 'page' }],
    },
    {
    name: 'links',
    title: 'Links',
    type: 'array',
    description:
        'Categories with child links are displayed with a hat and without child links are displayed with a diamond in the preview',
    of: [{ type: 'm0016Links' }],    },
    {
    name: 'socialMediaLogos',
    title: 'Social media logos',
    type: 'array',
    of: [{ type: 'm0016SocialMediaLogos' }],    },
    {
    name: 'legalLinks',
    title: 'Legal links',
    type: 'array',
    of: [{ type: 'internalLink' }, { type: 'externalLink' }],    },
    {
    name: 'paymentLogos',
    title: 'Payment Logos',
    description: 'Only use images with an 3:2 aspect ratio',
    type: 'array',
    of: [{ type: 'imageWithAlt' }],    },
],
};

export default m0016;
