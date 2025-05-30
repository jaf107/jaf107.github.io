import {
  FiCode,
  FiDatabase,
  FiTerminal,
  FiLayout,
  FiServer,
  FiTool,
  FiCloud,
} from "react-icons/fi";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiDotnet,
  SiReact,
  SiSpring,
  SiNodedotjs,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiPostman,
  SiDocker,
  SiNginx,
  SiAmazonwebservices,
} from "react-icons/si";
import { Box, Text, Flex, Badge, Heading } from "@optiaxiom/react";
import skillsData from "../data/skills.json";
import { Card } from "@optiaxiom/react/unstable";

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({
  title,
  icon,
  skills,
}) => {
  const getTechIcon = (skill: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      // Programming Languages
      Python: <SiPython size={16} className="text-blue-500" />,
      JavaScript: <SiJavascript size={16} className="text-yellow-500" />,
      TypeScript: <SiTypescript size={16} className="text-blue-600" />,
      Java: <FiCode size={16} className="text-red-500" />,
      "C#": <FiCode size={16} className="text-purple-600" />,
      "C++": <SiCplusplus size={16} className="text-blue-700" />,

      // Web Frameworks
      ".NET": <SiDotnet size={16} className="text-purple-600" />,
      ReactJS: <SiReact size={16} className="text-blue-400" />,
      SpringBoot: <SiSpring size={16} className="text-green-600" />,
      NodeJS: <SiNodedotjs size={16} className="text-green-600" />,
      "Next.js": (
        <SiNextdotjs size={16} className="text-black dark:text-white" />
      ),
      Express: <SiExpress size={16} className="text-gray-700" />,

      // Databases
      MSSQL: <FiDatabase size={16} className="text-red-600" />,
      MongoDB: <SiMongodb size={16} className="text-green-600" />,
      MySQL: <SiMysql size={16} className="text-blue-600" />,
      PostgreSQL: <SiPostgresql size={16} className="text-blue-700" />,

      // Tools
      Git: <SiGit size={16} className="text-orange-600" />,
      Postman: <SiPostman size={16} className="text-orange-500" />,
      Azure: <FiCloud size={16} className="text-blue-600" />,
      Docker: <SiDocker size={16} className="text-blue-500" />,
      Nginx: <SiNginx size={16} className="text-green-600" />,
      AWS: <SiAmazonwebservices size={16} className="text-orange-400" />,
    };

    return iconMap[skill] || <FiCode size={16} className="text-gray-500" />;
  };

  return (
    <Card className="card-hover">
      <Box pb="2">
        <Flex alignItems="center" gap="2">
          <Box color="fg.accent">{icon}</Box>
          <Text fontSize="lg" fontWeight="700">
            {title}
          </Text>
        </Flex>
      </Box>

      <Box mt="4">
        <Flex flexWrap="wrap" gap="4" flexDirection="row">
          {skills.map((skill, index) => (
            <Badge key={index} gap={"2"} variant="strong">
              {getTechIcon(skill)}
              <Text fontSize="sm" fontWeight="500">
                {skill}
              </Text>
            </Badge>
          ))}
        </Flex>
      </Box>
    </Card>
  );
};

const Skills = () => {
  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <FiCode size={20} className="text-primary" />;
      case "Terminal":
        return <FiTerminal size={20} className="text-primary" />;
      case "Layout":
        return <FiLayout size={20} className="text-primary" />;
      case "Database":
        return <FiDatabase size={20} className="text-primary" />;
      case "Wrench":
        return <FiTool size={20} className="text-primary" />;
      case "Server":
        return <FiServer size={20} className="text-primary" />;
      default:
        return <FiCode size={20} className="text-primary" />;
    }
  };

  return (
    <Flex h="full" id="skills" justifyContent={"start"} py="64">
      <Flex className="container mx-auto px-4 md:px-6">
        <Heading level={"2"} className="section-title">
          Technical
        </Heading>

        <Flex className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 staggered-animate">
          {skillsData.categories.map((category, index) => (
            <SkillCategory
              key={index}
              title={category.title}
              icon={getIcon(category.icon)}
              skills={category.skills}
            />
          ))}
        </Flex>

        <Flex className="mt-10 text-center">
          <Text fontWeight="700">{skillsData.problemSolving}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Skills;
