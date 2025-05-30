import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { SiGithub, SiLinkedin } from "react-icons/si";
import {
  Box,
  Button,
  Text,
  Flex,
  Link,
  ButtonGroup,
  Paper,
  Listbox,
  ListboxItem,
} from "@optiaxiom/react";
import contactData from "../data/contact.json";

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}

const getIcon = (iconName: string, size = 20) => {
  switch (iconName) {
    case "Mail":
      return <FiMail size={size} />;
    case "Phone":
      return <FiPhone size={size} />;
    case "Github":
      return <SiGithub size={size} />;
    case "Linkedin":
      return <SiLinkedin size={size} />;
    case "MapPin":
      return <FiMapPin size={size} />;
    default:
      return <FiMail size={size} />;
  }
};

const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  title,
  value,
  href,
}) => {
  const content = (
    <Flex alignItems="center" gap="16" flexDirection={"row"}>
      <Box rounded="full" bg="bg.avatar.neutral" color="fg.accent.hovered">
        {icon}
      </Box>
      <Box>
        <Text fontSize="sm" color="fg.default">
          {title}
        </Text>
        <Text fontWeight="500">{value}</Text>
      </Box>
    </Flex>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
};

const Contact = () => {
  return (
    <Flex
      mx="auto"
      px="4"
      alignItems={"center"}
      justifyContent={"start"}
      py="32"
      h={"full"}
    >
      <Text className="section-title">Get In Touch</Text>

      <Flex
        alignItems={"start"}
        justifyContent={"center"}
        flexDirection={"row"}
        mt="32"
      >
        <Paper
          p="32"
          rounded="xl"
          bg="bg.secondary"
          flex="1"
          justifyContent={"start"}
        >
          <Listbox>
            {contactData.contactInfo.map((item, index) => (
              <ListboxItem key={index}>
                <ContactItem
                  key={index}
                  icon={getIcon(item.icon)}
                  title={item.title}
                  value={item.value}
                  href={item.href}
                />
              </ListboxItem>
            ))}
          </Listbox>
        </Paper>

        <Paper
          h="full"
          flex={"1"}
          p="32"
          border="1"
          rounded="xl"
          className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-lg animate-fade-in"
        >
          <Flex
            flex="1"
            alignItems={"center"}
            justifyContent={"center"}
            gap="32"
          >
            <Text
              fontSize="2xl"
              fontWeight="700"
              className="text-2xl font-bold text-primary"
            >
              {contactData.callToAction.title}
            </Text>
            <Text
              color="fg.default"
              className="opacity-70"
              textAlign={"center"}
            >
              {contactData.callToAction.description}
            </Text>
            <ButtonGroup>
              <Button asChild icon={<FiMail />}>
                <Link href={`mailto:${contactData.contactInfo[0].value}`}>
                  Send Email
                </Link>
              </Button>
              <Button asChild icon={<SiLinkedin />}>
                <Link
                  href={contactData.contactInfo[2].href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn
                </Link>
              </Button>
              <Button asChild icon={<FiMail size={18} />}>
                <Link href={`mailto:${contactData.contactInfo[0].value}`}>
                  Contact Me
                </Link>
              </Button>
            </ButtonGroup>
          </Flex>
        </Paper>
      </Flex>
    </Flex>
  );
};

export default Contact;
