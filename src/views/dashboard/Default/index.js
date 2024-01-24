import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { getLocalStorage } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import useOrders from '../../../hooks/useOrders';

const Dashboard = () => {
  const navigate = useNavigate();

  const { totalOrders, totalSells, isLoading: isLoadingOrders, isLoadingTotalSells, dataLastOrders, isLoadingLastOrders } = useOrders();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    if (!getLocalStorage('user') && !getLocalStorage('session')) {
      navigate('/login');
    }
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item container xs={12} md={8} spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item md={6} sm={6} xs={12}>
              <EarningCard isLoading={isLoadingTotalSells} value={totalSells} />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TotalOrderLineChartCard isLoading={isLoadingOrders} value={totalOrders} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <PopularCard isLoading={isLoadingLastOrders} lastOrders={dataLastOrders} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
