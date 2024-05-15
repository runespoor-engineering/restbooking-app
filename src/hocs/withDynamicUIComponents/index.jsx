const withDynamicUIComponents = (StaticErrorPage, RootPageComponent) => {
  return (props) => {
    // eslint-disable-next-line react/prop-types
    const { pageRequireds } = props;
    // eslint-disable-next-line react/prop-types
    const isUIComponentsExists = Boolean(pageRequireds?.data?.[0]?.attributes.uiComponents.length);
    if (!isUIComponentsExists) return <StaticErrorPage />;
    return <RootPageComponent {...props} />;
  };
};
export default withDynamicUIComponents;
