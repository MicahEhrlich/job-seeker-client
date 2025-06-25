import {
    FaRegPaperPlane,
    FaComments,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa"
import { useJobStore } from "../../stores/jobStore"
import type { Job } from "../../types.ts";
import { SearchBar } from "./../SearchBar.tsx";

const statuses: {
    key: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    color: keyof typeof bgColors
}[] = [
        { key: "applied", label: "Applied", icon: FaRegPaperPlane, color: "blue" },
        { key: "interviewing", label: "Interviewing", icon: FaComments, color: "yellow" },
        { key: "offered", label: "Offered", icon: FaCheckCircle, color: "green" },
        { key: "rejected", label: "Rejected", icon: FaTimesCircle, color: "red" },
    ]

const bgColors = {
    blue: "bg-blue-50 border-blue-200",
    yellow: "bg-yellow-50 border-yellow-200",
    green: "bg-green-50 border-green-200",
    red: "bg-red-50 border-red-200",
}

const textColors = {
    blue: "text-blue-800",
    yellow: "text-yellow-800",
    green: "text-green-800",
    red: "text-red-800",
}

export const JobBoard = () => {
    const jobs = useJobStore((state) => state.jobs)
    const searchQuery = useJobStore((state) => state.searchQuery)?.toLowerCase()

    const filteredJobs = jobs.filter((job) => {
        if (!searchQuery) return true
        return (
            job.company_name.toLowerCase().includes(searchQuery) ||
            job.position.toLowerCase().includes(searchQuery)
        )
    })

    const groupedJobs = statuses.reduce<Record<string, Job[]>>((acc, status) => {
        acc[status.key] = filteredJobs.filter((job) => job.status === status.key)
        return acc
    }, {})

    return (
        <div className="p-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Job Application Board</h1>
            <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-4">
                <SearchBar />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {statuses.map(({ key, label, icon: Icon, color }) => (
                    <div key={key} className={`rounded-2xl shadow-md p-3 ${bgColors[color]}`}>
                        <div className={`flex items-center gap-2 mb-3 ${textColors[color]}`}>
                            <Icon className="text-xl" />
                            <h2 className="text-lg font-semibold">{label}</h2>
                        </div>
                        <div className="space-y-3">
                            {groupedJobs[key]?.length > 0 ? (
                                groupedJobs[key].map(job => (
                                    <div key={job.id} className="bg-gray-50 p-3 rounded-xl border border-gray-200 hover:shadow transition">
                                        <p className="font-medium text-gray-800">{job.company_name}</p>
                                        <p className="text-sm text-gray-600">{job.position}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400 italic">No jobs</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}