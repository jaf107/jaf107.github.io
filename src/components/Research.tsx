import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Listbox,
  ListboxItem,
  Text,
} from "@optiaxiom/react";
import researchDataJson from "../data/research.json";

import React from "react";
import {
  FiBookOpen,
  FiCalendar,
  FiFileText,
  // FiExternalLink,
  FiGithub,
} from "react-icons/fi";
import { Card } from "@optiaxiom/react/unstable";

interface ResearchItemProps {
  title: string;
  organization: string;
  period: string;
  description: React.ReactNode;
  link?: string;
}

interface TechnologyItem {
  tool: string;
  badgeType:
    | "information"
    | "warning"
    | "success"
    | "danger"
    | "neutral"
    | "primary";
}

interface ResearchExperience {
  title: string;
  organization: string;
  period: string;
  points: string[];
  link?: string;
}

interface ResearchProject {
  title: string;
  technologies: TechnologyItem[];
  description: string;
  link?: string;
}

interface ResearchData {
  experience: ResearchExperience[];
  projects: ResearchProject[];
}

const researchData = researchDataJson as ResearchData;

const ResearchItem: React.FC<ResearchItemProps> = ({
  title,
  organization,
  period,
  description,
  link,
}) => {
  return (
    <Card className="card-hover">
      <Flex
        gap="12"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="start"
        w="full"
      >
        <Flex alignItems="center" flexDirection="row">
          <FiBookOpen size={20} className="text-primary" />
          <Flex gap="2">
            <Text className="text-xl font-bold">{title}</Text>
            <Text className="text-base font-medium">{organization}</Text>
          </Flex>
        </Flex>
        <Flex flexDirection="row" gap="2">
          <FiCalendar size={14} />
          <Text fontWeight="400">{period}</Text>
        </Flex>
      </Flex>
      <Flex flexDirection="row" justifyContent="space-between">
        <Box w="full">
          {description}
          {link && (
            <Button appearance="subtle" size="sm" asChild>
              <Link href={link} target="_blank" rel="noopener noreferrer" />
            </Button>
          )}
        </Box>
      </Flex>
    </Card>
  );
};

const ResearchProject: React.FC<{
  title: string;
  technologies: TechnologyItem[];
  description: string;
  link?: string;
}> = ({ title, technologies, description, link }) => {
  return (
    <Card className="card-hover">
      <Flex alignItems="center" flexDirection="row" gap="8" w="full">
        <FiFileText size={20} className="text-primary" />
        <Flex
          w="full"
          className="text-lg"
          flexDirection="row"
          justifyContent={"space-between"}
        >
          <Text fontWeight="600">{title}</Text>
          <Flex flexDirection="row" justifyContent={"end"}>
            {technologies.map((tech, i) => (
              <Badge key={i} intent={tech.badgeType}>
                {tech.tool}
              </Badge>
            ))}
            {link && (
              <Box mt="2">
                <Button
                  appearance="default"
                  size="sm"
                  asChild
                  className="gap-1"
                  icon={<FiGithub size={14} />}
                >
                  <Link href={link} target="_blank" rel="noopener noreferrer" />
                </Button>
              </Box>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between">
        <Text className="text-muted-foreground mb-3">{description}</Text>
      </Flex>
    </Card>
  );
};

const Research = () => {
  const { experience, projects } = researchData;

  return (
    <Flex id="research" className="py-16 ">
      <Flex className="container mx-auto px-4 md:px-6" alignItems="center">
        <Heading level="2" className="section-title">
          Research Experience
        </Heading>

        <Box className="mt-10 grid gap-6 staggered-animate">
          {experience.map((exp, i) => (
            <ResearchItem
              key={i}
              title={exp.title}
              organization={exp.organization}
              period={exp.period}
              description={
                <Listbox ml="32">
                  {exp.points.map((point, pointIndex) => (
                    <ListboxItem key={pointIndex}>
                      <Text fontWeight="400">- {point}</Text>
                    </ListboxItem>
                  ))}
                </Listbox>
              }
              link={exp.link}
            />
          ))}

          <Heading textAlign="center" className="section-title mt-10 mb-6">
            Projects
          </Heading>

          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ResearchProject
                key={i}
                title={project.title}
                technologies={project.technologies}
                description={project.description}
                link={project.link ?? undefined}
              />
            ))}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Research;
