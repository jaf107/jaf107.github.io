import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Listbox,
  ListboxItem,
  Text,
} from "@optiaxiom/react";
import researchData from "../data/research.json";

import React from "react";
import {
  FiBookOpen,
  FiCalendar,
  FiFileText,
  FiExternalLink,
} from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  //CardHeader,
  CardTitle,
} from "@optiaxiom/react/unstable";

interface ResearchItemProps {
  title: string;
  organization: string;
  period: string;
  description: React.ReactNode;
  link?: string;
}

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
        className="pb-2"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="start"
      >
        <Flex alignItems="center" gap="12" flexDirection="row">
          <FiBookOpen size={20} className="text-primary" />
          <Box>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription className="text-base font-medium">
              {organization}
            </CardDescription>
          </Box>
        </Flex>
        <Flex
          flexDirection="row"
          alignItems="center"
          gap="2"
          className="text-sm text-muted-foreground"
        >
          <FiCalendar size={14} />
          <Text fontWeight="600">{period}</Text>
        </Flex>
      </Flex>
      <CardContent>
        <Box gap="2" className="space-y-3">
          {description}
          {link && (
            <Box mt="2">
              <Button appearance="subtle" size="sm" asChild className="gap-1">
                <Link href={link} target="_blank" rel="noopener noreferrer" />
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const ResearchProject: React.FC<{
  title: string;
  technologies: string[];
  description: string;
  link?: string;
}> = ({ title, technologies, description, link }) => {
  return (
    <Card className="card-hover">
      <Box className="pb-2">
        <Flex alignItems="center" gap="2">
          <FiFileText size={20} className="text-primary" />
          <CardTitle className="text-lg">
            <Text fontWeight="600">{title}</Text>
          </CardTitle>
        </Flex>
      </Box>
      <CardContent>
        <Text className="text-muted-foreground mb-3">{description}</Text>
        <Text className="text-sm text-muted-foreground">
          <Text fontWeight="600">Technologies:</Text> {technologies.join(", ")}
        </Text>
        {link && (
          <Box mt="2">
            <Button
              appearance="subtle"
              size="sm"
              asChild
              className="gap-1"
              icon={<FiExternalLink size={14} />}
            >
              <Link href={link} target="_blank" rel="noopener noreferrer" />
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const Research = () => {
  const { experience, projects } = researchData;

  return (
    <Flex id="research" className="py-16 bg-secondary/50">
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
                <Box className="space-y-3">
                  <Listbox className="space-y-2 list-disc pl-5">
                    {exp.points.map((point, pointIndex) => (
                      <ListboxItem key={pointIndex}>
                        <Text fontWeight="600">{point}</Text>
                      </ListboxItem>
                    ))}
                  </Listbox>
                </Box>
              }
              link={exp.link}
            />
          ))}

          <Heading level="3" className="text-xl font-bold mt-8 mb-4">
            Research Projects
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
