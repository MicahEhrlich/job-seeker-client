import type { InterviewStage, Job } from "../types"
import { inferStatusFromStages, sortInterviewStages } from "../utils"

export const JobService = {
    handleAddQuestion(newQuestion: string, questions: string[], interviewStage: InterviewStage, setQuestions: React.Dispatch<React.SetStateAction<string[]>>, onUpdateStage: (updatedStage: InterviewStage) => void) {
        if (!newQuestion.trim()) return
        const updatedQuestions = [...questions, newQuestion.trim()]
        const updatedStage = { ...interviewStage, questionsAsked: updatedQuestions }
        setQuestions(updatedQuestions)
        onUpdateStage(updatedStage)
    },
    handleDeleteQuestion(index: number, questions: string[], setQuestions: React.Dispatch<React.SetStateAction<string[]>>, interviewStage: InterviewStage, onUpdateStage: (updatedStage: InterviewStage) => void) {
        const updatedQuestions = questions.filter((_, i) => i !== index)
        const updatedStage = { ...interviewStage, questionsAsked: updatedQuestions }
        setQuestions(updatedQuestions)
        onUpdateStage(updatedStage)
    },
    updateJobStages(interview_stages: InterviewStage[], job: Job, onUpdateJob: (updatedJob: Job) => void) {
        const sortedStages = sortInterviewStages(interview_stages)
        const inferredStatus = inferStatusFromStages(sortedStages, job.status === 'rejected')
        onUpdateJob({
            ...job,
            interview_stages: sortedStages,
            status: inferredStatus,
        })
    }

}