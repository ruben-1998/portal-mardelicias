import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardActions, CardContent, Divider, Grid, IconButton, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading, lastOrders }) => {
  const navigation = useNavigate();

  const handleShowMore = () => {
    navigation('/orders');
  };

  const handleShowOrder = (id) => {
    navigation(`/orders/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Ultimos Pedidos</Typography>
                  </Grid>
                </Grid>
              </Grid>
              {lastOrders?.map((order, index) => (
                <Grid item xs={12} key={`last-order-${index}`}>
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1">Orden #{order?.id}</Typography>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                              {order?.created_at && (
                                <Typography variant="subtitle1" color="inherit">
                                  {moment(order.created_at).format('L, LT')}
                                </Typography>
                              )}
                            </Grid>
                            <Grid item sx={{ alignItems: 'center', color: '#2196f3', display: 'flex' }}>
                              <IconButton onClick={() => handleShowOrder(order.id)}>
                                <ArrowForwardIosIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      {order.users && (
                        <Typography variant="title">
                          {order.users.first_name} {order.users.last_name}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation onClick={handleShowMore}>
              Ver Todas
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
