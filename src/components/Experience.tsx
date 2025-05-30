import React from "react";
import { Calendar, Briefcase, MapPin } from "lucide-react";
import {
  Disclosure,
  DisclosureContent,
  Badge,
  DisclosureTrigger,
  Flex,
  Link,
  Button,
  Box,
  Text,
} from "@optiaxiom/react";
import experienceData from "../data/experience.json";

interface RoleDetails {
  title: string;
  link?: string;
  points: string[];
}

interface Role {
  position: string;
  duration: string;
  details: RoleDetails[];
}

interface ExperienceItem {
  company: string;
  companyLink: string;
  roles: Role[];
}

const ExperienceCard: React.FC<ExperienceItem> = ({
  company,
  companyLink,
  roles,
}) => {
  // Extract company name and location if provided in format "Company, Location"
  const [companyName, location] = company.split(", ");

  return (
    <Box className="card-hover overflow-hidden" border="1" rounded="lg" bg="bg.default">
      <Box p="4" bg="bg.accent.subtle">
        <Flex justifyContent="space-between" alignItems="start" gap="2" flexWrap="wrap">
          <Box>
            <Flex alignItems="center" gap="2">
              <Briefcase className="h-5 w-5 text-primary" />
              <Link href={companyLink} fontSize="xl" fontWeight="700">
                {companyName}
              </Link>
              {location && (
                <>
                  <Text color="fg.default">•</Text>
                  <Flex alignItems="center" gap="2" fontSize="sm">
                    <MapPin size={14} className="text-muted-foreground/70" />
                    <Text fontWeight="500">{location}</Text>
                  </Flex>
                </>
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box p="4">
        {roles.map((role, roleIndex) => (
          <Box
            key={roleIndex}
            className={roleIndex > 0 ? "mt-6 pt-6 border-t border-border/50" : ""}
          >
            <Disclosure defaultOpen>
              <DisclosureTrigger chevronPosition="end">
                <Flex justifyContent="space-between">
                  <Flex gap="2">
                    <Text fontSize="xl" fontWeight="700">
                      {role.position}
                    </Text>
                  </Flex>
                  <Badge>
                    <Flex alignItems="center" gap="2">
                      <Calendar size={14} />
                      <Text fontWeight="600">{role.duration}</Text>
                    </Flex>
                  </Badge>
                </Flex>
              </DisclosureTrigger>
              <DisclosureContent>
                <Box ml="4">
                  {role.details.map((detail, detailIndex) => (
                    <Box
                      key={detailIndex}
                      className={`space-y-3 ${detailIndex > 0 ? "mt-6" : ""}`}
                    >
                      <Flex alignItems="center" gap="2">
                        <Text fontSize="lg" fontWeight="600" color="fg.accent.strong">
                          {detail.title}
                        </Text>
                        {detail.link && (
                          <Button size="sm" asChild>
                            <Link
                              href={detail.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              external
                            >
                              View
                            </Link>
                          </Button>
                        )}
                      </Flex>
                      {detail.points.length > 0 && (
                        <Box p="4" ml="6" className="space-y-2">
                          {detail.points.map((point, pointIndex) => (
                            <Box  key={pointIndex} 
                            // position="relative" 
                            p="2">
                              <Box
                                // position="absolute"
                                // left="-1rem"
                                // top="0.6rem"
                                
                                rounded="full"
                                bg="bg.accent"
                                // opacity="70"
                              />
                              <Text fontWeight="500">{point}</Text>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </DisclosureContent>
            </Disclosure>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Experience = () => {
  return (
    <Box  id="experience" py="16" bg="bg.accent.subtle">
      <Box maxW="lg" mx="auto" px="4">
        <Box textAlign="center" mb="10">
          <Text className="section-title" mx="auto">
            <Text  fontWeight="700">Professional</Text> Experience
          </Text>
          <Text color="fg.default" mt="2" maxW="lg" mx="auto">
            My <Text  fontWeight="600">professional journey</Text> and{" "}
            <Text  fontWeight="600">career progression</Text> across
            organizations
          </Text>
        </Box>

        <Box mt="10" display="grid" gap="8" className="staggered-animate">
          {experienceData.map((exp, index) => (
            <ExperienceCard
              key={index}
              company={exp.company}
              companyLink={exp.companyLink}
              roles={exp.roles}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Experience;
