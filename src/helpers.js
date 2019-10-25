export function UrlBuilder(resourceType, queryParam, patientId) {
  const sandboxUrl = "https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca";
  const resource = '/' + resourceType;
  queryFormatter(queryParam, patientId);
  
  return `${sandboxUrl}${resource}${'?'}${new URLSearchParams(queryFormatter(queryParam, patientId))}`;
}

export function queryFormatter(queryParam, queryValue) {
  return {
    [queryParam]: queryValue
  }
};
