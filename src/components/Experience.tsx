import React from "react";
import { Calendar, Briefcase, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import experienceData from "../data/experience.json";
import {
  Disclosure,
  DisclosureContent,
  Badge,
  DisclosureTrigger,
  Flex,
  Link,
  Button,
} from "@optiaxiom/react";

interface RoleDetails {
  title: string;
  link?: string;
  points: string[];
}

interface Role {
  position: string;
  duration: string;
  details: RoleDetails[];
}

interface ExperienceItem {
  company: string;
  companyLink: string;
  roles: Role[];
}

const ExperienceCard: React.FC<ExperienceItem> = ({
  company,
  companyLink,
  roles,
}) => {
  // Extract company name and location if provided in format "Company, Location"
  const [companyName, location] = company.split(", ");

  return (
    <Card className="card-hover overflow-hidden ">
      <CardHeader className="pb-2 bg-muted/30">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-lg font-medium text-foreground">
              <Briefcase className="h-5 w-5 text-primary" />

              <Link href={companyLink} className="font-bold text-xl">
                {companyName}
              </Link>

              {location && (
                <>
                  <span className="text-muted-foreground/50">•</span>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin size={14} className="text-muted-foreground/70" />
                    <span className="font-medium">{location}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {roles.map((role, roleIndex) => (
          <div
            key={roleIndex}
            className={
              roleIndex > 0 ? "mt-6 pt-6 border-t border-border/50" : ""
            }
          >
            <Disclosure defaultOpen>
              <DisclosureTrigger chevronPosition="end">
                <Flex flexDirection={"row"} justifyContent={"space-between"}>
                  <Flex justifyItems={"center"} gap={"2"} flexDirection={"row"}>
                    <CardTitle className="text-xl">
                      <span className="font-bold">{role.position}</span>
                    </CardTitle>
                  </Flex>

                  <Badge className="flex items-center gap-1 px-2 py-1 h-auto">
                    <Calendar size={14} />
                    <span className="font-semibold">{role.duration}</span>
                  </Badge>
                </Flex>
                {/* </div> */}
              </DisclosureTrigger>
              <DisclosureContent>
                <div className="ml-4">
                  {role.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className={`space-y-3 ${detailIndex > 0 ? "mt-6" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground/90 flex items-center gap-2">
                          <span className="font-bold">{detail.title}</span>
                        </h3>
                        {detail.link && (
                          <Button size="sm" asChild>
                            <Link
                              href={detail.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              external
                            >
                              View
                            </Link>
                          </Button>
                        )}
                      </div>
                      {detail.points.length > 0 && (
                        <ul className="space-y-2 pl-5 ml-6">
                          {detail.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="relative pl-1">
                              <span className="absolute left-[-1rem] top-[0.6rem] h-1.5 w-1.5 rounded-full bg-primary/70"></span>
                              <span className="font-medium">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </DisclosureContent>
            </Disclosure>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="section-title mx-auto">
            <span className="font-bold">Professional</span> Experience
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            My <span className="font-semibold">professional journey</span> and{" "}
            <span className="font-semibold">career progression</span> across
            organizations
          </p>
        </div>

        <div className="mt-10 grid gap-8 staggered-animate">
          {experienceData.map((exp, index) => (
            <ExperienceCard
              key={index}
              company={exp.company}
              companyLink={exp.companyLink}
              roles={exp.roles}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
