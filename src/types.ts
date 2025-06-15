export type JobStatus = 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted';
export type InterviewStageStatus = 'pending' | 'upcoming' | 'done';
export type InterviewStage = {
    stage: string
    person: string
    date: string
    status: string
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