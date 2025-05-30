import { Mail, Phone, Github, Linkedin, MapPin } from "lucide-react";
import { Box, Button, Text, Flex, Link, ButtonGroup } from "@optiaxiom/react";
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
      return <Mail size={size} />;
    case "Phone":
      return <Phone size={size} />;
    case "Github":
      return <Github size={size} />;
    case "Linkedin":
      return <Linkedin size={size} />;
    case "MapPin":
      return <MapPin size={size} />;
    default:
      return <Mail size={size} />;
  }
};

const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  title,
  value,
  href,
}) => {
  const content = (
    <Flex alignItems="center" gap="8" flexDirection={"row"}>
      <Box
        rounded="full"
        bg="bg.avatar.neutral"
        p="12"
        color="fg.accent.hovered"
      >
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
        px="80"
      >
        <Flex flex={"1"}>
          <Flex
            border="1"
            p="32"
            rounded="lg"
            bg="bg.default"
            flex="1"
            justifyContent={"start"}
          >
            {contactData.contactInfo.map((item, index) => (
              <ContactItem
                key={index}
                icon={getIcon(item.icon)}
                title={item.title}
                value={item.value}
                href={item.href}
              />
            ))}
          </Flex>
        </Flex>

        <Flex h="full" flex={"1"} p="32" border="1" rounded="lg">
          <Flex flex="1" alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl" fontWeight="700">
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
              <Button asChild size="lg" icon={<Mail />}>
                <Link href={`mailto:${contactData.contactInfo[0].value}`}>
                  Send Email
                </Link>
              </Button>
              <Button asChild size="lg" icon={<Linkedin />}>
                <Link
                  href={contactData.contactInfo[2].href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn
                </Link>
              </Button>
              <Button asChild size="lg" icon={<Mail size={18} />}>
                <Link href={`mailto:${contactData.contactInfo[0].value}`}>
                  Contact Me
                </Link>
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Contact;
