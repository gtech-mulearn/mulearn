import { ShepherdStep } from './MuShepherdTour';

// Exact conversion from Driver.js dashboardTourSteps to Shepherd.js
export const dashboardShepherdTourSteps: ShepherdStep[] = [
  {
    element: '.mu-tour-welcome',
    popover: {
      title: 'Welcome to µLearn! 👋',
      description: 'This is your personalized dashboard where you can track your learning journey, connect with peers, and explore exciting opportunities.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-start-learning',
    popover: {
      title: 'Start Your Learning Journey',
      description: 'Click here to explore Interest Groups and find learning communities that match your interests and goals.',
      side: 'top',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-join-learning',
    popover: {
      title: 'Join Learning Circles',
      description: 'Connect with like-minded learners in Learning Circles - small groups focused on specific topics and skills.',
      side: 'top',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-learning-circles',
    popover: {
      title: 'Learning Circles Section',
      description: 'Here you can see available Learning Circles in your domain. Join circles to collaborate with peers and learn together.',
      side: 'left',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-karma-earners',
    popover: {
      title: 'Karma Leaderboard',
      description: 'See top performers and get inspired! Earn karma points by participating in activities and completing tasks.',
      side: 'left',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-interest-groups',
    popover: {
      title: 'Interest Groups',
      description: 'Explore different Interest Groups based on your domain. Each group offers specialized learning paths and resources.',
      side: 'left',
      align: 'center',
    },
  }
];

// Exact conversion from Driver.js navigationTourSteps to Shepherd.js
export const navigationShepherdTourSteps: ShepherdStep[] = [
  {
    element: '.mu-tour-nav-profile',
    popover: {
      title: 'Your Profile',
      description: 'Access your profile, view your achievements, and manage your account settings.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-nav-interestgroups',
    popover: {
      title: 'Interest Groups',
      description: 'Browse all available Interest Groups and find communities that align with your learning goals.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-nav-leaderboard',
    popover: {
      title: 'Leaderboard',
      description: 'Check your ranking and see how you compare with other learners in the community.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-nav-courses',
    popover: {
      title: 'Courses & Bootcamps',
      description: 'Access trending courses and bootcamps to enhance your skills and advance your career.',
      side: 'bottom',
      align: 'center',
    },
  }
];

// Exact conversion from Driver.js firstTimeTourSteps to Shepherd.js
export const firstTimeShepherdTourSteps: ShepherdStep[] = [
  {
    popover: {
      title: 'Welcome to µLearn! 🎉',
      description: 'Let\'s take a quick tour to help you get started on your learning journey. This will only take a minute!',
      side: 'bottom',
      align: 'center',
    },
  },
  ...dashboardShepherdTourSteps,
  {
    popover: {
      title: 'Tour Complete! ✨',
      description: 'You\'re all set! Start exploring, join learning circles, and begin your amazing learning journey with µLearn. Happy learning! 🚀',
      side: 'bottom',
      align: 'center',
    },
  }
];

// Exact conversion from Driver.js quickTourSteps to Shepherd.js
export const quickShepherdTourSteps: ShepherdStep[] = [
  {
    element: '.mu-tour-welcome',
    popover: {
      title: 'Dashboard Overview',
      description: 'Your personalized learning hub with everything you need to grow and connect.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-learning-circles',
    popover: {
      title: 'Join Learning Circles',
      description: 'Collaborative learning groups where you can learn with peers.',
      side: 'left',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-events',
    popover: {
      title: 'Stay Updated',
      description: 'Don\'t miss out on exciting events and opportunities!',
      side: 'left',
      align: 'center',
    },
  }
];

// Tour step configurations for different user scenarios (exact match to Driver.js getTourSteps)
export const getDashboardShepherdTourSteps = (tourType: 'first-time' | 'dashboard' | 'navigation' | 'quick' = 'dashboard') => {
  switch (tourType) {
    case 'first-time':
      return firstTimeShepherdTourSteps;
    case 'navigation':
      return navigationShepherdTourSteps;
    case 'quick':
      return quickShepherdTourSteps;
    default:
      return dashboardShepherdTourSteps;
  }
};