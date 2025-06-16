import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate()

    return (
        <nav className="shadow-md">
            <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold">🚀 Job Hunter</h1>
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate("/dashboard")} className="border px-3 py-1 rounded hover:bg-gray-100">Dashboard</button>
                    <button onClick={() => navigate("/jobboard")} className="border px-3 py-1 rounded hover:bg-gray-100">Job Board</button>
                    <span>Hello, [User Name]</span>
                    <button className="border px-3 py-1 rounded">Logout</button>
                </div>
            </div>
        </nav>
    );
}