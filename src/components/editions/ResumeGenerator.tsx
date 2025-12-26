import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string;
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    core: string[];
  };
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    details: string;
  }[];
  projects: {
    title: string;
    tech: string;
    highlights: string[];
  }[];
  achievements: {
    title: string;
    description: string;
  }[];
}

const resumeData: ResumeData = {
  name: 'Sayan Dutta',
  title: 'Software Engineer',
  email: 'sayandutta1411@gmail.com',
  phone: '+91 96351 02598',
  location: 'West Bengal, India',
  github: 'github.com/sayandutta',
  linkedin: 'linkedin.com/in/sayandutta',
  summary: 'Aspiring AI/ML and full-stack developer with strong foundations in Python, web development, and scalable system design. I enjoy building real-world solutions, mentoring peers, and contributing to tech communities.',
  skills: {
    languages: ['Python', 'C', 'C++', 'JavaScript', 'SQL'],
    frameworks: ['HTML/CSS', 'Node.js', 'React', 'Tailwind CSS', 'Bootstrap'],
    databases: ['MySQL', 'MongoDB', 'Qlik Sense', 'Git', 'Google Cloud', 'Agile'],
    core: ['Data Structures', 'Algorithms', 'OOPS', 'OS', 'DBMS', 'Computer Networks'],
  },
  experience: [
    {
      title: 'Business Analytics Intern',
      company: 'SmartBridge (Qlik)',
      period: 'Apr – Jun 2024',
      description: 'Developed interactive Qlik dashboards with user-friendly visualizations. Extracted KPIs to support operational decision-making.',
    },
    {
      title: 'Generative AI Intern',
      company: 'SmartBridge (Google Cloud)',
      period: 'Sep – Oct 2024',
      description: "Implemented and deployed production-ready models using Google Cloud's scalable infrastructure and APIs.",
    },
    {
      title: 'Tech Lead (Web) & Content Lead',
      company: 'The CodeBird, UIT Burdwan',
      period: '2024 – 2025',
      description: 'Led web development initiatives and content strategy. Guided junior members on AI/ML tools and best practices.',
    },
  ],
  education: [
    {
      institution: 'University Institute of Technology, The University of Burdwan',
      degree: 'B.E. in Computer Science and Engineering',
      period: '2022 – Present',
      details: 'CGPA: 8.79/10 (5th Sem)',
    },
    {
      institution: 'Army Public School, Bengdubi',
      degree: 'Higher Secondary (CBSE)',
      period: '2019 – 2021',
      details: '91.2%',
    },
  ],
  projects: [
    {
      title: 'Savitr-AI',
      tech: 'Python, Node.js, MongoDB, Twilio, Google Maps API',
      highlights: [
        'AI-powered delivery scheduler optimizing route planning',
        'Reduced failed deliveries by 30%',
        'Won Best Paper at ICSAA 2025',
      ],
    },
    {
      title: 'Cyberpunk AI Chatbot',
      tech: 'JavaScript, CSS, Gemini API',
      highlights: [
        'Interactive chatbot with NLP-powered experience',
        'Deployed on Render with 99.9% uptime',
      ],
    },
    {
      title: 'Road Safety Dashboard',
      tech: 'Qlik Sense, Data Analytics',
      highlights: [
        'Visualized Indian road accident data',
        'Delivered safety recommendations through data storytelling',
      ],
    },
  ],
  achievements: [
    { title: 'Best Paper – ICSAA 2025', description: 'Savitr-AI paper' },
    { title: 'Outstanding Paper – Ideathon 2025', description: 'Innovative solution design' },
    { title: 'Finalist – Smart Bengal Hackathon 2024', description: 'State-level hackathon' },
    { title: '1st Place – QuizWiz 2025', description: 'Technical quiz competition' },
  ],
};

