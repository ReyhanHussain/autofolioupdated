import axios from 'axios';
import { ResumeData } from '../types';

const AI_API_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface AIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export class AIService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_OPENROUTER_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY in your .env file.');
    }
  }

  async parseResume(resumeText: string): Promise<ResumeData> {
    // If no API key is available, use fallback parsing
    if (!this.apiKey) {
      console.warn('No API key available, using fallback parsing');
      return this.getFallbackData(resumeText);
    }

    const prompt = `You are a professional resume parser. Analyze the following resume text and extract structured data. Return ONLY a valid JSON object with this exact structure (no additional text, explanations, or markdown formatting):

{
  "personalInfo": {
    "name": "Full Name",
    "email": "email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "City, State",
    "website": "https://website.com",
    "linkedin": "https://linkedin.com/in/username",
    "github": "https://github.com/username",
    "title": "Professional Title"
  },
  "summary": "Professional summary paragraph",
  "experience": [
    {
      "id": "exp-1",
      "company": "Company Name",
      "position": "Job Title",
      "location": "City, State",
      "startDate": "01/2020",
      "endDate": "12/2023",
      "current": false,
      "description": ["Achievement or responsibility 1", "Achievement or responsibility 2"],
      "technologies": ["Tech1", "Tech2"]
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "institution": "University Name",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "location": "City, State",
      "startDate": "09/2016",
      "endDate": "05/2020",
      "gpa": "3.8",
      "achievements": ["Dean's List", "Summa Cum Laude"]
    }
  ],
  "skills": [
    {
      "category": "Programming Languages",
      "skills": ["JavaScript", "Python", "Java"]
    },
    {
      "category": "Frameworks",
      "skills": ["React", "Node.js", "Django"]
    }
  ],
  "projects": [
    {
      "id": "proj-1",
      "name": "Project Name",
      "description": "Brief project description highlighting key features and impact",
      "technologies": ["React", "Node.js", "MongoDB"],
      "link": "https://project-demo.com",
      "github": "https://github.com/user/project",
      "featured": true
    }
  ],
  "achievements": ["Professional achievement 1", "Professional achievement 2"],
  "confidence": {
    "personalInfo": 0.95,
    "summary": 0.85,
    "experience": 0.90,
    "education": 0.88,
    "skills": 0.75,
    "projects": 0.70,
    "overall": 0.84
  }
}

Extract information from this resume text:
${resumeText}`;

    try {
      const response = await axios.post<AIResponse>(
        AI_API_BASE_URL,
        {
          model: 'meta-llama/llama-4-maverick:free',
          messages: [
            {
              role: 'system',
              content: 'You are a professional resume parser. Return only valid JSON with no additional text or formatting.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.1,
          max_tokens: 4000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://autofolio.com',
            'X-Title': 'AutoFolio Resume Parser'
          }
        }
      );

      const content = response.data.choices[0].message.content.trim();
      
      // Clean the response to extract JSON
      let jsonStr = content;
      
      // Remove markdown code blocks if present
      if (content.includes('```')) {
        const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
        if (jsonMatch) {
          jsonStr = jsonMatch[1];
        }
      }
      
      // Find JSON object in the response
      const jsonStart = jsonStr.indexOf('{');
      const jsonEnd = jsonStr.lastIndexOf('}') + 1;
      
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        jsonStr = jsonStr.substring(jsonStart, jsonEnd);
      }
      
      const parsedData = JSON.parse(jsonStr);
      
      // Validate and ensure required fields exist
      return this.validateAndCleanData(parsedData);
      
    } catch (error) {
      console.error('AI parsing error:', error);
      
      // If AI fails, try basic text parsing
      return this.getFallbackData(resumeText);
    }
  }

  private validateAndCleanData(data: any): ResumeData {
    // Ensure all required fields exist with defaults
    const validated: ResumeData = {
      personalInfo: {
        name: data.personalInfo?.name || 'Professional Name',
        email: data.personalInfo?.email || 'email@example.com',
        phone: data.personalInfo?.phone || '+1 (555) 123-4567',
        location: data.personalInfo?.location || 'City, State',
        website: data.personalInfo?.website || '',
        linkedin: data.personalInfo?.linkedin || '',
        github: data.personalInfo?.github || '',
        title: data.personalInfo?.title || 'Professional Title'
      },
      summary: data.summary || 'Professional summary will be generated based on your experience and skills.',
      experience: Array.isArray(data.experience) ? data.experience.map((exp: any, index: number) => ({
        id: exp.id || `exp-${index + 1}`,
        company: exp.company || 'Company Name',
        position: exp.position || 'Position Title',
        location: exp.location || 'Location',
        startDate: exp.startDate || '01/2020',
        endDate: exp.endDate || '12/2023',
        current: exp.current || false,
        description: Array.isArray(exp.description) ? exp.description : ['Professional responsibility'],
        technologies: Array.isArray(exp.technologies) ? exp.technologies : []
      })) : [],
      education: Array.isArray(data.education) ? data.education.map((edu: any, index: number) => ({
        id: edu.id || `edu-${index + 1}`,
        institution: edu.institution || 'Institution Name',
        degree: edu.degree || 'Degree',
        field: edu.field || 'Field of Study',
        location: edu.location || 'Location',
        startDate: edu.startDate || '09/2016',
        endDate: edu.endDate || '05/2020',
        gpa: edu.gpa || '',
        achievements: Array.isArray(edu.achievements) ? edu.achievements : []
      })) : [],
      skills: Array.isArray(data.skills) ? data.skills.map((skill: any) => ({
        category: skill.category || 'Skills',
        skills: Array.isArray(skill.skills) ? skill.skills : []
      })) : [],
      projects: Array.isArray(data.projects) ? data.projects.map((proj: any, index: number) => ({
        id: proj.id || `proj-${index + 1}`,
        name: proj.name || 'Project Name',
        description: proj.description || 'Project description',
        technologies: Array.isArray(proj.technologies) ? proj.technologies : [],
        link: proj.link || '',
        github: proj.github || '',
        featured: proj.featured || false
      })) : [],
      achievements: Array.isArray(data.achievements) ? data.achievements : [],
      confidence: {
        personalInfo: data.confidence?.personalInfo || 0.8,
        summary: data.confidence?.summary || 0.7,
        experience: data.confidence?.experience || 0.8,
        education: data.confidence?.education || 0.8,
        skills: data.confidence?.skills || 0.7,
        projects: data.confidence?.projects || 0.6,
        overall: data.confidence?.overall || 0.75
      }
    };

    return validated;
  }

  async enhanceContent(data: ResumeData, section: string): Promise<string> {
    // If no API key is available, return default content
    if (!this.apiKey) {
      return data.summary || 'Professional summary will be generated here.';
    }

    const prompt = `Based on the following resume data, generate enhanced content for the ${section} section.
    Make it professional, compelling, and tailored for a portfolio website.
    
    Resume data: ${JSON.stringify(data)}
    
    Return only the enhanced content, no explanations.`;

    try {
      const response = await axios.post<AIResponse>(
        AI_API_BASE_URL,
        {
          model: 'meta-llama/llama-4-maverick:free',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://autofolio.com',
            'X-Title': 'AutoFolio Content Enhancer'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Content enhancement error:', error);
      return data.summary || 'Professional summary will be generated here.';
    }
  }

  private getFallbackData(resumeText: string): ResumeData {
    // Enhanced fallback parsing using regex patterns
    const lines = resumeText.split('\n').map(line => line.trim()).filter(Boolean);
    
    // Extract email
    const emailMatch = resumeText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    const email = emailMatch ? emailMatch[0] : 'email@example.com';
    
    // Extract phone
    const phoneMatch = resumeText.match(/(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/);
    const phone = phoneMatch ? phoneMatch[0] : '+1 (555) 123-4567';
    
    // Extract name (first non-empty line that's not an email or phone)
    const name = lines.find(line => 
      !line.includes('@') && 
      !line.match(/\d{3}/) && 
      line.length > 2 && 
      line.length < 50
    ) || 'Professional Name';
    
    // Extract skills (look for common skill keywords)
    const skillKeywords = ['javascript', 'python', 'react', 'node', 'java', 'css', 'html', 'sql', 'aws', 'docker'];
    const foundSkills = skillKeywords.filter(skill => 
      resumeText.toLowerCase().includes(skill)
    );
    
    return {
      personalInfo: {
        name,
        email,
        phone,
        location: 'City, State',
        website: '',
        linkedin: '',
        github: '',
        title: 'Professional'
      },
      summary: 'Experienced professional with a proven track record of delivering results and driving innovation.',
      experience: [
        {
          id: 'exp-1',
          company: 'Previous Company',
          position: 'Professional Role',
          location: 'City, State',
          startDate: '01/2020',
          endDate: '12/2023',
          current: false,
          description: [
            'Led key initiatives and delivered measurable results',
            'Collaborated with cross-functional teams to achieve objectives'
          ],
          technologies: foundSkills.slice(0, 3)
        }
      ],
      education: [
        {
          id: 'edu-1',
          institution: 'University',
          degree: 'Bachelor\'s Degree',
          field: 'Field of Study',
          location: 'City, State',
          startDate: '09/2016',
          endDate: '05/2020'
        }
      ],
      skills: [
        {
          category: 'Technical Skills',
          skills: foundSkills.length > 0 ? foundSkills : ['Professional Skills']
        }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'Professional Project',
          description: 'Significant project that demonstrates expertise and impact.',
          technologies: foundSkills.slice(0, 3),
          featured: true
        }
      ],
      achievements: [
        'Delivered successful projects and initiatives',
        'Recognized for professional excellence'
      ],
      confidence: {
        personalInfo: 0.6,
        summary: 0.5,
        experience: 0.5,
        education: 0.5,
        skills: 0.4,
        projects: 0.3,
        overall: 0.5
      }
    };
  }
}

export const aiService = new AIService();