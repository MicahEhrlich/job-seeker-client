import { useJobStore } from "../stores/jobStore"

export const SearchBar = () => {
  const searchQuery = useJobStore((state) => state.searchQuery)
  const setSearchQuery = useJobStore((state) => state.setSearchQuery)

  return (
    <input
      type="text"
      placeholder="Search by company or position"
      className="w-full max-w-md p-2 border border-gray-300 dark:border-gray-700 rounded-md mb-4"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  )
}
