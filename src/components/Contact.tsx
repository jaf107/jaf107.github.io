import React from 'react';
import { Mail, Phone, Github, Linkedin, MapPin } from 'lucide-react';
import { Box, Button, Text, Flex } from '@optiaxiom/react';
import contactData from '../data/contact.json';

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, value, href }) => {
  const content = (
    <Flex alignItems="center" gap="4">
      <Box className="bg-primary/10 p-3 rounded-full text-primary">
        {icon}
      </Box>
      <Box>
        <Text fontSize="sm" color="fg.default" className="opacity-70">{title}</Text>
        <Text fontWeight="500">{value}</Text>
      </Box>
    </Flex>
  );

  if (href) {
    return (
      <Box 
        className="block hover:opacity-80 transition-opacity"
        onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
      >
        {content}
      </Box>
    );
  }

  return content;
};

const Contact = () => {
  // Icon mapping
  const getIcon = (iconName: string, size = 20) => {
    switch (iconName) {
      case 'Mail':
        return <Mail size={size} />;
      case 'Phone':
        return <Phone size={size} />;
      case 'Github':
        return <Github size={size} />;
      case 'Linkedin':
        return <Linkedin size={size} />;
      case 'MapPin':
        return <MapPin size={size} />;
      default:
        return <Mail size={size} />;
    }
  };

  return (
    <Box className="py-16" id="contact">
      <Box className="container mx-auto px-4 md:px-6">
        <Text className="section-title">Get In Touch</Text>
        
        <Box className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Box className="space-y-6 staggered-animate">
            <Text fontSize="lg" color="fg.default" className="opacity-70">
              {contactData.message}
            </Text>
            
            <Box className="bg-bg.default border border-border rounded-lg p-6 space-y-4">
              {contactData.contactInfo.map((item, index) => (
                <ContactItem 
                  key={index}
                  icon={getIcon(item.icon)} 
                  title={item.title} 
                  value={item.value} 
                  href={item.href} 
                />
              ))}
            </Box>
            
            <Flex gap="4">
              <Button asChild icon={<Mail size={18} />}>
                <a href={`mailto:${contactData.contactInfo[0].value}`}>
                  Send Email
                </a>
              </Button>
              <Button appearance="subtle" asChild icon={<Linkedin size={18} />}>
                <a href={contactData.contactInfo[2].href} target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
              </Button>
            </Flex>
          </Box>
          
          <Box className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-lg animate-fade-in">
            <Box textAlign="center" className="space-y-4">
              <Text fontSize="2xl" fontWeight="700" color="fg.accent">
                {contactData.callToAction.title}
              </Text>
              <Text color="fg.default" className="opacity-70">
                {contactData.callToAction.description}
              </Text>
              <Box className="pt-4">
                <Button size="lg" asChild icon={<Mail size={18} />}>
                  <a href={`mailto:${contactData.contactInfo[0].value}`}>
                    Contact Me
                  </a>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
