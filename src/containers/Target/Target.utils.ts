import { STAGES } from '../DealsDashboard/Filter/DealsActivityFilter/StageFilter'

export function getStageName(phase: number) {
  const currentStage: any = STAGES.find((stage) => stage[1] === phase)
  return currentStage?.[0]
}
