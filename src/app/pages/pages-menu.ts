import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'ELECCIONES',
    group: true,
  },
  {
    title: 'Reportes',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Dashboard',
        link: '/pages/mesas/crear',
      },
      {
        title: 'Candidatos',
        link: '/pages/mesas/listar',
      },
      {
        title: 'Mesas',
        link: '/pages/mesas/listar',
      },
      {
        title: 'Partidos',
        link: '/pages/mesas/listar',
      }
    ],
  },
  {
    title: 'Mesas',
    icon: 'grid-outline',
    children: [
      {
        title: 'Crear',
        link: '/pages/mesas/crear',
      },
      {
        title: 'Listar',
        link: '/pages/mesas/listar',
      }
    ],
  },
  {
    title: 'Partidos Politicos',
    icon: 'people-outline',
    children: [
      {
        title: 'Crear',
        link: '/pages/partidos/crear',
      },
      {
        title: 'Listar',
        link: '/pages/partidos/listar',
      },
    ],
  },
  {
    title: 'Candidatos',
    icon: 'person-outline',
    children: [
      {
        title: 'Crear',
        link: '/pages/candidatos/crear',
      },
      {
        title: 'Listar',
        link: '/pages/candidatos/listar',
      }
    ],
  },
  {
    title: 'Registro Votos',
    icon: 'edit-2-outline',
    link: '/pages/resultados/crear'
  },
  {
    title: 'SEGURIDAD',
    group: true,
  },
  {
    title: 'Usuarios',
    icon: 'lock-outline',
    children: [
      {
        title: 'Crear',
        link: '/pages/usuarios/crear',
      },
      {
        title: 'Listar',
        link: '/pages/usuarios/listar',
      },
    ],
  },
  {
    title: 'Roles',
    icon: 'layers-outline',
    children: [
      {
        title: 'Crear',
        link: '/pages/roles/crear',
      },
      {
        title: 'Listar',
        link: '/pages/roles/listar',
      },
    ],
  },
  // VVV BORRAR TODO DE ACA PARA ABAJO VVV
  /* {
    title: '--------------------------',
    group: true,
  },
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper',
      },
      {
        title: 'List',
        link: '/pages/layout/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/layout/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/layout/accordion',
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },
    ],
  },
  {
    title: 'UI Features',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    icon: 'browser-outline',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'map-outline',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid',
      },
    ],
  }, */

];
