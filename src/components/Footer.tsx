import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-1">Abu Jafar Saifullah</h3>
            <p className="text-primary-foreground/80">Software Engineer</p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/jaf107"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/abu-jafar-saifullah/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:jafarmahin107@gmail.com"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-6 pt-6 text-center text-sm text-primary-foreground/60">
          <p>&copy; {currentYear} Abu Jafar Saifullah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
