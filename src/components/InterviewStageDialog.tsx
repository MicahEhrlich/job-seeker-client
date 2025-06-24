import { useState } from "react"
import { Dialog } from "@headlessui/react"
import type { InterviewStage } from "../types"
import { JobService } from "../services/jobService"

type Props = {
  isOpen: boolean
  onClose: () => void
  interviewStage: InterviewStage
  onUpdateStage: (updatedStage: InterviewStage) => void
}

export const InterviewStageDialog = ({ isOpen, onClose, interviewStage, onUpdateStage }: Props) => {
  const [newQuestion, setNewQuestion] = useState("")
  const [questions, setQuestions] = useState<string[]>(interviewStage.questionsAsked || [])

  const handleAddQuestion = () => {
    JobService.handleAddQuestion(newQuestion, questions, interviewStage, setQuestions, onUpdateStage)
    setNewQuestion("");
  }

  const handleDeleteQuestion = (index: number) => {
    JobService.handleDeleteQuestion(index, questions, setQuestions, interviewStage, onUpdateStage)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Questions for: {interviewStage.stage}
          </Dialog.Title>

          <label className="block text-sm font-medium mb-1">Interview Questions</label>
          <ul className="mb-3 list-disc pl-5 space-y-1">
            {questions.map((q, i) => (
              <li key={i} className="flex justify-between items-center gap-2">
                <span className="text-sm">{q}</span>
                <button
                  onClick={() => handleDeleteQuestion(i)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
            {questions.length === 0 && (
              <p className="text-sm text-gray-500 italic">No questions yet</p>
            )}
          </ul>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. Explain closures in JS"
              className="flex-1 border p-2 rounded-md text-sm dark:bg-gray-700"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddQuestion()}
            />
            <button
              disabled={!newQuestion.trim()}
              type="button"
              onClick={handleAddQuestion}
              className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="mt-4 text-right">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:underline"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
