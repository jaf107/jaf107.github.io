import { FiUser, FiCalendar, FiAward, FiMapPin, FiHome } from "react-icons/fi";
import { Box, Text, Flex, Badge } from "@optiaxiom/react";
import educationData from "../data/education.json";

interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  gpa: string;
  department?: string;
  description: string;
}

interface EducationCardProps {
  education: Education;
  index: number;
}

interface InfoItemProps {
  icon: React.ReactNode;
  text: string;
  isHighlighted?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, text, isHighlighted }) => (
  <Flex alignItems="center" gap="2" fontSize="sm">
    <Box
      color={isHighlighted ? "fg.accent" : "fg.default"}
      className={isHighlighted ? "" : "opacity-70"}
    >
      {icon}
    </Box>
    <Text fontWeight="500">{text}</Text>
  </Flex>
);

const EducationCard: React.FC<EducationCardProps> = ({ education, index }) => {
  const icon = index === 0 ? <FiUser size={20} /> : <FiHome size={20} />;

  return (
    <Box border="1" rounded="lg" bg="bg.default" p="6" className="card-hover">
      <Box pb="2">
        <Flex justifyContent="space-between" alignItems="start">
          <Flex alignItems="center" gap="2">
            <Box color="fg.accent">{icon}</Box>
            <Box>
              <Text fontSize="xl" fontWeight="700">
                {education.institution}
              </Text>
              <Text fontSize="lg" color="fg.default" className="opacity-70">
                {education.degree}
              </Text>
            </Box>
          </Flex>
          <Badge>
            <Flex alignItems="center" gap="2">
              <FiCalendar size={14} />
              <Text fontWeight="600">{education.duration}</Text>
            </Flex>
          </Badge>
        </Flex>
      </Box>

      <Box mt="4" className="space-y-3">
        <InfoItem icon={<FiMapPin size={14} />} text={education.location} />

        <Text color="fg.default" className="opacity-70">
          <Text fontWeight="600" display="inline">
            GPA —
          </Text>{" "}
          {education.gpa}
        </Text>

        {education.department && (
          <InfoItem
            icon={<FiAward size={14} />}
            text={education.department}
            isHighlighted
          />
        )}

        <Text fontSize="sm" color="fg.default" className="opacity-70">
          {education.description}
        </Text>
      </Box>
    </Box>
  );
};

const Education: React.FC = () => {
  return (
    <Box py="16" bg="bg.accent.subtle" id="education">
      <Box maxW="full" mx="auto" px="4">
        <Box textAlign="center" mb="10">
          <Text className="section-title" mx="auto">
            <Text fontWeight="700" display="inline">
              Education
            </Text>
          </Text>
          <Text color="fg.default" mt="2" className="max-w-lg mx-auto">
            My academic journey and qualifications
          </Text>
        </Box>

        <Box mt="10" className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          {educationData.map((education, index) => (
            <EducationCard key={index} education={education} index={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Education;
