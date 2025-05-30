import { BookOpen, Calendar, FileText, ExternalLink } from "lucide-react";
import { Box, Text, Flex, Button } from "@optiaxiom/react";
import researchData from "../data/research.json";

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
    <Box className="card-hover border border-border rounded-lg bg-bg.default p-6">
      <Box className="pb-2">
        <Flex justifyContent="space-between" alignItems="start">
          <Flex alignItems="center" gap="2">
            <BookOpen size={20} className="text-primary" />
            <Box>
              <Text fontSize="xl" fontWeight="700">
                {title}
              </Text>
              <Text fontSize="md" color="fg.default" className="opacity-70">
                {organization}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap="2" className="text-sm">
            <Calendar size={14} className="opacity-70" />
            <Text fontWeight="600">{period}</Text>
          </Flex>
        </Flex>
      </Box>
      <Box className="space-y-3 mt-4">
        {description}
        {link && (
          <Box className="mt-2">
            <Button
              appearance="subtle"
              asChild
              icon={<ExternalLink size={14} />}
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const ResearchProject: React.FC<{
  title: string;
  technologies: string[];
  description: string;
  link?: string;
}> = ({ title, technologies, description, link }) => {
  return (
    <Box className="card-hover border border-border rounded-lg bg-bg.default p-6">
      <Box className="pb-2">
        <Flex alignItems="center" gap="2">
          <FileText size={20} className="text-primary" />
          <Text fontSize="lg" fontWeight="700">
            {title}
          </Text>
        </Flex>
      </Box>
      <Box className="space-y-3 mt-4">
        <Text color="fg.default" className="opacity-70">
          {description}
        </Text>
        <Text fontSize="sm" color="fg.default" className="opacity-70">
          <Text fontWeight="600" className="inline">
            Technologies:
          </Text>{" "}
          {technologies.join(", ")}
        </Text>
        {link && (
          <Box className="mt-3">
            <Button
              appearance="subtle"
              asChild
              icon={<ExternalLink size={14} />}
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const Research = () => {
  const { experience, projects } = researchData;

  return (
    <Box className="py-16 bg-secondary/50" id="research">
      <Box className="container mx-auto px-4 md:px-6">
        <Text className="section-title">
          <Text fontWeight="700" className="inline">
            Research
          </Text>{" "}
          Experience
        </Text>

        <Box className="mt-10 grid gap-6 staggered-animate">
          {experience.map((exp, index) => (
            <ResearchItem
              key={index}
              title={exp.title}
              organization={exp.organization}
              period={exp.period}
              description={
                <Box className="space-y-3">
                  <Box role="list" className="space-y-2 list-disc pl-5">
                    {exp.points.map((point, pointIndex) => (
                      <Box role="listitem" key={pointIndex}>
                        <Text fontWeight="500">{point}</Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              }
              link={exp.link}
            />
          ))}

          <Text fontSize="xl" fontWeight="700" className="mt-8 mb-4">
            Research Projects
          </Text>

          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ResearchProject
                key={index}
                title={project.title}
                technologies={project.technologies}
                description={project.description}
                link={project.link || undefined}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Research;
