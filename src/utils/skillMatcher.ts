
// Enhanced skill matching utility with better accuracy
export const SKILL_DATABASE = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Rust', 
  'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell', 'PowerShell',
  
  // Frontend Technologies
  'React', 'Angular', 'Vue.js', 'Svelte', 'jQuery', 'HTML', 'CSS', 'SASS', 'LESS', 
  'Bootstrap', 'Tailwind CSS', 'Material UI', 'Ant Design', 'Chakra UI',
  
  // Backend Technologies
  'Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'ASP.NET', 
  'Laravel', 'CodeIgniter', 'Ruby on Rails', 'Gin', 'Echo',
  
  // Databases
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 
  'Cassandra', 'DynamoDB', 'Firebase', 'Supabase',
  
  // Cloud & DevOps
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 
  'GitHub Actions', 'Terraform', 'Ansible', 'Chef', 'Puppet',
  
  // Mobile Development
  'React Native', 'Flutter', 'iOS Development', 'Android Development', 'Xamarin', 
  'Ionic', 'Cordova', 'Unity',
  
  // Data & Analytics
  'Machine Learning', 'Deep Learning', 'Data Science', 'TensorFlow', 'PyTorch', 
  'Pandas', 'NumPy', 'Scikit-learn', 'Tableau', 'Power BI', 'Apache Spark',
  
  // Testing & Quality
  'Jest', 'Cypress', 'Selenium', 'Playwright', 'Unit Testing', 'Integration Testing', 
  'End-to-End Testing', 'Test Automation',
  
  // Tools & Methodologies
  'Git', 'GitHub', 'GitLab', 'Jira', 'Confluence', 'Slack', 'Agile', 'Scrum', 
  'Kanban', 'DevOps', 'CI/CD', 'Microservices', 'RESTful APIs', 'GraphQL',
  
  // Soft Skills
  'Leadership', 'Team Management', 'Project Management', 'Communication', 
  'Problem Solving', 'Critical Thinking', 'Mentoring'
];

export const extractSkillsFromText = (text: string): string[] => {
  const lowerText = text.toLowerCase();
  const foundSkills: string[] = [];
  
  SKILL_DATABASE.forEach(skill => {
    const skillLower = skill.toLowerCase();
    // Check for exact matches and common variations
    const patterns = [
      skillLower,
      skillLower.replace(/\./g, ''),
      skillLower.replace(/\s+/g, ''),
      skillLower.replace(/-/g, ' '),
      skillLower.replace(/-/g, '')
    ];
    
    patterns.forEach(pattern => {
      if (lowerText.includes(pattern)) {
        if (!foundSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
          foundSkills.push(skill);
        }
      }
    });
  });
  
  return foundSkills;
};

export const calculateAccurateMatchScore = (
  jobSkills: string[], 
  candidateSkills: string[]
): {
  score: number;
  matchingSkills: string[];
  missingSkills: string[];
  weightedScore: number;
} => {
  if (jobSkills.length === 0) {
    return { score: 0, matchingSkills: [], missingSkills: [], weightedScore: 0 };
  }

  // Find exact matches (case insensitive)
  const matchingSkills = candidateSkills.filter(candidateSkill =>
    jobSkills.some(jobSkill => 
      jobSkill.toLowerCase() === candidateSkill.toLowerCase()
    )
  );

  const missingSkills = jobSkills.filter(jobSkill =>
    !candidateSkills.some(candidateSkill => 
      candidateSkill.toLowerCase() === jobSkill.toLowerCase()
    )
  );

  // Basic percentage
  const basicScore = Math.round((matchingSkills.length / jobSkills.length) * 100);

  // Weighted score considering skill importance and frequency
  const criticalSkills = ['React', 'JavaScript', 'Python', 'Java', 'Node.js', 'AWS'];
  let weightedScore = basicScore;

  // Boost score if critical skills match
  const criticalMatches = matchingSkills.filter(skill => 
    criticalSkills.some(critical => critical.toLowerCase() === skill.toLowerCase())
  );
  
  if (criticalMatches.length > 0) {
    weightedScore = Math.min(100, weightedScore + (criticalMatches.length * 5));
  }

  // Penalize if too many skills are missing
  if (missingSkills.length > jobSkills.length * 0.7) {
    weightedScore = Math.max(0, weightedScore - 10);
  }

  return {
    score: basicScore,
    matchingSkills,
    missingSkills,
    weightedScore: Math.round(weightedScore)
  };
};
