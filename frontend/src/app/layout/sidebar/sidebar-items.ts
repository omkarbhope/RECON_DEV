import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Workflow', icon: 'menu-icon ti-layout', class: 'menu-toggle', groupTitle: false,
        submenu: [
            {
                path: '', title: 'Master', icon: '', class: 'ml-sub-menu', groupTitle: false, submenu: [
                    { path: '/workflow/activity', title: 'Activity', icon: '', class: '', groupTitle: false, submenu: [] },
                ]
            },
            {
              path: '/', title: 'Transaction', icon: '', class: 'ml-sub-menu', groupTitle: false, submenu: [
                { path: '/', title: 'Transaction 1', icon: '', class: '', groupTitle: false, submenu: [] },
                { path: '/', title: 'Transaction 2', icon: '', class: '', groupTitle: false, submenu: [] }
    
              ]
            }
        ] 
    },
    {
    path: '', title: 'Common Setup', icon: 'menu-icon ti-layout', class: 'menu-toggle', groupTitle: false,
    submenu: [
        {
            path: '', title: 'Master', icon: '', class: 'ml-sub-menu', groupTitle: false, submenu: [
                { path: '/common-setup/uom', title: 'UOM', icon: '', class: '', groupTitle: false, submenu: [] },
                { path: '/common-setup/currency', title: 'Currency', icon: '', class: '', groupTitle: false, submenu: [] },
                { path: '/common-setup/location', title: 'Location', icon: '', class: '', groupTitle: false, submenu: [] },
                { path: '/common-setup/userform', title: 'UserForm', icon: '', class: '', groupTitle: false, submenu: [] },
            ]
        },
        {
          path: '/', title: 'Transaction', icon: '', class: 'ml-sub-menu', groupTitle: false, submenu: [
            { path: '/', title: 'Transaction 1', icon: '', class: '', groupTitle: false, submenu: [] },
            { path: '/', title: 'Transaction 2', icon: '', class: '', groupTitle: false, submenu: [] }

          ]
        }
    ] 
}, 
{
  path: '', title: 'Company Setup', icon: 'menu-icon ti-layout', class: 'menu-toggle', groupTitle: false,
  submenu: [
      {
          path: '', title: 'Master', icon: '', class: 'ml-sub-menu', groupTitle: false, submenu: [
              { path: '/company-setup/company', title: 'Company', icon: '', class: '', groupTitle: false, submenu: [] }
          ]
      }
  ]
},
{
  path: '', title: 'API Hub Setup', icon: 'menu-icon ti-layout', class: 'menu-toggle', groupTitle: false,
  submenu: [
      {
          path: '', title: 'Master', icon: '', class: 'ml-sub-menu', groupTitle: false, submenu: [
              { path: '/api-hub/define-standard-api-definition', title: 'Standard API Definition', icon: '', class: '', groupTitle: false, submenu: [] }
          ]
      }
  ]
},
{
  path: '', title: 'Reconcilation', icon: 'menu-icon ti-layout', class: 'menu-toggle', groupTitle: false,
  submenu: [
      {
          path: '', title: 'Master', icon: '', class: 'ml-sub-menu', groupTitle: false, submenu: [
              { path: '/reconcilation/define_reconcilation', title: 'Define Reconcilation', icon: '', class: '', groupTitle: false, submenu: [] }
          ]
      }
  ]
}
];
