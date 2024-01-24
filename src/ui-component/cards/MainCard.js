import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};
const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      addButtonLink,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    const navigation = useNavigate();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 25,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {title && (
          <CardHeader
            sx={headerSX}
            title={
              <HeaderContainer>
                <Typography variant="h4">{title}</Typography>
                {addButtonLink?.url && addButtonLink?.title && (
                  <Button disableElevation size="large" variant="contained" color="secondary" onClick={() => navigation(addButtonLink.url)}>
                    {addButtonLink.title}
                  </Button>
                )}
              </HeaderContainer>
            }
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
