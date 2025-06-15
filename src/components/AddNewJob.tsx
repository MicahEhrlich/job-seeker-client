import { useForm } from 'react-hook-form'
import type { Job } from '../types'


type AddNewJobProps = {
    onClose: () => void
    onAdd: (job: Job) => void
}

export const AddNewJob = ({ onClose, onAdd }: AddNewJobProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Job>()

    const onSubmit = (data: Job) => {
        onAdd({
            ...data,
            id: Date.now(),
        })
        reset()
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-opacity-10 flex justify-center items-center z-50">
            <div className="rounded-lg p-6 w-full max-w-lg shadow-lg bg-[#1a2233]">
                <h2 className="text-xl font-semibold mb-4">Add New Job</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Company Name"
                            className="w-full border px-3 py-2 rounded"
                            {...register('company_name', { required: true })}
                        />
                        {errors.company_name && <p className="text-sm text-red-500">Company name is required.</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Position Title"
                            className="w-full border px-3 py-2 rounded"
                            {...register('position', { required: true })}
                        />
                        {errors.position && <p className="text-sm text-red-500">Position is required.</p>}
                    </div>

                    <div>
                        <select className="w-full border px-3 py-2 rounded" {...register('status')}>
                            <option value="applied">Applied</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="offered">Offered</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="date"
                            className="w-full border px-3 py-2 rounded"
                            {...register('applied_date', { required: true })}
                        />
                        {errors.applied_date && <p className="text-sm text-red-500">Date is required.</p>}
                    </div>

                    <input
                        type="text"
                        placeholder="Next Stage (optional)"
                        className="w-full border px-3 py-2 rounded"
                        {...register('next_stage')}
                    />

                    <textarea
                        placeholder="Notes"
                        className="w-full border px-3 py-2 rounded"
                        {...register('notes')}
                    />

                    <input
                        type="text"
                        placeholder="Offer Details (optional)"
                        className="w-full border px-3 py-2 rounded"
                        {...register('offer_details')}
                    />

                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                            Add Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}