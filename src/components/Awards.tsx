import { FiAward, FiCircle, FiStar } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import { Box, Text, Flex, Badge, Paper } from "@optiaxiom/react";
import awardsData from "../data/awards.json";
import { ComponentPropsWithoutRef } from "react";

type BadgeProps = ComponentPropsWithoutRef<typeof Badge>;

type AwardItemProps = {
  title: string;
  description: string;
  year: string;
  index: number;
  tags?: Array<{ name: string; intent: BadgeProps["intent"] }>;
};

const getAwardIcon = (title: string, _index: number) => {
  if (title.toLowerCase().includes("scholarship")) {
    return <FiCircle size={22} className="text-yellow-500" />;
  } else if (
    title.toLowerCase().includes("champion") ||
    title.toLowerCase().includes("best")
  ) {
    return <FaTrophy size={22} className="text-yellow-500" />;
  } else if (title.toLowerCase().includes("runner")) {
    return <FiStar size={22} className="text-yellow-500" />;
  }
  return <FiAward size={22} className="text-yellow-500" />;
};

const AwardItem: React.FC<AwardItemProps> = ({
  title,
  description,
  year,
  index,
  tags,
}) => {
  const Icon = getAwardIcon(title, index);

  return (
    <Paper
      border="1"
      rounded="xl"
      p="24"
      bg="bg.default"
      className="card-hover"
      // w="2/3"
    >
      <Box>
        <Flex flexDirection={"row"} gap="12" justifyContent={"space-between"}>
          <Flex flexDirection={"row"} gap="12" flex="1" alignItems={"center"}>
            {Icon}
            <Text fontSize="xl" fontWeight="700">
              {title}
            </Text>
            {year && <Badge variant="strong">{year}</Badge>}
          </Flex>
          <Flex flexDirection={"row"} gap="12">
            {tags?.map((tag, index) => (
              <Badge key={index} intent={tag.intent}>
                {tag.name}
              </Badge>
            ))}
          </Flex>
        </Flex>
      </Box>
      <Box mt="12">
        <Text color="fg.default" fontWeight="400">
          {description}
        </Text>
      </Box>
    </Paper>
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
              tags={
                award.tags as Array<{
                  name: string;
                  intent: BadgeProps["intent"];
                }>
              }
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Awards;