export const ResumeGenerator: React.FC<{ className?: string }> = ({ className }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      // Colors
      const primaryColor: [number, number, number] = [20, 20, 20];
      const accentColor: [number, number, number] = [180, 140, 60];
      const mutedColor: [number, number, number] = [100, 100, 100];

      // Header
      doc.setFontSize(24);
      doc.setTextColor(...primaryColor);
      doc.setFont('helvetica', 'bold');
      doc.text(resumeData.name, margin, y + 8);
      
      doc.setFontSize(12);
      doc.setTextColor(...accentColor);
      doc.setFont('helvetica', 'normal');
      doc.text(resumeData.title, margin, y + 15);

      // Contact info
      doc.setFontSize(9);
      doc.setTextColor(...mutedColor);
      const contactLine = `${resumeData.email} | ${resumeData.phone} | ${resumeData.location}`;
      doc.text(contactLine, margin, y + 22);
      const linksLine = `${resumeData.github} | ${resumeData.linkedin}`;
      doc.text(linksLine, margin, y + 27);

      y += 35;

      // Section helper
      const addSection = (title: string) => {
        if (y > 270) {
          doc.addPage();
          y = margin;
        }
        doc.setDrawColor(...accentColor);
        doc.setLineWidth(0.5);
        doc.line(margin, y, margin + contentWidth, y);
        y += 6;
        doc.setFontSize(11);
        doc.setTextColor(...accentColor);
        doc.setFont('helvetica', 'bold');
        doc.text(title.toUpperCase(), margin, y);
        y += 6;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...primaryColor);
      };

      // Summary
      addSection('Professional Summary');
      doc.setFontSize(9);
      const summaryLines = doc.splitTextToSize(resumeData.summary, contentWidth);
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 4 + 6;

      // Skills
      addSection('Technical Skills');
      doc.setFontSize(9);
      const skillCategories = [
        { label: 'Languages', skills: resumeData.skills.languages },
        { label: 'Frameworks', skills: resumeData.skills.frameworks },
        { label: 'Tools & DBs', skills: resumeData.skills.databases },
        { label: 'Core CS', skills: resumeData.skills.core },
      ];
      skillCategories.forEach((cat) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`${cat.label}: `, margin, y);
        const labelWidth = doc.getTextWidth(`${cat.label}: `);
        doc.setFont('helvetica', 'normal');
        doc.text(cat.skills.join(', '), margin + labelWidth, y);
        y += 5;
      });
      y += 4;

      // Experience
      addSection('Experience');
      resumeData.experience.forEach((exp) => {
        if (y > 265) {
          doc.addPage();
          y = margin;
        }
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(exp.title, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...mutedColor);
        doc.text(exp.period, pageWidth - margin - doc.getTextWidth(exp.period), y);
        y += 4;
        doc.setTextColor(...accentColor);
        doc.setFontSize(9);
        doc.text(exp.company, margin, y);
        y += 4;
        doc.setTextColor(...primaryColor);
        const descLines = doc.splitTextToSize(exp.description, contentWidth);
        doc.text(descLines, margin, y);
        y += descLines.length * 4 + 4;
      });
      y += 2;

      // Projects
      addSection('Projects');
      resumeData.projects.forEach((proj) => {
        if (y > 260) {
          doc.addPage();
          y = margin;
        }
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(proj.title, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...mutedColor);
        doc.text(` (${proj.tech})`, margin + doc.getTextWidth(proj.title) + 2, y);
        y += 4;
        doc.setTextColor(...primaryColor);
        doc.setFontSize(9);
        proj.highlights.forEach((h) => {
          doc.text(`• ${h}`, margin + 2, y);
          y += 4;
        });
        y += 2;
      });

      // Education
      addSection('Education');
      resumeData.education.forEach((edu) => {
        if (y > 265) {
          doc.addPage();
          y = margin;
        }
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(edu.degree, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...mutedColor);
        doc.text(edu.period, pageWidth - margin - doc.getTextWidth(edu.period), y);
        y += 4;
        doc.setTextColor(...accentColor);
        doc.setFontSize(9);
        doc.text(edu.institution, margin, y);
        y += 4;
        doc.setTextColor(...primaryColor);
        doc.text(edu.details, margin, y);
        y += 6;
      });

      // Achievements
      addSection('Achievements');
      doc.setFontSize(9);
      resumeData.achievements.forEach((ach) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`• ${ach.title}`, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.text(` – ${ach.description}`, margin + doc.getTextWidth(`• ${ach.title}`), y);
        y += 4;
      });

      // Save
      doc.save('Sayan_Dutta_Resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className={cn(
        'group relative overflow-hidden flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-foreground text-background rounded-full transition-all duration-300',
        'hover:scale-105 hover:shadow-lg hover:shadow-editions-gold/20',
        'disabled:opacity-70 disabled:cursor-not-allowed',
        className
      )}
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 animate-spin relative z-10" />
      ) : (
        <Download className="w-4 h-4 relative z-10 group-hover:animate-bounce" />
      )}
      <span className="relative z-10">{isGenerating ? 'Generating...' : 'Resume'}</span>
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-editions-gold via-editions-purple to-editions-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </button>
  );
};
