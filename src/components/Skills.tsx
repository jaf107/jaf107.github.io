import { Code, Database, Terminal, Layout, Server, Wrench } from "lucide-react";
import { Box, Text, Flex, Badge } from "@optiaxiom/react";
import skillsData from "../data/skills.json";

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

interface SkillsData {
  categories: SkillCategory[];
  problemSolving: string;
}

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

interface IconProps {
  size?: number;
  className?: string;
}

const getIcon = (iconName: string, props: IconProps = { size: 20 }) => {
  const icons = {
    Code: <Code {...props} />,
    Terminal: <Terminal {...props} />,
    Layout: <Layout {...props} />,
    Database: <Database {...props} />,
    Wrench: <Wrench {...props} />,
    Server: <Server {...props} />,
  };

  return icons[iconName as keyof typeof icons] || icons.Code;
};

const SkillCategory: React.FC<SkillCategoryProps> = ({
  title,
  icon,
  skills,
}) => {
  return (
    <Box
      border="1"
      rounded="lg"
      bg="bg.default"
      p="6"
      h="full"
      className="card-hover"
    >
      <Box pb="2">
        <Flex alignItems="center" gap="2">
          <Box color="fg.accent">{icon}</Box>
          <Text fontSize="lg" fontWeight="700">
            {title}
          </Text>
        </Flex>
      </Box>

      <Box mt="4">
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

const Skills: React.FC = () => {
  const { categories, problemSolving }: SkillsData = skillsData;

  return (
    <Box py="16" bg="bg.accent.subtle" id="skills">
      <Box maxW="full" mx="auto" px="4">
        <Box textAlign="center" mb="10">
          <Text className="section-title" mx="auto">
            <Text fontWeight="700" display="inline">
              Technical
            </Text>{" "}
            Skills
          </Text>
          <Text color="fg.default" mt="2" className="max-w-lg mx-auto">
            My technical expertise and proficiencies
          </Text>
        </Box>

        <Box
          mt="10"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 staggered-animate"
        >
          {categories.map((category, index) => (
            <SkillCategory
              key={index}
              title={category.title}
              icon={getIcon(category.icon)}
              skills={category.skills}
            />
          ))}
        </Box>

        <Box textAlign="center" mt="10">
          <Text color="fg.default" className="opacity-70">
            <Text fontWeight="600" display="inline">
              {problemSolving}
            </Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Skills;
