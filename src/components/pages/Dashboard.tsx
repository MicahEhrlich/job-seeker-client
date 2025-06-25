import { useEffect, useState } from "react";
import { AddNewJob } from "../AddNewJob.tsx";
import type { Job } from "../../types.ts";
import { JobDetailsModal } from "../JobDetailsModal.tsx";
import { statusColor } from "../../utils.ts";
import { useJobStore } from "../../stores/jobStore.ts";

const JOB_STATUSES = ['all', 'interviewing', 'offered', 'rejected', 'applied'];

export const Dashboard = () => {
    const jobs = useJobStore((state) => state.jobs)
    const setJobs = useJobStore((state => state.setJobs))

    const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs)
    const [filter, setFilter] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)


    useEffect(() => {
        if (filter === 'all') setFilteredJobs(jobs)
        else setFilteredJobs(jobs.filter(job => job.status === filter))
    }, [filter, jobs])

    const handleAddJob = (job: Job) => {
        const newJob = { ...job, id: Date.now() }
        setJobs([newJob, ...jobs])
        setShowModal(false)
    }

    const handleUpdateJob = (updatedJob: Job) => {
        setJobs(jobs.map(j => (j.id === updatedJob.id ? updatedJob : j)))
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex gap-4 mb-4 flex-wrap">
                {JOB_STATUSES.map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-3 py-1 rounded border ${filter === s ? 'bg-blue-200 font-semibold' : ''}`}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
            </div>

            <div className="mb-6">
                <button onClick={() => setShowModal(true)} className="bg-black text-white px-4 py-2 rounded">+ Add New Job</button>
            </div>

            <h2 className="text-xl font-semibold mb-2">My Applications:</h2>

            {selectedJob && (
                <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} onUpdateJob={handleUpdateJob} />
            )}
            <div className="grid gap-4">
                {filteredJobs.map((job) => (
                    <div key={job.id} className="border rounded p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${statusColor(job.status)}`}></span>
                                    {job.company_name} — {job.position}
                                </h3>
                                <p className="text-sm text-gray-600">Applied: {job.applied_date}</p>
                                {job.status === 'interviewing' && (
                                    <p className="text-sm">Next Stage: {job.next_stage || '—'}</p>
                                )}
                                {job.status === 'offered' && (
                                    <p className="text-sm">Offer: {job.offer_details || 'Pending details'}</p>
                                )}
                                {job.notes && (
                                    <p className="text-sm text-gray-500 mt-1">Notes: {job.notes.slice(0, 100)}...</p>
                                )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <button onClick={() => setSelectedJob(job)} className="border px-3 py-1 rounded text-sm">
                                    View Details
                                </button>
                                {job.status === 'offered' && (
                                    <div className="flex gap-2">
                                        <button className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">Accept</button>
                                        <button className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">Decline</button>
                                    </div>
                                )}
                                {job.status === 'rejected' && (
                                    <span className="ml-2 text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                                        Rejected
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && <AddNewJob onClose={() => setShowModal(false)} onAdd={handleAddJob} />}
        </div>
    );
}