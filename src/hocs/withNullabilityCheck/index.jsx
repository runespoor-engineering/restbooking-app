import get from 'lodash/get';

const withNullabilityCheck = (Component, pathsToPick) => (props) => {
  if (!get(props, pathsToPick)) {
    return null;
  }

  return Component ? <Component {...props} /> : null;
};

export default withNullabilityCheck;
