import { useState, useMemo } from "react"
import { mockQuestions } from "../../mock/mockQuestions"

const stageOptions = ["All", "Technical Interview", "HR Interview", "CEO Interview"]
const tagOptions = ["All", "ReactJS", "NodeJS", "JavaScript", "Behavioral", "Python"]

export const Questions = () => {
  const [search, setSearch] = useState("")
  const [selectedStage, setSelectedStage] = useState("All")
  const [selectedTag, setSelectedTag] = useState("All")

  const filteredQuestions = useMemo(() => {
    return mockQuestions.filter((q) => {
      const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase())
      const matchesStage = selectedStage === "All" || q.stageTitle === selectedStage
      const matchesTag =
        selectedTag === "All" || q.tags.includes(selectedTag)
      return matchesSearch && matchesStage && matchesTag
    })
  }, [search, selectedStage, selectedTag])

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold mb-2">Interview Questions</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-64"
        />

        <select
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          className="border p-2 rounded-md"
        >
          {stageOptions.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="border p-2 rounded-md"
        >
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Question List */}
      <ul className="divide-y divide-gray-200">
        {filteredQuestions.map((q) => (
          <li key={q.id} className="py-4">
            <p className="font-medium">{q.question}</p>
            <p className="text-sm text-gray-500">
              ↳ {q.company} • {q.jobTitle} • {q.stageTitle}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {q.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-sm px-2 py-1 rounded dark:bg-gray-700 dark:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
        {filteredQuestions.length === 0 && (
          <p className="text-sm text-gray-400 mt-4">No matching questions.</p>
        )}
      </ul>
    </div>
  )
}
