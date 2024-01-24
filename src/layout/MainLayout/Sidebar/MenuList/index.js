import { Typography } from '@mui/material';

import NavGroup from './NavGroup';
//TODO: Remover items
import menuItem from 'menu-items';
import { useEffect } from 'react';
import { useState } from 'react';

const MenuList = () => {
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
