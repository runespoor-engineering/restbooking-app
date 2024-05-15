const mockCmsStaticDataNavigations = {
  data: [
    {
      attributes: {
        type: 'primary',
        channel: 'generic',
        authenticationState: 'anonymous',
        menuGroups: [
          {
            id: '97',
            title: null,
            menuItems: [
              {
                id: '577',
                text: 'Home',
                link: '/',
                menuSubItems: []
              },
              {
                id: '578',
                text: 'Promotions',
                link: '/promotions',
                menuSubItems: []
              },
              {
                id: '689',
                text: 'Thrilling chases',
                link: '/thrilling-chases',
                menuSubItems: []
              },
              {
                id: '690',
                text: 'Wonder boxes',
                link: '/wonder-boxes',
                menuSubItems: []
              },
              {
                id: '684',
                text: 'Promo calendar',
                link: '/calendar',
                menuSubItems: []
              },
              {
                id: '582',
                text: 'FAQ',
                link: '/faq',
                menuSubItems: []
              }
            ]
          }
        ]
      }
    }
  ]
};

// eslint-disable-next-line import/prefer-default-export
export const mockCmsStaticData = (settings, isRedDog) => ({
  navigations: mockCmsStaticDataNavigations,
  layout: {
    attributes: {
      sidebarSettings: {
        defaultSettings: settings
      },
      anonymousSidebarUiComponents: [
        {
          __typename: 'ComponentPageComponentsLogo',
          id: '14',
          logoSizeSwitchingBreakpoint: 'mdUp',
          useBreakpoint: {
            id: '58',
            breakpoint: 'xsUp'
          },
          lightLarge: {
            data: {
              attributes: {
                url: !isRedDog
                  ? 'https://comicplay-casino.dev.clover.tech/assets/Logo_CP_1_2_ad1eb5c6ec.svg'
                  : 'https://reddog-casino.dev.clover.tech/assets/logo_24e9799f95.svg'
              }
            }
          },
          lightSmall: {
            data: {
              attributes: {
                url: !isRedDog
                  ? 'https://comicplay-casino.dev.clover.tech/assets/Logo_CP_1_2_ad1eb5c6ec.svg'
                  : 'https://reddog-casino.dev.clover.tech/assets/logo_24e9799f95.svg'
              }
            }
          },
          darkLarge: {
            data: {
              attributes: {
                url: !isRedDog
                  ? 'https://comicplay-casino.dev.clover.tech/assets/Logo_CP_1_2_ad1eb5c6ec.svg'
                  : 'https://reddog-casino.dev.clover.tech/assets/logo_24e9799f95.svg'
              }
            }
          },
          darkSmall: {
            data: {
              attributes: {
                url: !isRedDog
                  ? 'https://comicplay-casino.dev.clover.tech/assets/Logo_CP_1_2_ad1eb5c6ec.svg'
                  : 'https://reddog-casino.dev.clover.tech/assets/logo_24e9799f95.svg'
              }
            }
          },
          settings: null,
          componentGridItemSettings: {
            id: '1514',
            defaultSettings: {
              xs: 6
            },
            customSettings: null,
            useCustomSettings: false
          },
          smallImageDimensions: {
            id: '19',
            width: 105,
            height: 43
          },
          largeImageDimensions: {
            id: '20',
            width: 105,
            height: 43
          }
        },
        {
          __typename: 'ComponentButtonsGlobalAnonymousActionButton',
          id: '12',
          isMuiIconButton: true,
          muiButtonText: null,
          muiButtonAnonymousAction: 'closeSidebar',
          muiButtonLink: null,
          muiIconButtonIcon: {
            data: {
              attributes: {
                url: 'https://comicplay-casino.dev.clover.tech/assets/Vector_4_bbfc946727.svg'
              }
            }
          },
          muiButtonStartIcon: {
            data: null
          },
          muiButtonEndIcon: {
            data: null
          },
          settings: {
            id: '5532',
            defaultSettings: {
              sx: {
                border: '1px solid #2B2B2B',
                'box-shadow':
                  '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
                'border-radius': '5px'
              }
            },
            customSettings: null,
            useCustomSettings: false
          },
          componentGridItemSettings: {
            id: '3206',
            defaultSettings: {
              sx: {
                ml: 'auto'
              },
              xs: null
            },
            customSettings: null,
            useCustomSettings: false
          },
          useBreakpoint: {
            id: '313',
            breakpoint: 'xsUp'
          }
        },
        {
          __typename: 'ComponentButtonsGlobalAnonymousActionButton',
          id: '14',
          isMuiIconButton: false,
          muiButtonText: 'Log in',
          muiButtonAnonymousAction: 'openLink',
          muiButtonLink: '?modal=iqs-sign-in',
          muiIconButtonIcon: {
            data: null
          },
          muiButtonStartIcon: {
            data: null
          },
          muiButtonEndIcon: {
            data: null
          },
          settings: {
            id: '3212',
            defaultSettings: {
              sx: {
                width: '100%'
              },
              size: 'small',
              color: 'secondary',
              variant: 'outlined'
            },
            customSettings: null,
            useCustomSettings: false
          },
          componentGridItemSettings: {
            id: '3213',
            defaultSettings: {
              xs: 6
            },
            customSettings: null,
            useCustomSettings: false
          },
          useBreakpoint: {
            id: '315',
            breakpoint: 'xsUp'
          }
        },
        {
          __typename: 'ComponentButtonsGlobalAnonymousActionButton',
          id: '13',
          isMuiIconButton: false,
          muiButtonText: 'Sign up',
          muiButtonAnonymousAction: 'openLink',
          muiButtonLink: '?modal=iqs-sign-up',
          muiIconButtonIcon: {
            data: null
          },
          muiButtonStartIcon: {
            data: null
          },
          muiButtonEndIcon: {
            data: null
          },
          settings: {
            id: '3210',
            defaultSettings: {
              sx: {
                width: '100%'
              },
              size: 'small',
              color: 'custom-red',
              variant: 'contained'
            },
            customSettings: null,
            useCustomSettings: false
          },
          componentGridItemSettings: {
            id: '3211',
            defaultSettings: {
              xs: 6
            },
            customSettings: null,
            useCustomSettings: false
          },
          useBreakpoint: {
            id: '314',
            breakpoint: 'xsUp'
          }
        },
        {
          __typename: 'ComponentNavigationsPrimaryNavigation',
          id: '6',
          useBreakpoint: {
            id: '53',
            breakpoint: 'xsUp'
          },
          settings: {
            id: '6955',
            defaultSettings: {
              activeNavigationItemTypographySx: {
                color: '#FFE400'
              }
            },
            customSettings: null,
            useCustomSettings: false
          },
          componentGridItemSettings: {
            id: '1505',
            defaultSettings: {
              sx: {
                '& li': {
                  paddingLeft: '0'
                },
                '& nav > div:not(:first-child)': {
                  marginTop: '0px!important'
                }
              },
              xs: 12
            },
            customSettings: null,
            useCustomSettings: false
          },
          expandIcon: {
            data: null
          },
          collapseIcon: {
            data: null
          }
        },
        {
          __typename: 'ComponentButtonsGlobalAnonymousActionButton',
          id: '68',
          isMuiIconButton: false,
          muiButtonText: 'menu',
          muiButtonAnonymousAction: 'openSidebar',
          settings: {
            id: '9017',
            defaultSettings: {
              sx: {
                top: 0,
                left: '288px',
                width: {
                  lg: '140px',
                  md: '140px',
                  sm: '140px',
                  xl: '140px',
                  xs: '50px'
                },
                height: {
                  lg: '70px',
                  md: '70px',
                  sm: '70px',
                  xl: '70px',
                  xs: '50px'
                },
                padding: '0',
                position: 'absolute',
                fontSize: {
                  sm: '14px',
                  xs: '0px'
                },
                minWidth: {
                  xs: 'initial'
                },
                transform: 'none',
                transition: '.3s ease-in',
                borderRadius: '0',
                '& > span:first-child': {
                  margin: {
                    sm: '0 8px 0 -4px',
                    xs: '0'
                  }
                }
              },
              size: 'medium',
              color: 'primary',
              variant: 'contained'
            },
            customSettings: null,
            useCustomSettings: false
          },
          componentGridItemSettings: {
            id: '9018',
            defaultSettings: {
              sx: {
                '& > .MuiBox-root': {
                  position: 'inherit'
                }
              }
            },
            customSettings: null,
            useCustomSettings: false
          },
          useBreakpoint: {
            id: '1226',
            breakpoint: 'xsUp'
          }
        }
      ]
    }
  }
});
