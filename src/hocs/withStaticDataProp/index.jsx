const withStaticDataProp =
  (Component) =>
  // eslint-disable-next-line react/prop-types
  ({ staticData, globalData }) =>
    Component ? <Component {...staticData} globalData={globalData} /> : null;

export default withStaticDataProp;
