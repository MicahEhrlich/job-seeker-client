import { useForm, useFieldArray } from 'react-hook-form'
import { format } from 'date-fns'
import {
    HiCheckCircle,
    HiClock,
    HiExclamationCircle,
    HiXCircle,
} from 'react-icons/hi';
import type { InterviewStage, Job } from '../types';
import { inferStatusFromStages } from '../utils';
import { useState } from 'react';
import { InterviewStageDialog } from './InterviewStageDialog';
import { useJobStore } from '../stores/jobStore';


type JobDetailsModalProps = {
    job: Job;
    onClose: () => void
    onUpdateJob: (job: Job) => void
}

const getIcon = (status: string) => {
    switch (status) {
        case 'done':
            return <HiCheckCircle className="text-green-600" />
        case 'upcoming':
            return <HiClock className="text-blue-500" />
        case 'pending':
            return <HiExclamationCircle className="text-yellow-500" />
        case 'cancelled':
            return <HiXCircle className="text-red-500" />
        default:
            return null
    }
}

export function JobDetailsModal({ job, onClose, onUpdateJob }: JobDetailsModalProps) {
    const {
        control,
        handleSubmit,
        register,
        watch,
        // setError,
        // clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: {
            interview_stages: job.interview_stages || [],
        },
    })
    const [openStageDialog, setOpenStageDialog] = useState<InterviewStage | null>(null)
    const updateStageForJob = useJobStore((state) => state.updateStage)

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'interview_stages',
    })

    const onSubmit = (data: { interview_stages: InterviewStage[] }) => {
        const sortedStages = [...data.interview_stages].sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })

        const inferredStatus = inferStatusFromStages(sortedStages, job.status === 'rejected')
        onUpdateJob({
            ...job,
            interview_stages: sortedStages,
            status: inferredStatus,
        })

        onClose()
    }

    const todayStr = format(new Date(), 'yyyy-MM-dd')

    // const updateStageForJob = (updatedStage: InterviewStage) => {
    //     const updatedStages = fields.map((stage) => {
    //         if (updatedStage.id === stage.id) {
    //             return {
    //                 ...stage,
    //                 ...updatedStage,
    //                 id: stage.id, // keep id as string
    //             }
    //         }
    //         return stage
    //     })
    //     onUpdateJob({
    //         ...job,
    //         interview_stages: updatedStages,
    //         status: inferStatusFromStages(updatedStages, job.status === 'rejected'),
    //     })
    // }

    return (
        <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
            <div className="rounded-lg p-6 w-full max-w-xl shadow-lg max-h-screen overflow-y-auto bg-[#242424]">
                <h2 className="text-xl font-semibold mb-2">{job.company_name} — {job.position}</h2>
                <p className="text-sm mb-4">Applied: {job.applied_date}</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                    {fields.map((field, index) => {
                        const stageType = watch(`interview_stages.${index}.status`)
                        return (
                            <div key={field.id} className="border p-3 rounded space-y-2 bg-[#242424]">
                                <div className="flex items-center gap-2 mb-1">
                                    {getIcon(stageType)}
                                    <span className="text-sm font-medium capitalize">{stageType}</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        {...register(`interview_stages.${index}.stage`, { required: 'Stage is required' })}
                                        placeholder="Stage"
                                        className="w-1/3 border px-2 py-1 rounded"
                                    />
                                    <input
                                        {...register(`interview_stages.${index}.person`, { required: 'Person is required' })}
                                        placeholder="Person"
                                        className="w-1/3 border px-2 py-1 rounded"
                                    />
                                    <input
                                        type="date"
                                        {...register(`interview_stages.${index}.date`, {
                                            required: 'Date is required',
                                            validate: (value) => {
                                                if (stageType === 'upcoming' && value < todayStr) {
                                                    return 'Upcoming interviews must be today or later'
                                                }
                                                return true
                                            },
                                        })}
                                        className="w-1/3 border px-2 py-1 rounded"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <select
                                        {...register(`interview_stages.${index}.status`)}
                                        className="border px-2 py-1 rounded  bg-[#242424]"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="upcoming">Upcoming</option>
                                        <option value="done">Done</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    <button
                                        className="text-blue-600 text-sm"
                                        onClick={() => setOpenStageDialog(field)}
                                        type="button"
                                    >
                                        Notes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-600 text-sm ml-auto"
                                    >
                                        Remove
                                    </button>
                                </div>

                                {/* Validation Errors */}
                                <div className="text-sm text-red-500">
                                    {errors?.interview_stages?.[index]?.stage?.message}
                                    {errors?.interview_stages?.[index]?.person?.message && ' • '}
                                    {errors?.interview_stages?.[index]?.person?.message}
                                    {errors?.interview_stages?.[index]?.date?.message && ' • '}
                                    {errors?.interview_stages?.[index]?.date?.message}
                                </div>
                            </div>
                        )
                    })}

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() =>
                                append({
                                    id: Date.now(), // or use a better unique id generator if available
                                    jobId: job.id,
                                    stage: '',
                                    person: '',
                                    date: todayStr,
                                    status: 'pending',
                                })
                            }
                            className="border px-3 py-1 rounded text-sm"
                        >
                            + Add Stage
                        </button>
                        {job.status !== 'rejected' && <button
                            type="button"
                            onClick={() => {
                                onUpdateJob({
                                    ...job,
                                    status: 'rejected',
                                })
                                onClose()
                            }}
                            className="text-sm text-red-600 underline"
                        >
                            Mark as Rejected
                        </button>}

                        <div className="space-x-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
                {openStageDialog && (
                    <InterviewStageDialog
                        isOpen={!!openStageDialog}
                        onClose={() => setOpenStageDialog(null)}
                        interviewStage={openStageDialog}
                        onUpdateStage={(updatedStage) => {
                            updateStageForJob(updatedStage.jobId, updatedStage)
                        }}
                    />
                )}
            </div>
        </div>
    )
}
