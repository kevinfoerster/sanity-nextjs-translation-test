import React from 'react';

const InternalLinkRender = ({ children }) => <span>{children} 🔗</span>;

// export default {
//   title: 'Internal link to another document',
//   name: 'internalLink',
//   type: 'reference',
//   description: 'Locate a document you want to link to',
//   to: [{ type: 'page' }, { type: 'route' }],
//   blockEditor: {
//     icon: () => '🔗',
//     render: InternalLinkRender,
//   },
// };




// import { buildInternalRoute } from '@bemer/base';
// import { FaRegStickyNote } from 'react-icons/fa';
// import LinkForm from '../components/input/LinkForm';

// import {
//   checkLocaleIdentifierMismatch,
//   isInternalLinkValid,
//   localeFilter,
// } from '../validations/sanityValidators';

const internalLink = {
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  description: 'Can be used inside text links or as button content',
  // inputComponent: LinkForm,
  fields: [
    {
      name: 'label',
      title: 'Label of the Internal link',
      type: 'string',
      description: 'Label of the internal Link.',
      translatable: true,
      searchable: true,
    },
    {
      name: 'to',
      title: 'Page to navigate to',
      type: 'reference',
      to: [{ type: 'page' }],
    },
    {
      name: 'anchor',
      title: 'Anchorlink to navigate',
      type: 'string',
      description:
        'You must first select a page before you can set an anchor link',
      options: {
        list: [],
      },
    },
  ],
  // validation: (Rule ) => Rule.custom(isInternalLinkValid),
  // preview: {
  //   select: {
  //     title: 'label',
  //     pageTitle: 'to.title',
  //     route: 'to',
  //   },
  //   prepare(selection) {
  //     return {
  //       title: selection.title,
  //       subtitle: `${buildInternalRoute(selection.route)} (${
  //         selection.pageTitle
  //       })`,
  //       media: FaRegStickyNote,
  //     };
  //   },
  // },
};

export default internalLink;
