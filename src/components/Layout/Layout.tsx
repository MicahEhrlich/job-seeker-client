import { DarkModeToggle } from "./DarkModeToggle";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <DarkModeToggle />
            <main className="max-w-4xl mx-auto px-4 py-6 pt-16">
                {children}
            </main>
        </div>
    );
}