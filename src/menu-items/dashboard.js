// assets
import { IconDashboard } from '@tabler/icons';
import { Person, Store, ReceiptLong, AccountBalance } from '@mui/icons-material';
// constant
const icons = { IconDashboard, Person, Store, ReceiptLong, AccountBalance };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.IconDashboard,
      breadcrumbs: false,
      isAdmin: false
    },
    {
      id: 'user',
      title: 'Usuarios',
      type: 'item',
      url: '/users',
      icon: icons.Person,
      breadcrumbs: false,
      isAdmin: true
    },
    {
      id: 'products',
      title: 'Productos',
      type: 'item',
      url: '/products',
      icon: icons.Store,
      breadcrumbs: false,
      isAdmin: false
    },
    {
      id: 'orders',
      title: 'Ordenes',
      type: 'item',
      url: '/orders',
      icon: icons.ReceiptLong,
      breadcrumbs: false,
      isAdmin: false
    },
    {
      id: 'banks',
      title: 'Bancos',
      type: 'item',
      url: '/banks',
      icon: icons.AccountBalance,
      breadcrumbs: false,
      isAdmin: true
    }
  ]
};

export default dashboard;
