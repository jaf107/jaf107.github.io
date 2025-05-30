import { FiMail } from "react-icons/fi";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Button, Flex, Tooltip } from "@optiaxiom/react";
import contactData from "../data/contact.json";

const NavLinks = () => {
  return (
    <Flex
      bg="bg.secondary"
      className="fixed top-0 right-0 z-50 flex items-center gap-2 p-4"
    >
      <Tooltip content="Visit GitHub Profile">
        <Button
          appearance="subtle"
          aria-label="GitHub Profile"
          icon={<SiGithub className="h-5 w-5 text-primary" />}
          asChild
        >
          <a
            href={
              contactData.contactInfo.find((item) => item.title === "GitHub")
                ?.href || "https://github.com/jaf107"
            }
            target="_blank"
            rel="noopener noreferrer"
          />
        </Button>
      </Tooltip>

      <Tooltip content="Connect on LinkedIn">
        <Button
          appearance="subtle"
          aria-label="LinkedIn Profile"
          icon={<SiLinkedin className="h-5 w-5 text-primary" />}
          asChild
        >
          <a
            href={
              contactData.contactInfo.find((item) => item.title === "LinkedIn")
                ?.href || "https://www.linkedin.com/in/abu-jafar-saifullah/"
            }
            target="_blank"
            rel="noopener noreferrer"
          />
        </Button>
      </Tooltip>

      <Tooltip content="Send Email">
        <Button
          appearance="subtle"
          aria-label="Send Email"
          icon={<FiMail className="h-5 w-5 text-primary" />}
          asChild
        >
          <a
            href={
              contactData.contactInfo.find((item) => item.title === "Email")
                ?.href || "mailto:jafarmahin107@gmail.com"
            }
            target="_blank"
            rel="noopener noreferrer"
          />
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default NavLinks;
