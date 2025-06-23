import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { InterviewStage, JobStore } from "../types"
import { MOCK_JOBS } from "../mock/mockData"

export const useJobStore = create<JobStore>()(
    persist(
        (set) => ({
            jobs: MOCK_JOBS,
            searchQuery: "",
            setSearchQuery: (query) => set({ searchQuery: query }),
            addJob: (job) =>
                set((state) => ({
                    jobs: [...state.jobs, job],
                })),

            updateJob: (id, update) =>
                set((state) => ({
                    jobs: state.jobs.map((job) =>
                        String(job.id) === String(id) ? { ...job, ...update } : job
                    ),
                })),

            deleteJob: (id) =>
                set((state) => ({
                    jobs: state.jobs.filter((job) => String(job.id) !== String(id)),
                })),

            setJobs: (jobs) => set({ jobs }),
            // inside your job store
            updateStage: (jobId: number, updatedStage: InterviewStage) => {
                set((state) => ({
                    jobs: state.jobs.map((job) => {
                        if (job.id !== jobId) return job
                        return {
                            ...job,
                            interview_stages: job.interview_stages && job.interview_stages.map((stage) =>
                                stage.stageId === updatedStage.stageId ? updatedStage : stage
                            ),
                        }
                    }),
                }))
            }

        }),
        {
            name: "job-storage", // persist to localStorage
        }
    )
)