'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, alpha } from '@mui/material';
import TerminalMockup from 'components/Public/TerminalMockup/TerminalMockup';
import CTAButtons from 'components/Public/CTAButtons/CTAButtons';
import { DIMENSIONS } from 'constants/landing';

const thoughtEvolution = [
  "a fleeting idea",
  "a structured thought",
  "a connected insight",
  "a knowledge system"
];

const HeroSection = () => {
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentThought = thoughtEvolution[thoughtIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentThought.length) {
          setDisplayText(currentThought.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentThought.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setThoughtIndex((prev) => (prev + 1) % thoughtEvolution.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, thoughtIndex]);

  return (
    <Box
      component="section"
      bgcolor="background.default"
      py={DIMENSIONS.spacing.section}
      aria-labelledby="hero-title"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: (theme) => alpha(theme.palette.primary.main, 0.03),
          filter: 'blur(60px)',
        }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'center', lg: 'flex-start' },
          gap: DIMENSIONS.spacing.container
        }}>
          <Box component="aside" aria-label="Code example" sx={{ order: { xs: 1, lg: 2 } }}>
            <TerminalMockup />
          </Box>

          <Box component="header" sx={{
            order: { xs: 2, lg: 1 },
            flex: 1,
            minWidth: 0,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: DIMENSIONS.spacing.container
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              <Typography
                variant="h1"
                component="h1"
                id="hero-title"
                fontWeight="bold"
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  background: (theme) => `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Transform
              </Typography>

              <Box sx={{
                minHeight: { xs: '60px', md: '80px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography
                  variant="h2"
                  component="div"
                  fontWeight="600"
                  color="primary.main"
                  sx={{
                    textAlign: 'center',
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    fontStyle: 'italic',
                    position: 'relative',
                    '&::after': {
                      content: '"|"',
                      marginLeft: '4px',
                      animation: 'blink 1s infinite',
                    },
                    '@keyframes blink': {
                      '0%, 49%': { opacity: 1 },
                      '50%, 100%': { opacity: 0 },
                    }
                  }}
                >
                  {displayText}
                </Typography>
              </Box>

              <Typography
                variant="h3"
                component="h2"
                fontWeight="bold"
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  fontSize: { xs: '1.5rem', md: '2.125rem' },
                  background: (theme) => `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                into enduring knowledge
              </Typography>
            </Box>

            <Typography
              variant="h6"
              component="p"
              color="text.secondary"
              sx={{
                maxWidth: DIMENSIONS.layout.maxContentWidth,
                mx: 'auto',
                textAlign: 'center',
                width: '100%',
                lineHeight: 1.7,
                fontSize: { xs: '1rem', md: '1.125rem' }
              }}
            >
              Where thinking meets structure. SeaNotes transforms scattered thoughts into interconnected insights,
              helping you build a personal knowledge system that evolves with your understanding.
            </Typography>

            <Box component="nav" aria-label="Primary actions">
              <CTAButtons />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;