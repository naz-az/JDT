import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaBuilding, 
  FaPhone, 
  FaRocket, 
  FaMapMarkerAlt, 
  FaClock, 
  FaEnvelope, 
  FaBriefcase, 
  FaFileAlt,
  FaMap,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 2rem;
`;

const HeroSection = styled.section`
  padding: 3rem 2rem;
  text-align: center;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.isDark 
    ? 'radial-gradient(circle at 50% 50%, rgba(0, 200, 83, 0.1) 0%, transparent 50%)'
    : 'radial-gradient(circle at 50% 50%, rgba(45, 90, 65, 0.1) 0%, transparent 50%)'
  };
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  position: relative;
  z-index: 2;
  
  .highlight {
    color: ${props => props.theme.colors.accent};
    text-shadow: 0 0 20px ${props => props.theme.colors.glow}40;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  position: relative;
  z-index: 2;
`;

const ContactSection = styled.section`
  padding: 5rem 2rem;
`;

const ContactContainer2 = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactForm = styled(motion.form)`
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 3rem;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  
  .highlight {
    color: ${props => props.theme.colors.accent};
    text-shadow: 0 0 20px ${props => props.theme.colors.glow}40;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  font-size: 0.9rem;
`;

const FormInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.hasError ? '#ff6b6b' : props.theme.colors.border};
  border-radius: 12px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.accent}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const FormTextarea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.hasError ? '#ff6b6b' : props.theme.colors.border};
  border-radius: 12px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.accent}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const FormSelect = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.hasError ? '#ff6b6b' : props.theme.colors.border};
  border-radius: 12px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.accent}20;
  }
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: block;
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px ${props => props.theme.colors.glow}40;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
`;

const InfoCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 280px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px ${props => props.theme.colors.glow}20;
  }
`;

const InfoIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.colors.accent}20;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.accent};
  margin: 0 auto 1rem;
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const InfoDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const InfoDetails = styled.div`
  margin-top: auto;
  
  .detail-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.textSecondary};
    
    .icon {
      color: ${props => props.theme.colors.accent};
      width: 16px;
    }
  }
`;

const MapSection = styled.section`
  padding: 3rem;
`;

const MapWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const MapContainer = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const MapTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  z-index: 2;
  position: relative;
`;

const MapDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  z-index: 2;
  position: relative;
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
  border-radius: 12px;
  flex: 1;
  min-height: 400px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.colors.accent}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.accent};
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    color: white;
    transform: translateY(-3px);
  }
`;

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitMessage('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaBuilding />,
      title: 'Head Office',
      description: 'Visit us at our headquarters in Jakarta for consultations and meetings.',
      details: [
        { icon: <FaMapMarkerAlt />, text: 'Jakarta, Indonesia' },
        { icon: <FaClock />, text: 'Mon - Fri: 8:00 AM - 6:00 PM' }
      ]
    },
    {
      icon: <FaPhone />,
      title: 'Get in Touch',
      description: 'Reach out to us through phone or email for immediate assistance.',
      details: [
        { icon: <FaPhone />, text: '+62 21-XXXX XXXX' },
        { icon: <FaEnvelope />, text: 'info@jdtengineering.com' }
      ]
    },
    {
      icon: <FaRocket />,
      title: 'Business Inquiries',
      description: 'For partnership opportunities and large-scale project discussions.',
      details: [
        { icon: <FaBriefcase />, text: 'business@jdtengineering.com' },
        { icon: <FaFileAlt />, text: 'Request a Proposal' }
      ]
    },
    // {
    //   icon: <FaMap />,
    //   title: 'Follow Us',
    //   description: 'Stay connected with us on social media for updates and insights.',
    //   details: [
    //     { icon: <FaEnvelope />, text: 'newsletter@jdtengineering.com' },
    //     { icon: <FaPhone />, text: 'Social Media Updates' }
    //   ],
    //   social: true
    // }
  ];

  const services = [
    'Digital Solutions',
    'Engineering Services',
    'System Integration',
    'Advanced Technologies',
    'Process Optimization',
    'Consultation Services'
  ];

  return (
    <ContactContainer>
      <HeroSection>
        <HeroBackground />
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact <span className="highlight">Us</span>
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ready to start your next engineering project? Get in touch with our team of experts. 
          We're here to help you achieve your goals with innovative solutions.
        </HeroSubtitle>
      </HeroSection>

      <ContactSection>
        <ContactContainer2>
          <ContactForm
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
          >
            <FormTitle>
              Start Your <span className="highlight">Project</span>
            </FormTitle>
            
            <FormGroup>
              <FormLabel htmlFor="name">Full Name *</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                hasError={!!errors.name}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="email">Email Address *</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                hasError={!!errors.email}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="company">Company Name *</FormLabel>
              <FormInput
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter your company name"
                hasError={!!errors.company}
              />
              {errors.company && <ErrorMessage>{errors.company}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <FormInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="service">Service Interest *</FormLabel>
              <FormSelect
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                hasError={!!errors.service}
              >
                <option value="">Select a service</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </FormSelect>
              {errors.service && <ErrorMessage>{errors.service}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="message">Project Details *</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your project requirements..."
                hasError={!!errors.message}
              />
              {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>

            {submitMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '1rem',
                  textAlign: 'center',
                  color: submitMessage.includes('Thank you') ? '#4ade80' : '#ff6b6b'
                }}
              >
                {submitMessage}
              </motion.p>
            )}
          </ContactForm>

          <ContactInfo
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {contactInfo.map((info, index) => (
              <InfoCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <InfoIcon>{info.icon}</InfoIcon>
                <InfoTitle>{info.title}</InfoTitle>
                <InfoDescription>{info.description}</InfoDescription>
                <InfoDetails>
                  {info.details.map((detail, idx) => (
                    <div key={idx} className="detail-item">
                      <span className="icon">{detail.icon}</span>
                      <span>{detail.text}</span>
                    </div>
                  ))}
                </InfoDetails>
                {info.social && (
                  <SocialLinks>
                    <SocialLink
                      href="https://facebook.com/jdtengineering"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaFacebook />
                    </SocialLink>
                    <SocialLink
                      href="https://twitter.com/jdtengineering"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTwitter />
                    </SocialLink>
                    <SocialLink
                      href="https://linkedin.com/company/jdtengineering"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaLinkedin />
                    </SocialLink>
                    <SocialLink
                      href="https://instagram.com/jdtengineering"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaInstagram />
                    </SocialLink>
                    <SocialLink
                      href="https://youtube.com/jdtengineering"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaYoutube />
                    </SocialLink>
                  </SocialLinks>
                )}
              </InfoCard>
            ))}
          </ContactInfo>
        </ContactContainer2>
      </ContactSection>

      <MapSection>
        <MapWrapper>
          <MapContainer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MapTitle>Find Us</MapTitle>
            <MapDescription>
              Located in the heart of Jakarta's business district
            </MapDescription>
            <MapIframe
              src="https://maps.google.com/maps?q=Jl.+Thamrin+No.1,+Jakarta+Pusat,+DKI+Jakarta,+Indonesia&output=embed"
              title="JDT Engineering Office Location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapContainer>
        </MapWrapper>
      </MapSection>
    </ContactContainer>
  );
};

export default Contact; 