import Navbar from "../components/Navbar";

function MainLayout({children}) {
    return (
        <div className="min-h-screen bg-[#0F172A]">
            <Navbar/>
            <main className="max-w-7xl mx-auto px-8 py-8">
                {children}
            </main>
        </div>
    );
}

export default MainLayout;