const NODE_TYPES = {
  dependentClaim: 'dependentClaim',
  dependentClaimsParent: 'dependentClaimsParent',
  priorArt: 'priorArt',
  priorArtCombination: 'priorArtCombination',
  priorArtsParent: 'priorArtsParent',
  root: 'root',
}

export const mockData = {
  children: [
    {
      children: [
        {
          children: [
            { id: 1, name: 'Bernard', nodeType: NODE_TYPES.priorArt },
            { id: 2, name: 'Scott', nodeType: NODE_TYPES.priorArt },
            { id: 3, name: 'Malone', nodeType: NODE_TYPES.priorArt },
          ],
          name: 'Prior art Combination 1',
          nodeType: NODE_TYPES.priorArtCombination,
        },
        {
          children: [
            { id: 4, name: 'Halpert', nodeType: NODE_TYPES.priorArt },
            { id: 5, name: 'Schrute', nodeType: NODE_TYPES.priorArt },
          ],
          name: 'Prior art Combination 2',
          nodeType: NODE_TYPES.priorArtCombination,
        },
        {
          children: [
            { id: 6, name: 'Johnson', nodeType: NODE_TYPES.priorArt },
            { id: 7, name: 'Lublow', nodeType: NODE_TYPES.priorArt },
          ],
          name: 'Prior art Combination 3',
          nodeType: NODE_TYPES.priorArtCombination,
        },
      ],
      name: 'Prior arts',
      nodeType: NODE_TYPES.priorArtsParent,
    },
    {
      children: [
        { id: 2, name: 'Claim 2', nodeType: NODE_TYPES.dependentClaim },
        { id: 3, name: 'Claim 3', nodeType: NODE_TYPES.dependentClaim },
      ],
      name: 'Dependent claims',
      nodeType: NODE_TYPES.dependentClaimsParent,
    },
  ],
  id: 1,
  name: 'Claim 1',
  nodeType: NODE_TYPES.root,
}
