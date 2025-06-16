import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { JobStore } from "../types"
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
        }),
        {
            name: "job-storage", // persist to localStorage
        }
    )
)