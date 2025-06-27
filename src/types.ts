export type JobStatus = 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted';
export type InterviewStageStatus = 'pending' | 'upcoming' | 'done';
export type InterviewStage = {
    jobId: number
    stageId: number
    stage: string
    person: string
    date: string
    status: string
    notes?: string
    questionsAsked?: QuestionEntry[]
}

export type Job = {
    id: number
    company_name: string
    position: string
    status: JobStatus
    applied_date: string
    next_stage?: string
    notes?: string
    offer_details?: string
    interview_stages?: InterviewStage[]
    created_at?: string
}

export type QuestionEntry = {
  id: string
  question: string
  stageTitle: string
  jobTitle: string
  company: string
  tags: string[]
  dateAdded: string
}

export type JobStore = {
    jobs: Job[]
    addJob: (job: Job) => void
    updateJob: (id: string, update: Partial<Job>) => void
    deleteJob: (id: string) => void
    setJobs: (jobs: Job[]) => void
    updateStage: (updatedStage: InterviewStage) => void
    searchQuery: string
    setSearchQuery: (query: string) => void
}
