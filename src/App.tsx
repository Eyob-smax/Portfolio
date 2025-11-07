import Header from "./components/Header";
import ContactPage from "./pages/Contact";
import Home from "./pages/Home";
import JournalSection from "./pages/JounalIntegration";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";

function App() {
  return (
    <div className="relative inset-0 w-full bg-[linear-gradient(to_right,#5c8a8441,transparent_1px),linear-gradient(to_bottom,#5c8a8441,transparent_1px)] bg-[size:24px_24px]">
      <div className="sticky top-0 right-0 left-0 z-50">
        <Header
          title="Eyob Simachew"
          tabLinks={[
            { label: "Projects", path: "#projects" },
            { label: "Contact", path: "#contact" },
            { label: "Journal", path: "#journal" },
            { label: "Skills", path: "#skills" },
          ]}
        />
      </div>
      <Home />
      <Projects />
      <Skills />
      <JournalSection />
      <ContactPage />
    </div>
  );
}

export default App;
