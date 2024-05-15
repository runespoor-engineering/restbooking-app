import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { arrayOf, node, shape, string } from 'prop-types';
import { useState } from 'react';

import Image from '../../../../common/Image';
import NextLinkComposed from '../../../../common/NextLinkComposed';
import CollapseIcon from '../CollapseIcon/CollapseIcon';
import ExpandIcon from '../ExpandIcon/ExpandIcon';
import NavigationSubItem from '../NavigationSubItem/NavigationSubItem';

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  marginRight: '12px',
  backgroundColor: theme.palette.tertiary.light,
  borderRadius: '6px'
}));

const NavigationItem = ({
  icon,
  menuSubItems,
  complexSx,
  collapseIconAttributes,
  expandIconAttributes,
  children,
  activeMenuSubItemLink,
  navigationSubItemComplexSx
}) => {
  const iconAttributes = icon?.data?.attributes;
  const [isMenuItemCollapsed, setIsMenuItemCollapsed] = useState(false);
  const {
    iconBoxSx,
    navigationItemBoxSx,
    subItemsCollapseBoxSx,
    imageProps,
    collapseImageProps,
    subItemsCollapseContainerProps
  } = complexSx;

  const {
    navigationSubItemBoxSx,
    activeNavigationSubItemBoxSx,
    navigationSubItemIconBoxSx,
    navigationSubItemTypographySx,
    activeNavigationSubItemTypographySx
  } = navigationSubItemComplexSx;

  const handleMenuItemCollapse = (e) => {
    e.preventDefault();
    setIsMenuItemCollapsed(!isMenuItemCollapsed);
  };

  return (
    <>
      <MenuItem
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'primary.contrastText',
          ...navigationItemBoxSx
        }}
      >
        {iconAttributes && (
          <IconContainer sx={iconBoxSx}>
            <Image
              alt={iconAttributes.alternativeText}
              height={16}
              src={iconAttributes.url}
              width={16}
              {...imageProps}
            />
          </IconContainer>
        )}
        {children}
        {!!menuSubItems?.length &&
          (isMenuItemCollapsed ? (
            <CollapseIcon
              collapseIconAttributes={collapseIconAttributes}
              collapseImageSettings={collapseImageProps}
              data-testId="PrimaryNavigation-sidebar-CollapseIcon"
              handleMenuItemCollapse={handleMenuItemCollapse}
            />
          ) : (
            <ExpandIcon
              data-testId="PrimaryNavigation-sidebar-ExpandIcon"
              expandIconAttributes={expandIconAttributes}
              expandImageSettings={collapseImageProps}
              handleMenuItemCollapse={handleMenuItemCollapse}
            />
          ))}
      </MenuItem>
      {!!menuSubItems?.length && (
        <Collapse
          timeout="auto"
          {...subItemsCollapseContainerProps}
          data-cp="subItemsCollapseContainerProps"
          in={isMenuItemCollapsed}
        >
          <Box
            data-testid="PrimaryNavigation-sidebar-subNav"
            sx={{ pl: '36px', ...subItemsCollapseBoxSx }}
          >
            {menuSubItems?.map((menuSubItem) => {
              const currentNavigationSubItemBoxSx =
                activeMenuSubItemLink === menuSubItem.link
                  ? activeNavigationSubItemBoxSx
                  : navigationSubItemBoxSx;
              const currentNavigationSubItemTypographySx =
                activeMenuSubItemLink === menuSubItem.link
                  ? activeNavigationSubItemTypographySx
                  : navigationSubItemTypographySx;
              return (
                <NextLinkComposed key={menuSubItem?.id} passHref to={menuSubItem.link}>
                  <NavigationSubItem
                    complexSx={{
                      iconBoxSx: navigationSubItemIconBoxSx,
                      navigationSubItemBoxSx: currentNavigationSubItemBoxSx
                    }}
                    data-testid="PrimaryNavigation-sidebar-subNav-link"
                    icon={menuSubItem.icon}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '14px', lg: '16px' },
                        lineHeight: { xs: '16px', lg: '18px' },
                        ...currentNavigationSubItemTypographySx
                      }}
                    >
                      {menuSubItem.text}
                    </Typography>
                  </NavigationSubItem>
                </NextLinkComposed>
              );
            })}
          </Box>
        </Collapse>
      )}
    </>
  );
};

const primaryNavigationItemComplexSxType = shape({
  navigationItemBoxSx: shape(),
  iconBoxSx: shape(),
  subItemsCollapseBoxSx: shape(),
  imageProps: shape(),
  collapseImageProps: shape(),
  subItemsCollapseContainerProps: shape()
});

NavigationItem.propTypes = {
  children: node,
  icon: shape(),
  complexSx: primaryNavigationItemComplexSxType,
  menuSubItems: arrayOf(shape()),
  collapseIconAttributes: shape(),
  expandIconAttributes: shape(),
  navigationSubItemComplexSx: shape(),
  activeMenuSubItemLink: string
};

NavigationItem.defaultProps = {
  children: '',
  icon: null,
  menuSubItems: null,
  complexSx: {},
  collapseIconAttributes: null,
  navigationSubItemComplexSx: {},
  expandIconAttributes: null,
  activeMenuSubItemLink: null
};

export default NavigationItem;
