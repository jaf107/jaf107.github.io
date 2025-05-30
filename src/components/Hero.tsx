import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { Button, Box, Text, Flex, Link } from "@optiaxiom/react";
import aboutData from "../data/about.json";
import Logo from "./Logo";

const Hero = () => {
  const { name, title, bio, email, socialLinks } = aboutData;

  return (
    <Box id="about" display={"flex"} alignItems={"center"} h={"full"}>
      <Box className="container mx-auto px-4 md:px-6">
        <Flex className="flex-col md:flex-row items-center justify-between gap-10">
          <Box className="w-full md:w-3/5 space-y-6 staggered-animate">
            <Text className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
              {name}
            </Text>
            <Text className="text-2xl md:text-2xl font-bold text-foreground/80">
              {title}
            </Text>
            <Text className="text-lg text-muted-foreground max-w-xl">
              {bio}
            </Text>

            <Flex flexDirection={"row"}>
              <Button size="lg" icon={<Mail size={18} />} asChild>
                <Link href={`mailto:${email}`}>Contact Me</Link>
              </Button>
              <Button
                size="lg"
                icon={<Github size={18} />}
                appearance="subtle"
                asChild
              >
                <Link
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </Button>
              <Button
                size="lg"
                icon={<Linkedin size={18} />}
                appearance="subtle"
                asChild
              >
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </Button>
              <Button
                size="lg"
                icon={<FileText size={18} />}
                appearance="subtle"
                asChild
              >
                <Link
                  href={socialLinks.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </Link>
              </Button>
            </Flex>
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
