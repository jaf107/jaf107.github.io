
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { Button, Box, Text, Flex, Link } from "@optiaxiom/react";
import aboutData from "../data/about.json";
import Logo from "./Logo";

const Hero = () => {
  const { name, title, bio, phone, email, socialLinks } = aboutData;

  return (
    <Box
      id="about"
      className="min-h-screen flex flex-col justify-center pt-16 pb-10"
    >
      <Box className="container mx-auto px-4 md:px-6">
        <Flex className="flex-col md:flex-row items-center justify-between gap-10">
          <Box className="w-full md:w-3/5 space-y-6 staggered-animate">
            <Text className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
              {name}
            </Text>
            <Text className="text-2xl md:text-3xl text-foreground/80">{title}</Text>
            <Text className="text-lg text-muted-foreground max-w-xl">{bio}</Text>
            <Flex className="flex-wrap gap-3">
              <Button icon={<Mail size={18} />} asChild>
                <Link href={`mailto:${email}`}>Contact Me</Link>
              </Button>
              <Button icon={<Github size={18} />} appearance="subtle" asChild>
                <Link
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </Button>
              <Button icon={<Linkedin size={18} />} appearance="subtle" asChild>
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </Button>
              <Button icon={<FileText size={18} />} appearance="subtle" asChild>
                <Link
                  href={socialLinks.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </Link>
              </Button>
            </Flex>
            <Flex alignItems="center" gap="3" className="text-sm text-muted-foreground">
              <Flex alignItems="center" gap="1">
                <Phone size={14} />
                <Text>{phone}</Text>
              </Flex>
              <Flex alignItems="center" gap="1">
                <Mail size={14} />
                <Text>{email}</Text>
              </Flex>
            </Flex>
            <Box className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10"></Box>
          </Box>
          <Box className="w-full md:w-2/5 flex justify-center md:justify-end animate-fade-in">
            <Logo size={240} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Hero;
