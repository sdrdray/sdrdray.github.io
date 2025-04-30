// pages/index.js
import { motion } from 'framer-motion';
import { Globe, Code, Rocket, ShieldCheck } from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      title: "UrbanNest: Real Estate WebApp",
      tech: "Next.js, Firebase, Leaflet.js",
      description: "Led end-to-end development of real estate platform..."
    },
    // Add other projects
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc] font-mono">
      {/* Animated Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="p-6 bg-[#161b22] border-b border-[#30363d]"
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold">SUBHRADIP DEBRAY</h1>
          <nav className="flex gap-6">
            <motion.a whileHover={{ scale: 1.05 }} href="#experience">Experience</motion.a>
            <motion.a whileHover={{ scale: 1.05 }} href="#projects">Projects</motion.a>
            <motion.a whileHover={{ scale: 1.05 }} href="#skills">Skills</motion.a>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">WEB DEVELOPER | ML ENGINEER</h2>
          <div className="flex justify-center gap-4 mb-8">
            <motion.a 
              whileHover={{ scale: 1.1 }}
              className="bg-[#238636] px-6 py-2 rounded-lg flex items-center gap-2"
              href="#contact"
            >
              <Rocket size={20} />
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8">Experience</h3>
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              className="border-l-2 border-[#30363d] pl-8 mb-8"
            >
              <div className="relative -left-11 top-0 w-8 h-8 bg-[#0d1117] rounded-full border-2 border-[#30363d] flex items-center justify-center">
                <Code size={16} />
              </div>
              <h4 className="text-xl font-medium">{exp.title}</h4>
              <p className="text-[#8b949e]">{exp.company} • {exp.duration}</p>
              <p className="mt-2 text-[#8b949e]">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Grid */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8">Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-[#161b22] p-6 rounded-lg border border-[#30363d]"
              >
                <h4 className="text-xl font-medium mb-2">{project.title}</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.split(', ').map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-[#238636] rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-[#8b949e]">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Radar Chart */}
      <section id="skills" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-[#161b22] rounded-lg border border-[#30363d]"
              >
                <h4 className="font-medium mb-2">{skill.category}</h4>
                <ul className="list-disc list-inside text-[#8b949e]">
                  {skill.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
