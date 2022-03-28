export default {
  widgets: [
    // {
    //   name: 'sanity-tutorials',
    //   options: {
    //     templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
    //   }
    // },
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6241d1563f6e2a34baede17e',
                  title: 'Sanity Studio',
                  name: 'sanity-nextjs-translation-test-studio',
                  apiId: '7fddcea8-c1df-4e72-bd31-e3e1fd07f625'
                },
                {
                  buildHookId: '6241d1562271f4312f76cadf',
                  title: 'Landing pages Website',
                  name: 'sanity-nextjs-translation-test',
                  apiId: '2d198cf3-f91a-4a12-8602-ace74c4c9919'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/kevinfoerster/sanity-nextjs-translation-test',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://sanity-nextjs-translation-test.netlify.app', category: 'apps' }
        ]
      }
    },
    {
      name: 'document-list',
      options: { title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page'] },
      layout: { width: 'medium' }
    },
    { name: 'project-users', layout: { height: 'auto' } }
  ]
}
