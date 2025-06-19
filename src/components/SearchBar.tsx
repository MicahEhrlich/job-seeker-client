import { useEffect } from "react"
import { useJobStore } from "../stores/jobStore"

export const SearchBar = () => {
    const searchQuery = useJobStore((state) => state.searchQuery)
    const setSearchQuery = useJobStore((state) => state.setSearchQuery)

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
                e.preventDefault()
                document.getElementById("job-search")?.focus()
            }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    return (
        <>
            <input
                id="job-search"
                type="text"
                placeholder="Search by company or position"
                className="w-full max-w-md p-2 border border-gray-300 dark:border-gray-700 rounded-md mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setSearchQuery("")}
                >
                    ×
                </button>
            )}
        </>
    )
}
