
import React from 'react';
import { Code, Database, Terminal, Layout, Server, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import skillsData from '../data/skills.json';

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, icon, skills }) => {
  return (
    <Card className="h-full card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          <span className="font-bold">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="px-2.5 py-1 text-sm font-medium">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
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
    <section id="skills" className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">
          <span className="font-bold">Technical</span> Skills
        </h2>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 staggered-animate">
          {skillsData.categories.map((category, index) => (
            <SkillCategory 
              key={index}
              title={category.title} 
              icon={getIcon(category.icon)} 
              skills={category.skills} 
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground">
            <span className="font-semibold">{skillsData.problemSolving}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
