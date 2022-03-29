const imageWithAlt = {
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  description: 'fall image description',
  fields: [
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description:
        'The text alternative should be at least a short description conveying the essential information presented by the image. Do not use "image of …"',
      translatable: true,
      searchable: true,
      
    },
    
  ],
  
};

export default imageWithAlt;
