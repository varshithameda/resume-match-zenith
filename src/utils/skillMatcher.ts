
// Enhanced skill matching utility with comprehensive database and improved accuracy
export const SKILL_DATABASE = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Rust', 
  'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell', 'PowerShell', 'C', 'Objective-C',
  'Dart', 'Elixir', 'Erlang', 'F#', 'Haskell', 'Lua', 'VB.NET', 'COBOL', 'Fortran',
  
  // Frontend Technologies
  'React', 'Angular', 'Vue.js', 'Vue', 'Svelte', 'jQuery', 'HTML', 'CSS', 'SASS', 'LESS', 
  'Bootstrap', 'Tailwind CSS', 'Tailwind', 'Material UI', 'Ant Design', 'Chakra UI', 'Next.js',
  'Nuxt.js', 'Gatsby', 'Ember.js', 'Backbone.js', 'Alpine.js', 'Stimulus',
  
  // Backend Technologies
  'Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'Spring', 'ASP.NET', 
  'Laravel', 'CodeIgniter', 'Ruby on Rails', 'Rails', 'Gin', 'Echo', 'NestJS', 'Koa',
  'Fastify', 'Hapi', 'Meteor', 'Strapi', 'GraphQL', 'Apollo', 'Prisma',
  
  // Databases
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 
  'Cassandra', 'DynamoDB', 'Firebase', 'Supabase', 'MariaDB', 'CouchDB', 'Neo4j',
  'InfluxDB', 'Elasticsearch', 'Solr', 'Apache Kafka', 'RabbitMQ',
  
  // Cloud & DevOps
  'AWS', 'Azure', 'Google Cloud', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 
  'GitHub Actions', 'Terraform', 'Ansible', 'Chef', 'Puppet', 'Vagrant', 'Heroku',
  'Vercel', 'Netlify', 'DigitalOcean', 'Linode', 'CloudFlare',
  
  // Mobile Development
  'React Native', 'Flutter', 'iOS Development', 'Android Development', 'Xamarin', 
  'Ionic', 'Cordova', 'Unity', 'Unreal Engine', 'Swift UI', 'Jetpack Compose',
  
  // Data & Analytics
  'Machine Learning', 'Deep Learning', 'Data Science', 'TensorFlow', 'PyTorch', 
  'Pandas', 'NumPy', 'Scikit-learn', 'Tableau', 'Power BI', 'Apache Spark',
  'Jupyter', 'Keras', 'OpenCV', 'NLTK', 'SpaCy', 'Matplotlib', 'Seaborn',
  
  // Testing & Quality
  'Jest', 'Cypress', 'Selenium', 'Playwright', 'Unit Testing', 'Integration Testing', 
  'End-to-End Testing', 'Test Automation', 'Mocha', 'Chai', 'Jasmine', 'Puppeteer',
  'WebdriverIO', 'TestNG', 'JUnit', 'PyTest', 'RSpec',
  
  // Tools & Methodologies
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Slack', 'Agile', 'Scrum', 
  'Kanban', 'DevOps', 'CI/CD', 'Microservices', 'RESTful APIs', 'REST API', 'GraphQL',
  'Webpack', 'Vite', 'Rollup', 'Parcel', 'Gulp', 'Grunt', 'NPM', 'Yarn', 'PNPM',
  
  // Design & UI/UX
  'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'InVision', 'Zeplin',
  'UI Design', 'UX Design', 'Responsive Design', 'Mobile First', 'Accessibility',
  
  // Soft Skills
  'Leadership', 'Team Management', 'Project Management', 'Communication', 
  'Problem Solving', 'Critical Thinking', 'Mentoring', 'Collaboration', 'Time Management'
];

export const extractSkillsFromText = (text: string): string[] => {
  if (!text || text.trim().length === 0) {
    console.log('No text provided for skill extraction');
    return [];
  }

  const lowerText = text.toLowerCase();
  const foundSkills: string[] = [];
  
  console.log('Extracting skills from text:', text.substring(0, 200) + '...');
  
  SKILL_DATABASE.forEach(skill => {
    const skillLower = skill.toLowerCase();
    
    // Create multiple patterns to match variations
    const patterns = [
      new RegExp(`\\b${escapeRegExp(skillLower)}\\b`, 'gi'),
      new RegExp(`\\b${escapeRegExp(skillLower.replace(/\./g, ''))}\\b`, 'gi'),
      new RegExp(`\\b${escapeRegExp(skillLower.replace(/\s+/g, ''))}\\b`, 'gi'),
      new RegExp(`\\b${escapeRegExp(skillLower.replace(/-/g, ' '))}\\b`, 'gi'),
      new RegExp(`\\b${escapeRegExp(skillLower.replace(/-/g, ''))}\\b`, 'gi')
    ];
    
    // Check if any pattern matches
    const isMatch = patterns.some(pattern => pattern.test(lowerText));
    
    if (isMatch && !foundSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      foundSkills.push(skill);
      console.log('Found skill:', skill);
    }
  });
  
  console.log('Total skills found:', foundSkills.length, foundSkills);
  return foundSkills;
};

// Helper function to escape special regex characters
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const calculateAccurateMatchScore = (
  jobSkills: string[], 
  candidateSkills: string[]
): {
  score: number;
  matchingSkills: string[];
  missingSkills: string[];
  weightedScore: number;
} => {
  console.log('Calculating match score:');
  console.log('Job skills:', jobSkills);
  console.log('Candidate skills:', candidateSkills);
  
  if (jobSkills.length === 0) {
    console.log('No job skills found, returning 0 score');
    return { score: 0, matchingSkills: [], missingSkills: [], weightedScore: 0 };
  }

  // Find exact matches (case insensitive)
  const matchingSkills = candidateSkills.filter(candidateSkill =>
    jobSkills.some(jobSkill => 
      jobSkill.toLowerCase().trim() === candidateSkill.toLowerCase().trim()
    )
  );

  const missingSkills = jobSkills.filter(jobSkill =>
    !candidateSkills.some(candidateSkill => 
      candidateSkill.toLowerCase().trim() === jobSkill.toLowerCase().trim()
    )
  );

  // Basic percentage
  const basicScore = jobSkills.length > 0 ? Math.round((matchingSkills.length / jobSkills.length) * 100) : 0;

  // Weighted score considering skill importance
  const criticalSkills = [
    'React', 'JavaScript', 'Python', 'Java', 'Node.js', 'AWS', 'TypeScript',
    'Angular', 'Vue.js', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL'
  ];
  
  let weightedScore = basicScore;

  // Boost score for critical skills
  const criticalMatches = matchingSkills.filter(skill => 
    criticalSkills.some(critical => critical.toLowerCase() === skill.toLowerCase())
  );
  
  if (criticalMatches.length > 0) {
    weightedScore = Math.min(100, weightedScore + (criticalMatches.length * 3));
  }

  // Slight penalty for too many missing skills
  const missingRatio = missingSkills.length / jobSkills.length;
  if (missingRatio > 0.8) {
    weightedScore = Math.max(0, weightedScore - 5);
  }

  console.log('Match results:', {
    basicScore,
    weightedScore: Math.round(weightedScore),
    matchingSkills,
    missingSkills
  });

  return {
    score: basicScore,
    matchingSkills,
    missingSkills,
    weightedScore: Math.round(weightedScore)
  };
};
