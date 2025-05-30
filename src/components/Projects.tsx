import React, { useState } from "react";
import {
  FiGithub,
  FiExternalLink,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { Card, CardContent, CardTitle } from "@optiaxiom/react/unstable";
import { Badge, Box, Flex, Heading, Link } from "@optiaxiom/react";
import { Button } from "@optiaxiom/react";
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@optiaxiom/react";
import projectsData from "../data/projects.json";

interface ProjectItemProps {
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string | null;
  demoLink?: string | null;
  achievements?: string[];
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  achievements,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasAchievements = achievements && achievements.length > 0;

  return (
    <Card className="h-full flex flex-col card-hover" border="1" rounded="xl">
      <Box className="flex justify-between">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <Box className="flex gap-2">
          {githubLink && (
            <Button
              asChild
              appearance="subtle"
              size="sm"
              className="gap-1"
              icon={<FiGithub size={14} />}
            >
              <Link
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
              />
            </Button>
          )}
          {demoLink && (
            <Button
              asChild
              appearance="subtle"
              size="sm"
              className="gap-1"
              icon={<FiExternalLink size={14} />}
            >
              <Link href={demoLink} target="_blank" rel="noopener noreferrer" />
            </Button>
          )}
        </Box>
      </Box>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <Badge key={index} intent="information">
              {tech}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>

        {hasAchievements && (
          <Disclosure open={isOpen} onOpenChange={setIsOpen} className="mt-2">
            <DisclosureTrigger>
              <Button
                appearance="subtle"
                size="sm"
                className="flex items-center gap-1 w-full justify-between"
              >
                <span className="font-semibold">Key Achievements</span>
                {isOpen ? (
                  <FiChevronUp size={16} />
                ) : (
                  <FiChevronDown size={16} />
                )}
              </Button>
            </DisclosureTrigger>
            <DisclosureContent className="mt-2">
              <ul className="space-y-2 pl-4">
                {achievements.map((achievement, i) => (
                  <li key={i} className="text-sm relative pl-2">
                    <span className="absolute left-[-1rem] top-[0.6rem] h-1.5 w-1.5 rounded-full bg-primary/70"></span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: achievement.replace(
                          /\*\*(.*?)\*\*/g,
                          '<span class="font-bold">$1</span>'
                        ),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </DisclosureContent>
          </Disclosure>
        )}
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  return (
    <Box id="projects" className="py-16">
      <Flex className="container mx-auto px-4 md:px-6" alignItems={"center"}>
        <Heading level="2" className="section-title" textAlign="center">
          Academic Projects
        </Heading>

        <Box className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 staggered-animate">
          {projectsData.map((project, index) => (
            <ProjectItem
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              githubLink={project.githubLink}
              demoLink={project.demoLink}
              achievements={project.achievements}
            />
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default Projects;
