import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, Download, Star, Award, Calendar, Building } from 'lucide-react';
import { ResumeData, PortfolioTemplate, CustomizationOptions } from '../../types';

interface PortfolioPreviewProps {
  resumeData: ResumeData;
  template: PortfolioTemplate;
  customization: CustomizationOptions;
}

export function PortfolioPreview({ resumeData, template, customization }: PortfolioPreviewProps) {
  const themeColors = {
    indigo: {
      primary: 'bg-indigo-600',
      secondary: 'bg-indigo-100',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
      gradient: 'from-indigo-600 to-indigo-800',
    },
    emerald: {
      primary: 'bg-emerald-600',
      secondary: 'bg-emerald-100',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      gradient: 'from-emerald-600 to-emerald-800',
    },
    rose: {
      primary: 'bg-rose-600',
      secondary: 'bg-rose-100',
      text: 'text-rose-600',
      border: 'border-rose-200',
      gradient: 'from-rose-600 to-rose-800',
    },
    amber: {
      primary: 'bg-amber-600',
      secondary: 'bg-amber-100',
      text: 'text-amber-600',
      border: 'border-amber-200',
      gradient: 'from-amber-600 to-amber-800',
    },
    sky: {
      primary: 'bg-sky-600',
      secondary: 'bg-sky-100',
      text: 'text-sky-600',
      border: 'border-sky-200',
      gradient: 'from-sky-600 to-sky-800',
    },
    violet: {
      primary: 'bg-violet-600',
      secondary: 'bg-violet-100',
      text: 'text-violet-600',
      border: 'border-violet-200',
      gradient: 'from-violet-600 to-violet-800',
    },
  };

  const fontClasses = {
    'modern-sans': 'font-sans',
    'classic-serif': 'font-serif',
    'minimal': 'font-mono',
    'creative': 'font-sans',
  };

  const colors = themeColors[customization.theme];
  const fontClass = fontClasses[customization.font];

  const ContactIcon = ({ type, value, href }: { type: string; value: string; href?: string }) => {
    const icons = {
      email: Mail,
      phone: Phone,
      location: MapPin,
      website: Globe,
      github: Github,
      linkedin: Linkedin,
    };

    const Icon = icons[type as keyof typeof icons] || Globe;

    const content = (
      <div className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors">
        <Icon className="h-5 w-5" />
        <span className="text-sm">{value}</span>
      </div>
    );

    return href ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      content
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${fontClass}`}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-gradient-to-br ${colors.gradient} text-white relative overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {resumeData.personalInfo.name}
                </h1>
                <p className="text-2xl text-white/90 mb-8 font-light">
                  {resumeData.personalInfo.title}
                </p>
                <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                  {resumeData.summary}
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Download Resume</span>
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                    Get In Touch
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <ContactIcon type="email" value={resumeData.personalInfo.email} href={`mailto:${resumeData.personalInfo.email}`} />
                <ContactIcon type="phone" value={resumeData.personalInfo.phone} href={`tel:${resumeData.personalInfo.phone}`} />
                <ContactIcon type="location" value={resumeData.personalInfo.location} />
                {resumeData.personalInfo.website && (
                  <ContactIcon type="website" value="Portfolio Website" href={resumeData.personalInfo.website} />
                )}
                {resumeData.personalInfo.github && (
                  <ContactIcon type="github" value="GitHub Profile" href={resumeData.personalInfo.github} />
                )}
                {resumeData.personalInfo.linkedin && (
                  <ContactIcon type="linkedin" value="LinkedIn Profile" href={resumeData.personalInfo.linkedin} />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Experience Section */}
        {customization.sections.experience && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <div className="flex items-center mb-12">
              <Building className={`h-8 w-8 ${colors.text} mr-4`} />
              <h2 className="text-4xl font-bold text-gray-900">Professional Experience</h2>
            </div>
            
            <div className="space-y-12">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline Line */}
                  {index < resumeData.experience.length - 1 && (
                    <div className={`absolute left-6 top-16 w-0.5 h-full ${colors.secondary}`}></div>
                  )}
                  
                  <div className="flex items-start space-x-8">
                    {/* Timeline Dot */}
                    <div className={`w-12 h-12 ${colors.primary} rounded-full flex items-center justify-center flex-shrink-0 relative z-10`}>
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {exp.position}
                          </h3>
                          <p className={`text-xl ${colors.text} font-semibold mb-2`}>
                            {exp.company}
                          </p>
                          <p className="text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {exp.location}
                          </p>
                        </div>
                        <div className="flex items-center text-gray-500 mt-4 lg:mt-0">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="text-gray-700 leading-relaxed flex items-start">
                            <Star className={`h-4 w-4 ${colors.text} mr-3 mt-1 flex-shrink-0`} />
                            {desc}
                          </li>
                        ))}
                      </ul>
                      
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`px-3 py-1 ${colors.secondary} ${colors.text} text-sm rounded-full font-medium`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills Section */}
        {customization.sections.skills && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-20"
          >
            <div className="flex items-center mb-12">
              <Award className={`h-8 w-8 ${colors.text} mr-4`} />
              <h2 className="text-4xl font-bold text-gray-900">Skills & Expertise</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resumeData.skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:${colors.secondary} hover:${colors.text} transition-colors cursor-default`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects Section */}
        {customization.sections.projects && resumeData.projects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-20"
          >
            <div className="flex items-center mb-12">
              <ExternalLink className={`h-8 w-8 ${colors.text} mr-4`} />
              <h2 className="text-4xl font-bold text-gray-900">Featured Projects</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {resumeData.projects.filter(p => p.featured).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {project.name}
                    </h3>
                    <div className="flex space-x-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${colors.text} hover:opacity-70 transition-opacity`}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${colors.text} hover:opacity-70 transition-opacity`}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 ${colors.secondary} ${colors.text} text-sm rounded-full font-medium`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education Section */}
        {customization.sections.education && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-20"
          >
            <div className="flex items-center mb-12">
              <Award className={`h-8 w-8 ${colors.text} mr-4`} />
              <h2 className="text-4xl font-bold text-gray-900">Education</h2>
            </div>
            
            <div className="space-y-8">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className={`text-xl ${colors.text} font-semibold mb-2`}>
                        {edu.institution}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {edu.location}
                      </p>
                    </div>
                    <div className="text-right mt-4 lg:mt-0">
                      <div className="flex items-center text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  </div>
                  
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-700 flex items-start">
                          <Star className={`h-4 w-4 ${colors.text} mr-3 mt-1 flex-shrink-0`} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-center pt-12 border-t border-gray-200"
        >
          <p className="text-gray-500 mb-4">
            Thank you for taking the time to review my portfolio
          </p>
          <p className="text-sm text-gray-400">
            Portfolio created with AutoFolio
          </p>
        </motion.footer>
      </div>
    </div>
  );
}