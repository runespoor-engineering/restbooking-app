import constant from 'lodash/constant';
import times from 'lodash/times';

const mockNavigationsData = () => ({
  navigations: {
    data: [
      {
        attributes: {
          authenticationState: 'authenticated',
          channel: 'generic',
          type: 'playerAccount',
          menuGroups: [
            {
              title: null,
              id: 333,
              menuItems: [
                ...times(4, constant(null)).map((_, index) => ({
                  text: `Menu Item Text ${index}`,
                  id: `id-${index}`,
                  link: `/link-to-${index}`,
                  icon: {
                    data: {
                      attributes: {
                        url: '/yellow-smile.svg'
                      }
                    }
                  },
                  menuSubItems: []
                }))
              ]
            }
          ]
        }
      }
    ]
  }
});

export default mockNavigationsData;
