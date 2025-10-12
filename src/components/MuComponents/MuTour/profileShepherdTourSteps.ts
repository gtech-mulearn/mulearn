import { ShepherdStep } from './MuShepherdTour';

export const profileShepherdTourSteps: ShepherdStep[] = [
  {
    popover: {
      title: 'Welcome to Your Profile Tour! 🎉',
      description: 'This is your comprehensive profile tour that will guide you through all the amazing features of your µLearn profile page. Let\'s explore together!',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '.mu-tour-muid',
    popover: {
      title: 'Your µLearn ID (MUID) 🆔',
      description: 'This is your unique µLearn identifier (MUID). It\'s a special code that represents you in the µLearn community and can be used to find your profile quickly.',
      side: 'right',
      align: 'start',
    },
  },
  {
    element: '.mu-tour-avatar',
    popover: {
      title: 'Your Profile Avatar 👤',
      description: 'This is your profile picture with a colored border that indicates your privacy status! 🎨\n\n🔵 **Blue Border**: Your profile is private - only you can see your details\n🟢 **Green Border**: Your profile is public - others can discover and view your profile\n\nYou can change your privacy settings anytime!',
      side: 'right',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-level',
    popover: {
      title: 'Your µLearn Level 🎯',
      description: 'This shows your current µLearn level! Your level represents your progress and engagement in the µLearn community. 📈\n\n**How to increase your level:**\n• Complete tasks and challenges 🎯\n• Earn Karma points through activities 🌟\n• Participate in interest groups 👥\n• Attend events and workshops 📚\n• Contribute to the community 🤝\n\nThe more active you are, the higher your level becomes!',
      side: 'right',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-basic-details',
    popover: {
      title: 'Your Performance Stats 📊',
      description: 'This section shows your key performance metrics in the µLearn ecosystem! 🌟\n\n📈 **Karma**: Total points earned through activities and contributions\n🏆 **Rank**: Your position among all µLearn community members\n⚡ **Avg.Karma**: Your average karma per month since joining\n\nThese stats reflect your engagement level and help track your progress over time. Keep participating to see these numbers grow! 🚀',
      side: 'right',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-edit-icon',
    popover: {
      title: 'Edit Your Profile ✏️',
      description: 'Click here to customize and edit your profile! ✨\n\n**What you can edit:**\n• Personal information and bio 📝\n• Profile picture 📸\n• Social media links 🔗\n• Privacy settings 🔒\n• Interest groups and preferences 🎯\n\nKeep your profile updated to make the most of your µLearn experience and connect with the community! 🚀',
      side: 'right',
      align: 'start',
    },
  },
  {
    element: '.mu-tour-profile-settings',
    popover: {
      title: 'Profile Settings ⚙️',
      description: 'Manage your profile visibility and work preferences here! 🛠️\n\n**Available Settings:**\n🔓 **Public Profile**: Make your profile discoverable to others\n💼 **Open to Work**: Let recruiters know you\'re available for opportunities\n🎯 **Open to Gigs**: Show interest in freelance and project work\n\nThese settings help you control your visibility and connect with the right opportunities! 🌟',
      side: 'left',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-existing-roles',
    popover: {
      title: 'Your Existing Roles 🎭',
      description: 'This shows all the roles you currently hold in the µLearn community! 👥\n\n**Examples of roles:**\n• Student 📚\n• Mentor 👨‍🏫\n• Campus Lead 🏛️\n• Interest Group Lead 🎯\n• Community Volunteer 🤝\n\nRoles reflect your contributions and responsibilities within µLearn. They unlock special privileges and recognition! ⭐',
      side: 'left',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-karma-history-tab',
    popover: {
      title: 'Karma History Tab 📈',
      description: 'Let\'s explore your karma journey! This tab shows your complete karma earning history. 🌟\n\n**What you\'ll find:**\n📊 **Detailed Timeline**: Every karma point you\'ve earned\n🎯 **Task Breakdown**: Which activities earned you karma\n📅 **Date Tracking**: When you completed each activity\n📈 **Progress Visualization**: Charts showing your growth\n\nClick Next to automatically open this section and see your karma story! 🚀',
      side: 'right',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-karma-history-content',
    popover: {
      title: 'Your Karma History Journey! 🌟',
      description: 'Welcome to your karma history section! This is where you can track your entire µLearn journey. 📈\n\n**Features you can explore:**\n📊 **Activity Timeline**: See all your completed tasks chronologically\n🎯 **Karma Breakdown**: Understand how you earned each point\n📱 **Visual Charts**: Graphs showing your progress over time\n⭐ **Achievement Milestones**: Track your major accomplishments\n\nThis section helps you understand your learning patterns and celebrate your growth! 🚀',
      side: 'right',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-mu-voyage-tab',
    popover: {
      title: 'Mu Voyage Tab 🚀',
      description: 'Now let\'s explore your learning pathway! The Mu Voyage tab shows your level progression and learning journey through µLearn. 🎓\n\n**What you\'ll discover:**\n📈 **Level Progression**: Your advancement through different levels\n🎯 **Learning Milestones**: Key achievements in your journey\n📚 **Skill Development**: Areas where you\'ve grown\n🏆 **Progress Tracking**: Visual representation of your learning path\n\nClick Next to automatically open this section and see your learning voyage! ⭐',
      side: 'right',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-mu-voyage-content',
    popover: {
      title: 'Your Learning Voyage! 🎓',
      description: 'This is your personal learning voyage dashboard! Here you can see your complete learning progression through µLearn. 🌟\n\n**Voyage Features:**\n🎯 **Level System**: Track your advancement through different skill levels\n📊 **Progress Visualization**: Charts and graphs showing your growth\n🏅 **Milestone Tracking**: Important achievements and breakthroughs\n📈 **Learning Analytics**: Insights into your learning patterns\n\nYour voyage shows how far you\'ve come and motivates you to reach new heights! 🚀',
      side: 'right',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-achievements-tab',
    popover: {
      title: 'Achievements Tab 🏆',
      description: 'Time to explore your accomplishments! The Achievements tab showcases all the badges and recognition you\'ve earned in µLearn. 🎖️\n\n**What awaits you:**\n🏅 **Badge Collection**: All the achievements you\'ve unlocked\n🎯 **Progress Tracking**: See which achievements you\'re close to earning\n⭐ **Recognition System**: Celebrate your learning milestones\n📈 **Motivation Boost**: Visual proof of your dedication and growth\n\nClick Next to automatically open this section and see your achievements! 🌟',
      side: 'right',
      align: 'center',
    },
  },
  {
    element: '.mu-tour-achievements-content',
    popover: {
      title: 'Your Achievement Gallery! 🏆',
      description: 'Welcome to your personal achievement showcase! This is where all your hard-earned badges and accomplishments are displayed. 🎖️\n\n**Achievement Features:**\n🏅 **Badge Collection**: Every achievement you\'ve unlocked through your efforts\n🎯 **Progress Indicators**: See which achievements you\'re close to earning\n⭐ **Milestone Celebrations**: Recognition for your learning dedication\n📊 **Achievement Analytics**: Track your accomplishment patterns\n🚀 **Motivation Hub**: Visual reminders of your growth and success\n\nYour achievements tell the story of your µLearn journey - be proud of how far you\'ve come! 🌟',
      side: 'right',
      align: 'center',
    },
  },
];