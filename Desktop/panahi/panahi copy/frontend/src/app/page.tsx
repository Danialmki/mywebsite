import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Panah Academy
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your journey to excellence starts here
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
              Get Started
            </button>
            <button className="border border-border hover:border-border/80 text-foreground px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
