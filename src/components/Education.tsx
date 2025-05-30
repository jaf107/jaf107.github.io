import React from 'react';
import { GraduationCap, Calendar, Award, MapPin, School } from 'lucide-react';
import { Box, Text, Flex } from '@optiaxiom/react';
import educationData from '../data/education.json';

const EducationCard = ({ education, index }: { education: any; index: number }) => {
  return (
    <Box 
      className="card-hover border border-border rounded-lg bg-bg.default p-6"
    >
      <Box className="pb-2">
        <Flex justifyContent="space-between" alignItems="start">
          <Flex alignItems="center" gap="2">
            {index === 0 ? (
              <GraduationCap size={20} className="text-primary" />
            ) : (
              <School size={20} className="text-primary" />
            )}
            <Box>
              <Text fontSize="xl" fontWeight="700">
                {education.institution}
              </Text>
              <Text fontSize="lg" color="fg.default" className="opacity-70">
                {education.degree}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap="2" className="text-sm">
            <Calendar size={14} className="opacity-70" />
            <Text fontWeight="600">{education.duration}</Text>
          </Flex>
        </Flex>
      </Box>

      <Box className="space-y-3 mt-4">
        <Flex alignItems="center" gap="2" className="text-sm">
          <MapPin size={14} className="opacity-70" />
          <Text fontWeight="500">{education.location}</Text>
        </Flex>
        <Text color="fg.default" className="opacity-70">
          <Text fontWeight="600" className="inline">GPA —</Text> {education.gpa}
        </Text>
        {education.department && (
          <Flex alignItems="center" gap="2">
            <Award size={14} className="text-primary" />
            <Text fontSize="sm" fontWeight="500">
              {education.department}
            </Text>
          </Flex>
        )}
        <Text fontSize="sm" color="fg.default" className="opacity-70">
          {education.description}
        </Text>
      </Box>
    </Box>
  );
};

const Education = () => {
  return (
    <Box className="py-16 bg-secondary/50" id="education">
      <Box className="container mx-auto px-4 md:px-6">
        <Text className="section-title">
          <Text fontWeight="700" className="inline">Education</Text>
        </Text>
        
        <Box className="mt-10 max-w-2xl mx-auto space-y-6 animate-fade-in">
          {educationData.map((education, index) => (
            <EducationCard 
              key={index} 
              education={education} 
              index={index} 
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Education;
