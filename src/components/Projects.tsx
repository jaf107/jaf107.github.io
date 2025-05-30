import { useState } from "react";
import {
  Github,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
} from "lucide-react";
import {
  Box,
  Text,
  Badge,
  Button,
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  Flex,
  Link,
  SegmentedControl,
  SegmentedControlItem,
} from "@optiaxiom/react";
import projectsData from "../data/projects.json";

interface ProjectItemProps {
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string | null;
  demoLink?: string | null;
  achievements?: string[];
  imagePath?: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  achievements,
  imagePath,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasAchievements = achievements && achievements.length > 0;

  return (
    <Box
      className="h-full flex flex-col card-hover"
      border="1"
      rounded="lg"
      bg="bg.default"
    >
      <Box
        className="relative w-full h-48 overflow-hidden rounded-lg"
        bg="bg.accent.subtle"
      >
        {imagePath ? (
          <img
            src={imagePath}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <Flex
            alignItems="center"
            justifyContent="center"
            className="w-full h-full"
          >
            <ImageIcon size={48} className="opacity-40" />
          </Flex>
        )}
      </Box>

      <Box p="4">
        <Text fontSize="xl" fontWeight="700">
          {title}
        </Text>
      </Box>
      <Box p="4" className="flex-1">
        <Text color="fg.default" className="mb-4">
          {description}
        </Text>
        <Flex flexWrap="wrap" gap="2" className="mb-4">
          {technologies.map((tech, index) => (
            <Badge key={index}>{tech}</Badge>
          ))}
        </Flex>

        {hasAchievements && (
          <Disclosure open={isOpen} onOpenChange={setIsOpen}>
            <DisclosureTrigger>
              <Button
                appearance="subtle"
                className="flex items-center gap-1 w-full justify-between"
              >
                <Text fontWeight="600">Key Achievements</Text>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </DisclosureTrigger>
            <DisclosureContent>
              <Box className="p-4 space-y-2">
                {achievements.map((achievement, i) => (
                  <Box key={i} className="relative p-2">
                    <Box className="absolute -left-4 top-2.5 w-2 h-2 rounded-full bg-accent opacity-70" />
                    <Text
                      fontSize="sm"
                      dangerouslySetInnerHTML={{
                        __html: achievement.replace(
                          /\*\*(.*?)\*\*/g,
                          '<span class="font-bold">$1</span>'
                        ),
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </DisclosureContent>
          </Disclosure>
        )}
      </Box>
      <Flex p="4" gap="2">
        {githubLink && (
          <Button appearance="subtle" icon={<Github size={14} />}>
            <Link href={githubLink} target="_blank" rel="noopener noreferrer">
              Code
            </Link>
          </Button>
        )}
        {demoLink && (
          <Button icon={<ExternalLink size={14} />}>
            <Link href={demoLink} target="_blank" rel="noopener noreferrer">
              Demo
            </Link>
          </Button>
        )}
      </Flex>
    </Box>
  );
};

const Projects = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { id: "research", label: "Research" },
    { id: "academic", label: "Academic" },
    { id: "hackathon", label: "Hackathon" },
  ];

  const filteredProjects =
    selectedCategories.length === 0
      ? projectsData
      : projectsData.filter((project) =>
          selectedCategories.some((category) =>
            project.categories?.includes(category)
          )
        );

  return (
    <Box className="py-16" id="projects">
      <Box className="max-w-lg mx-auto px-4">
        <Box className="text-center mb-10">
          <Text className="section-title mx-auto">
            <Text fontWeight="700" className="inline">
              Academic
            </Text>{" "}
            Projects
          </Text>
          <Text color="fg.default" className="mt-3 max-w-lg mx-auto">
            A showcase of my academic and personal projects
          </Text>
        </Box>

        <Flex justifyContent="center" className="mb-8">
          <SegmentedControl
            value={selectedCategories}
            onValueChange={setSelectedCategories}
          >
            {categories.map((category) => (
              <SegmentedControlItem key={category.id} value={category.id}>
                {category.label}
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </Flex>

        <Box className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 staggered-animate">
          {filteredProjects.map((project, index) => (
            <ProjectItem
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              githubLink={project.githubLink}
              demoLink={project.demoLink}
              achievements={project.achievements}
              imagePath={project.imagePath}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;
