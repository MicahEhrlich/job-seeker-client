import { useState } from "react"
import { Dialog } from "@headlessui/react"
import type { InterviewStage } from "../types"

type Props = {
  isOpen: boolean
  onClose: (updatedStage: InterviewStage) => void
  interviewStage: InterviewStage
  onUpdateStage: (updatedStage: InterviewStage) => void
}

export const InterviewStageDialog = ({ isOpen, onClose, interviewStage, onUpdateStage }: Props) => {
  const [newQuestion, setNewQuestion] = useState("")
  const [questions, setQuestions] = useState<string[]>(interviewStage.questionsAsked || [])

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return
    const updatedQuestions = [...questions, newQuestion.trim()]
    setQuestions(updatedQuestions)
    setNewQuestion("")
    const updatedStage = { ...interviewStage, questionsAsked: updatedQuestions }
    onUpdateStage({ ...updatedStage, questionsAsked: updatedQuestions })
  }

  const handleDeleteQuestion = (index: number) => {
    const updated = questions.filter((_, i) => i !== index)
    const updatedQuestions = [...updated]
    setQuestions(updatedQuestions)
    onUpdateStage({ ...interviewStage, questionsAsked: updated })
  }

  const handleOnClose = () => {
    const updatedStage = { ...interviewStage, questionsAsked: questions }
    onClose(updatedStage)
  }

  return (
    <Dialog open={isOpen} onClose={handleOnClose} className="relative z-50">
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
              onClick={handleAddQuestion}
              className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="mt-4 text-right">
            <button
              onClick={handleOnClose}
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
