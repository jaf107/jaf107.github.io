import { FiCalendar, FiAward, FiMapPin, FiBookOpen } from "react-icons/fi";
import { Box, Flex, Text } from "@optiaxiom/react";
import educationData from "../data/education.json";

const Education = () => {
  return (
    <Box id="education" className="py-16 bg-secondary/50">
      <Flex className="mx-auto px-4 md:px-6">
        <Text className="section-title">Education</Text>

        <Flex className="mt-10 max-w-2xl mx-auto space-y-6 animate-fade-in">
          {educationData.map((education, index) => (
            <Box
              key={index}
              className="card-hover border border-border rounded-lg bg-bg.default p-6"
            >
              <Box className="pb-2">
                <Box className="flex justify-between items-start">
                  <Box className="flex items-center gap-4">
                    <FiBookOpen size={25} className="text-primary" />
                    <Box>
                      <Text fontSize="lg" fontWeight="700">
                        {education.institution}
                      </Text>
                      <Text
                        fontSize="md"
                        color="fg.default"
                        className="opacity-70"
                      >
                        {education.degree}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="flex items-center gap-1 text-sm text-muted-foreground">
                    <FiCalendar size={14} />
                    <Text fontSize="sm" fontWeight="500">
                      {education.duration}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box className="mt-4">
                <Box className="space-y-3">
                  <Box className="flex items-center gap-1 text-sm">
                    <FiMapPin size={14} className="text-muted-foreground" />
                    <Text fontSize="sm" fontWeight="500">
                      {education.location}
                    </Text>
                  </Box>
                  <Text fontSize="sm" fontWeight="500">
                    GPA — <span className="font-semibold">{education.gpa}</span>
                  </Text>
                  {education.department && (
                    <Box className="flex items-center gap-1">
                      <FiAward size={14} className="text-primary" />
                      <Text fontSize="sm" fontWeight="500">
                        {education.department}
                      </Text>
                    </Box>
                  )}
                  <Text fontSize="sm" fontWeight="400" color="fg.secondary">
                    {education.description}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Education;
