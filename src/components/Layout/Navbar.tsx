export const Navbar = () => {
    return (
        <nav className="shadow-md">
            <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold">🚀 Job Hunt Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span>Hello, [User Name]</span>
                    <button className="border px-3 py-1 rounded">Logout</button>
                </div>
            </div>
        </nav>
    );
}