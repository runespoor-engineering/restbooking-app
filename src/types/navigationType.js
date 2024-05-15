import { arrayOf, shape, string } from 'prop-types';

import iconType from './cmsComponents/common/imageType';

export default shape({
  id: string,
  type: string,
  channel: string,
  menuItems: arrayOf(
    shape({
      id: string,
      title: string,
      link: string,
      icon: iconType,
      menuSubItems: arrayOf(
        shape({
          id: string,
          title: string,
          link: string,
          icon: iconType
        })
      )
    })
  ),
  partners: arrayOf(
    shape({
      title: string,
      partner: shape({
        id: string,
        link: string,
        icon: iconType
      })
    })
  )
});
