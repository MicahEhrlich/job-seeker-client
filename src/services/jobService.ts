import type { InterviewStage, Job, QuestionEntry } from "../types"
import { inferStatusFromStages, sortInterviewStages } from "../utils"

export const JobService = {
    handleAddQuestion(newQuestion: string, questions: QuestionEntry[], interviewStage: InterviewStage, setQuestions: React.Dispatch<React.SetStateAction<QuestionEntry[]>>, onUpdateStage: (updatedStage: InterviewStage) => void) {
        if (!newQuestion.trim()) return;
        const newEntry: QuestionEntry = {
            id: Date.now().toString(),
            question: newQuestion.trim(),
            stageTitle: interviewStage.stage,
            jobTitle: "",
            company: "",
            tags: [],
            dateAdded: new Date().toISOString().slice(0, 10)
        };
        const updatedQuestions = [...questions, newEntry];
        interviewStage.questionsAsked = updatedQuestions;
        setQuestions(updatedQuestions);
        onUpdateStage({ ...interviewStage, questionsAsked: updatedQuestions });
    },
    handleDeleteQuestion(index: number, questions: QuestionEntry[], setQuestions: React.Dispatch<React.SetStateAction<QuestionEntry[]>>, interviewStage: InterviewStage, onUpdateStage: (updatedStage: InterviewStage) => void) {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        interviewStage.questionsAsked = updatedQuestions;
        setQuestions(updatedQuestions);
        onUpdateStage({ ...interviewStage, questionsAsked: updatedQuestions });
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