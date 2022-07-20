import isEmptyObject from '../../../../helpers/utils'

export const NODE_TYPES = {
  dependentClaim: 'dependentClaim',
  dependentClaimsParent: 'dependentClaimsParent',
  natureOfChallenge: 'natureOfChallenge',
  priorArt: 'priorArt',
  priorArtCombination: 'priorArtCombination',
  root: 'root',
}

interface IPriorArt {
  tag: string
}
export interface IPriorArts {
  [x: string]: IPriorArt
}

interface IPa {
  prior_art_id: number
  nature: string
}
interface IPriorArtCombinations {
  [combinationNumber: string]: IPa[]
}

export interface IClaim {
  id: number
  claim_number: string
  claim_text: string
  grounds_of_challenge: {
    [natureOfChallenge: string]: IPriorArtCombinations
  }
  dependent_claims: number[]
}
export interface IClaims {
  [x: string]: IClaim
}

function getPriorArtLabel(pa: IPa, priorArts: IPriorArts) {
  const priorArt = priorArts[String(pa.prior_art_id)]
  const { tag } = priorArt || {}
  const priorArtNature = pa.nature === 'primary' ? '*' : ''
  return `${tag} ${priorArtNature}`
}

function getGroundsOfChallengeTree(claim: IClaim, priorArts: IPriorArts) {
  const groundsOfChallengeTree: any = []
  const groundsOfChallenge = claim.grounds_of_challenge
  let groundCount = 0

  for (const natureOfChallenge in groundsOfChallenge) {
    if (groundsOfChallenge.hasOwnProperty(natureOfChallenge)) {
      const priorArtCombinations = groundsOfChallenge[natureOfChallenge]

      const natureOfChallengeChildren: any = []

      for (const paCombinationNumber in priorArtCombinations) {
        if (priorArtCombinations.hasOwnProperty(paCombinationNumber)) {
          groundCount += 1
          const pas = priorArtCombinations[paCombinationNumber]

          natureOfChallengeChildren.push({
            children: pas.map((pa: IPa) => ({
              documentDetails: priorArts[pa.prior_art_id],
              hasDetailsClick: true,
              id: pa.prior_art_id,
              name: getPriorArtLabel(pa, priorArts),
              nodeType: NODE_TYPES.priorArt,
            })),
            documentDetails: priorArts,
            hasDetailsClick: true,
            name: `Ground ${groundCount}`,
            nodeType: NODE_TYPES.priorArtCombination,
          })
        }
      }

      const natureOfChallengeTree: any = {
        children: natureOfChallengeChildren,
        name: natureOfChallenge ? natureOfChallenge : 'Anticipation',
        nodeType: NODE_TYPES.natureOfChallenge,
      }
      groundsOfChallengeTree.push(natureOfChallengeTree)
    }
  }
  return groundsOfChallengeTree
}

function getDependentClaimsSubTree(claims: IClaims, claim: IClaim) {
  const claimNodes: any = []
  const dependentClaimIds = claim.dependent_claims

  for (const dependentClaimId of dependentClaimIds) {
    claimNodes.push({
      id: dependentClaimId,
      name: `Claim ${
        claims[String(dependentClaimId)] &&
        claims[String(dependentClaimId)].claim_number
      }`,
      nodeType: NODE_TYPES.dependentClaim,
    })
  }

  return {
    children: claimNodes,
    name: 'Dependent claims',
    nodeType: NODE_TYPES.dependentClaimsParent,
  }
}

function buildTreeDataForClaim(
  claims: IClaims,
  priorArts: IPriorArts,
  claim: IClaim
) {
  let children: any = []
  if (claim.dependent_claims.length > 0) {
    children.push(getDependentClaimsSubTree(claims, claim))
  }

  if (
    claim.grounds_of_challenge &&
    !isEmptyObject(claim.grounds_of_challenge)
  ) {
    children = [...children, ...getGroundsOfChallengeTree(claim, priorArts)]
  }

  const tree = {
    children,
    id: claim.id,
    name: `Claim ${claim.claim_number}`,
    nodeType: NODE_TYPES.root,
  }

  return tree
}

function buildTreeData(claims: IClaims, priorArts: IPriorArts) {
  const tree = Object.values(claims).map((claim: IClaim) =>
    buildTreeDataForClaim(claims, priorArts, claim)
  )
  return tree
}

export { buildTreeData, buildTreeDataForClaim }
