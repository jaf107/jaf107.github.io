import { Award, Trophy, Medal, Star } from "lucide-react";
import { Box, Text, Flex } from "@optiaxiom/react";
import awardsData from "../data/awards.json";

interface AwardItemProps {
  title: string;
  description: string;
  year: string;
  index: number;
}

const getAwardIcon = (title: string, _index: number) => {
  if (title.toLowerCase().includes("scholarship")) {
    return <Medal size={22} className="text-yellow-500" />;
  } else if (
    title.toLowerCase().includes("champion") ||
    title.toLowerCase().includes("top")
  ) {
    return <Trophy size={22} className="text-yellow-500" />;
  } else if (title.toLowerCase().includes("runner")) {
    return <Star size={22} className="text-yellow-500" />;
  }
  return <Award size={22} className="text-yellow-500" />;
};

const AwardItem: React.FC<AwardItemProps> = ({
  title,
  description,
  year,
  index,
}) => {
  const Icon = getAwardIcon(title, index);

  return (
    <Box className="card-hover h-full border border-border rounded-lg bg-bg.default p-6">
      <Box className="pb-2">
        <Flex justifyContent="space-between" alignItems="start">
          <Flex alignItems="center" gap="2">
            {Icon}
            <Text fontSize="lg" fontWeight="700">
              {title}
            </Text>
          </Flex>
          <Text
            fontSize="sm"
            color="fg.default"
            className="opacity-70 font-semibold"
          >
            {year}
          </Text>
        </Flex>
      </Box>
      <Box className="mt-4">
        <Text color="fg.default" className="opacity-70">
          {description}
        </Text>
      </Box>
    </Box>
  );
};

const Awards = () => {
  return (
    <Box className="py-16" id="awards">
      <Box className="container mx-auto px-4 md:px-6">
        <Flex justifyContent="center">
          <Text className="section-title text-center">
            <Text fontWeight="700" className="inline">
              Awards
            </Text>{" "}
            & Achievements
          </Text>
        </Flex>

        <Box className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 staggered-animate">
          {awardsData.map((award, index) => (
            <AwardItem
              key={index}
              title={award.title}
              description={award.description}
              year={award.year}
              index={index}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Awards;
