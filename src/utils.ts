import type { InterviewStage } from "./types"

export const statusColor = (status: string) => {
    switch (status) {
        case 'applied': return 'bg-gray-400'
        case 'interviewing': return 'bg-yellow-400'
        case 'offered': return 'bg-green-500'
        case 'rejected': return 'bg-red-500'
        default: return 'bg-gray-300'
    }
}

export const inferStatusFromStages = (stages: InterviewStage[], rejectedFlag = false) => {
  if (rejectedFlag || stages?.some(s => s.status === 'cancelled')) {
    return 'rejected'
  }

  if (!stages || stages.length === 0) return 'applied'

  const allDone = stages.every(s => s.status === 'done')
  if (allDone) return 'offered'

  const anyActive = stages.some(
    s => s.status === 'upcoming' || s.status === 'pending'
  )
  if (anyActive) return 'interviewing'

  return 'applied'
}
