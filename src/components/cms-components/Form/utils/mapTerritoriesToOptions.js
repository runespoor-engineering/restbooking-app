const mapTerritoriesToOptions = (data) =>
  data.reduce(
    (acc, territory) => [
      ...acc,
      { value: territory.id, label: territory.name, iso: territory.iso }
    ],
    []
  );

export default mapTerritoriesToOptions;
