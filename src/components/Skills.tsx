import React from 'react';
import { Code, Database, Terminal, Layout, Server, Wrench } from 'lucide-react';
import { Box, Text, Flex, Badge } from '@optiaxiom/react';
import skillsData from '../data/skills.json';

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, icon, skills }) => {
  return (
    <Box 
      className="h-full card-hover border border-border rounded-lg bg-bg.default p-6"
    >
      <Box className="pb-2">
        <Flex alignItems="center" gap="2">
          {icon}
          <Text fontSize="lg" fontWeight="700">
            {title}
          </Text>
        </Flex>
      </Box>
      <Box className="mt-4">
        <Flex flexWrap="wrap" gap="2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="subtle" intent="neutral">
              {skill}
            </Badge>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const Skills = () => {
  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code size={20} className="text-primary" />;
      case 'Terminal':
        return <Terminal size={20} className="text-primary" />;
      case 'Layout':
        return <Layout size={20} className="text-primary" />;
      case 'Database':
        return <Database size={20} className="text-primary" />;
      case 'Wrench':
        return <Wrench size={20} className="text-primary" />;
      case 'Server':
        return <Server size={20} className="text-primary" />;
      default:
        return <Code size={20} className="text-primary" />;
    }
  };

  return (
    <Box className="py-16 bg-secondary/50" id="skills">
      <Box className="container mx-auto px-4 md:px-6">
        <Text className="section-title">
          <Text fontWeight="700" className="inline">Technical</Text> Skills
        </Text>
        
        <Box className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 staggered-animate">
          {skillsData.categories.map((category, index) => (
            <SkillCategory 
              key={index}
              title={category.title} 
              icon={getIcon(category.icon)} 
              skills={category.skills} 
            />
          ))}
        </Box>

        <Box textAlign="center" className="mt-10">
          <Text color="fg.default" className="opacity-70">
            <Text fontWeight="600" className="inline">{skillsData.problemSolving}</Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Skills;
