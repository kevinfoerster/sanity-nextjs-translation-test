const externalLink = {
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  description: 'Can be used inside text links or as button content',
  fields: [
    {
      name: 'label',
      title: 'Label of the External Link',
      type: 'string',
      description: 'Label of the external Link.',
      translatable: true,
      searchable: true,
    },
    // TODO: presence icon does not work yet
    {
      name: 'externalLink',
      title: 'Link with combined protocol selector',
      description:
        'Select a "protocol" and "url" to create an external link, the protocol will also be used to display an icon in front of the element in certain cases.',
      type: 'url',
    },
    {
      name: 'target',
      title: 'How to open?',
      description: 'Open in the same browser tab or in a new window.',
      type: 'string',
      options: {
        list: [
          { title: 'same page', value: '' },
          { title: 'new window', value: '_blank' },
        ],
        layout: 'radio',
      },
    },
  ],
};

export default externalLink;
