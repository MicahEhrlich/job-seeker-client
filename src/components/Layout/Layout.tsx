export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <main className="max-w-4xl mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
}