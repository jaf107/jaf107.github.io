
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  BookOpen,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutData from "../data/about.json";
import Logo from "./Logo";

const Hero = () => {
  const { name, title, bio, phone, email, socialLinks } = aboutData;

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center pt-16 pb-10"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-3/5 space-y-6 staggered-animate">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
              {name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-foreground/80">{title}</h2>
            <p className="text-lg text-muted-foreground max-w-xl">{bio}</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" asChild className="gap-2">
                <a href={`mailto:${email}`}>
                  <Mail size={18} />
                  Contact Me
                </a>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <a
                  href={socialLinks.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText size={18} />
                  Resume
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Phone size={14} />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span>{email}</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10"></div>
          </div>
          <div className="w-full md:w-2/5 flex justify-center md:justify-end animate-fade-in">
            <Logo size={240} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
