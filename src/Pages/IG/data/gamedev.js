export const gamedev = {
  title: "Game Development",
  introduction: {
    description:
      "Passionate about creating immersive experiences in gaming? The Game Development Interest Group is your gateway to learning about designing, programming, and storytelling in the world of games. Whether you're into creating captivating visuals, coding mechanics, or crafting narratives, join us to level up your game development skills.",
    downloadLink:
      "https://mulearnfoundation.notion.site/11e59e69b1bf8002aaa0e99daf76a94f?pvs=25",
    schedules: {
      officeHours: "Friday 8:30 @ Discord Lobby",
      thinkTankMeeting: "2nd Saturday 8:30 PM @ Google Meet",
    },
  },

  roadMap: [
    {
      level: "Level 4",
      cards: [
        {
          title: "Foundational Understanding",
          data: {
            description:
              "At the heart of every great game lies a solid foundation. Whether you're a beginner or someone with a bit of experience, understanding the building blocks of game development is essential. This means delving into the core mechanics that make games tick, like player interaction, objectives, and challenges. It’s not just about coding or graphics—it’s about crafting an experience that draws players in and keeps them engaged. In this phase, we’ll explore the tools and systems that Unreal Engine offers, such as its user-friendly Blueprint system that lets you create logic without needing to write code. We'll also familiarize ourselves with the engine’s interface, its capabilities, and its vast library of resources. Think of this as laying the foundation of a house—before you can build something impressive, you need to understand the basic structure and materials. This isn’t just about technical skills; it’s about getting comfortable with the process of game creation, feeling confident in your ability to transform ideas into reality, and building the mindset that turns challenges into creative opportunities.",
            whatYouWillLearn: [
              "Introduction to Game Development: Understand the core principles of game design, including player engagement, objectives, and interactive mechanics that create immersive experiences.",
              "Unreal Engine 5 Interface Overview: Familiarize yourself with the engine's interface, tools, and layout to build a strong understanding of its capabilities and workflows.",
              "Blueprint System Basics: Learn how to use Unreal Engine’s visual scripting tool to create game logic without coding, empowering you to bring your ideas to life efficiently.",
              "Navigating Resources and Tools: Explore Unreal Engine’s vast library of assets, tutorials, and documentation to enhance your projects and accelerate your learning.",
            ],
            challenges: [
              {
                title: "Research the basics of game development",
                resources: [
                  "https://gamedevacademy.org/game-design-principles-tutorial/",
                  "https://youtu.be/7C92ZCnlmQo?si=BKyuWrZEapLfsvF6",
                ],
                description:
                  "Dive into the fundamentals of game development to understand key aspects like game design, programming, art, and sound. Explore essential concepts such as mechanics, gameplay elements, and player interaction. This foundational knowledge will serve as a stepping stone for creating engaging games. After completing your research, create a blog that summarizes your findings. Once done, submit the public link of the blog in the #Game-Dev channel using the hashtag #cl-game-dev-basics to earn 200 Karma Points. (Suggestion: Use Medium for blog)",
              },
              {
                title: "Unreal Engine 5 Overview and Installation",
                resources: [
                  "https://dev.epicgames.com/documentation/en-us/unreal-engine/installing-unreal-engine",
                  "https://www.youtube.com/watch?v=k-zMkzmduqI&t=12676s",
                ],
                description:
                  "Download and install Unreal Engine 5 on your system. Once installed, explore the interface to familiarize yourself with key components like the viewport, content browser, outliner, and details panel. This task will help you understand the basic layout and functionality of the engine, preparing you for future projects. After completing take a screenshot of the opening interface screen of unreal engine with the project name as your name. Once done, submit the screenshot in the #Game-Dev channel using the hashtag #cl-game-dev-unreal to earn 200 Karma Points.",
              },
            ],
          },
          resources: 4,
          proofOfWork: 2,
          rating: 0,
          hasGift: true,
        },
        {
          title: "Core Engine Skills",
          data: {
            description:
              "Once you’ve mastered the basics, it’s time to delve into Unreal Engine’s advanced features and bring your ideas to life. This stage focuses on key skills like manipulating 3D assets, designing functional and visually stunning environments, and using Blueprints for interactivity without complex coding. You’ll explore Unreal's physics engine for realistic dynamics, master lighting and rendering to set the perfect atmosphere, and gain expertise in scene and asset management. By honing these core skills, you’ll transition from beginner to expert, ready to build anything from simple prototypes to immersive game worlds, unlocking your full creative potential.",
            whatYouWillLearn: [
              "Project Setup & Navigation: Learn to create and manage projects effectively, navigate the Unreal Engine interface, and organize assets for streamlined workflows.",
              "Game Level Layout: Develop skills in designing game levels by arranging 3D assets to create compelling environments that guide and engage players.",
              "Lighting and Rendering/Post-Processing: Master lighting techniques, rendering settings, and post-processing effects to create dynamic, atmospheric visuals that enhance the gaming experience.",
              "Blueprints for Interactivity: Explore Unreal Engine’s visual scripting system to implement interactivity, gameplay mechanics, and dynamic features without extensive coding.",
            ],

            challenges: [
              {
                title: "Set up a simple project in Unreal Engine 5",
                resources: ["https://www.youtube.com/watch?v=1XjgLKrb4_M"],
                description:
                  "Create a new project in Unreal Engine 5 by selecting a suitable template, such as First Person, Third Person, or Blank, based on your preference. Set up the project structure by organizing folders for assets, blueprints, materials, and any other essential components. Familiarize yourself with the settings and configuration options to ensure the project is optimized for development. This task will help you understand the basics of project creation, structure, and initial setup within Unreal Engine. During the project setting up take a screen recording of the process. Once done, upload it to any cloud platform and submit the link in the #Game-Dev channel using the hashtag #cl-game-dev-project to earn 200 Karma Points.",
              },
              {
                title: "Design a basic game level layout",
                resources: ["https://www.youtube.com/watch?v=1XjgLKrb4_M"],
                description:
                  "Design a basic game level layout in Unreal Engine 5 that incorporates clear pathways, obstacles, and interactive elements. Focus on creating an engaging environment that naturally guides players through the level. Consider player movement, visibility, and balance to ensure the design is both functional and enjoyable. This task is an excellent starting point for honing your level design and environmental creation skills. Create a basic game level layout using Unreal Engine. Your level should include clear pathways, obstacles, and interactive elements, focusing on functionality and creativity over fine details or polish. Once completed, upload your project to GitHub, ensuring you include a README file that describes your level design concept and the tools you used. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-basiclayout to earn 250 Karma Points.",
              },
              {
                title: "Experiment with lighting settings and post-processing",
                resources: ["https://www.youtube.com/watch?v=1XjgLKrb4_M"],
                description:
                  "Experiment with different lighting settings and post-processing effects in Unreal Engine 5 to enhance the visual appeal of your scene. Adjust light intensity, color, and shadows to create dynamic and realistic lighting. Explore post-processing features such as bloom, depth of field, and ambient occlusion to add depth and polish to your environment. This task will help you understand how lighting and post-processing can dramatically impact the mood and aesthetics of a game. Once completed, upload your project to GitHub, including a README file that describes the lighting and post-processing techniques you implemented. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-lighting to earn 250 Karma Points.",
              },
              {
                title: "Create basic interactions using Blueprints",
                resources: [
                  "https://www.youtube.com/watch?v=1XjgLKrb4_M",
                  "https://www.youtube.com/watch?v=oHoXwMjhOC8&t=30s",
                ],
                description:
                  "Use Unreal Engine’s Blueprints to design and implement basic interactions in your game. Examples include opening doors, turning lights on or off, or activating objects when the player interacts with them. Focus on functionality and ensure the interactions respond correctly to player input. This task will introduce you to Unreal’s visual scripting system and the basics of interactive gameplay. Create basic game interactions using Unreal Engine’s Blueprints. Focus on implementing simple interactions such as opening doors, triggering events, or activating objects when the player interacts with them. Once completed, upload your project to GitHub, ensuring you include a README file that explains the interactions you implemented and how they work. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-blueprints to earn 250 Karma Points.",
              },
            ],
          },
          resources: 5,
          proofOfWork: 4,
          rating: 0,
          hasGift: true,
        },
      ],
    },
    {
      level: "Level 5",
      cards: [
        {
          title: "Programming and Scripting",
          data: {
            description:
              "At the core of every game is the logic that drives its actions and interactions, which is where programming and scripting come in. While Unreal Engine’s Blueprint system is a great tool for non-programmers, mastering the fundamentals of scripting takes your skills to the next level. In this stage, we’ll focus on Unreal’s C++ integration, teaching you how to write code that interacts directly with the engine. C++ enables you to create complex game mechanics, optimize performance, and gain control over gameplay. You’ll start with basic coding concepts and move into more advanced topics like object-oriented and event-driven programming. By mastering scripting, you'll be able to solve problems creatively and create functional, scalable, and engaging gameplay.",
            whatYouWillLearn: [
              "Introduction to C++ for Unreal: Learn the basics of Unreal Engine’s C++ programming, including setting up your development environment and understanding the core syntax and structure.",
              "Advanced Blueprints: Enhance your Blueprint scripting knowledge by integrating C++ to create more robust and efficient gameplay systems.",
              "Gameplay Mechanics Development: Explore the process of designing and implementing gameplay mechanics, from character controls to AI behavior, using both Blueprints and C++.",
              "Event-Driven and Object-Oriented Programming: Master programming paradigms like event-driven and object-oriented approaches to create scalable and maintainable game logic.",
            ],

            challenges: [
              {
                title: "Write a simple C++ script for an in-game action",
                resources: [
                  "https://awesometuts.com/blog/cpp-unreal-engine",
                  "https://youtu.be/HNfpKFER2hI?si=z3RgbjvHKIqo9Mxs",
                ],
                description:
                  "Write a simple C++ script in Unreal Engine 5 to implement an in-game action, such as making the player jump, interact with objects, or trigger a special effect. Focus on creating the core functionality using Unreal's C++ framework and ensure the script interacts properly with the game’s mechanics. This task will help you get hands-on experience with Unreal Engine’s C++ coding environment and improve your programming skills for game development.\n\nWrite a simple C++ script in Unreal Engine to implement an in-game action, such as triggering a jump, opening a door, or interacting with an object. Focus on the basic functionality and ensure the script works as intended within the game.\n\nOnce completed, upload your project to GitHub, including a README file that describes the script and the action it performs.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-cplusplus to earn 300 Karma Points.",
              },
              {
                title: "Create a complex interaction using Blueprints",
                resources: [
                  "https://dev.epicgames.com/documentation/en-us/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine",
                  "https://www.youtube.com/watch?v=Xw9QEMFInYU",
                ],
                description:
                  "Design and implement a complex interaction using Unreal Engine’s Blueprints. Create systems such as a multi-step puzzle, a dynamic object that responds to multiple triggers, or an event sequence that combines animations and logic. Focus on creating seamless interactions that enhance gameplay and challenge the player. This task will deepen your understanding of Unreal's visual scripting system and help you create more engaging and intricate gameplay mechanics.\n\nCreate a complex in-game interaction using Unreal Engine’s Blueprints. This could involve multiple triggers, animations, or interactions that depend on player actions, such as a puzzle system, a dynamic object that reacts to player input, or a more advanced event sequence.\n\nOnce completed, upload your project to GitHub, including a README file that explains the interactions you’ve created and how they function.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-complexblueprint to earn 300 Karma Points.",
              },
              {
                title: "Implement basic player movement and interaction",
                resources: [
                  "https://dev.epicgames.com/documentation/en-us/unreal-engine/setting-up-character-movement",
                  "https://youtu.be/Z9zEEY7dGaM?si=gNllnL1I6569gklH",
                ],
                description:
                  "Set up basic player movement and interaction mechanics in Unreal Engine 5. Enable core movements like walking, running, and jumping by configuring input controls. Add simple player interactions such as picking up objects, pressing buttons, or opening doors using Blueprints or C++ scripting. This task will introduce you to handling character input and interaction systems, essential for creating engaging gameplay.\n\nImplement basic player movement and interaction in Unreal Engine using either Blueprints or C++. Set up standard player controls such as walking, running, jumping, and interacting with objects (e.g., picking up items, opening doors).\n\nOnce completed, upload your project to GitHub, including a README file that explains the movement mechanics and interactions you’ve implemented.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-playermovement to earn 350 Karma Points.",
              },
            ],
          },
          resources: 6,
          proofOfWork: 3,
          rating: 0,
          hasGift: true,
        },
        {
          title: "3D Modeling and Animation",
          data: {
            description:
              "Creating immersive game worlds starts with 3D modeling and animation, blending art with technical skill. In this phase, you’ll learn to use 3D modeling tools to design game assets like characters, landscapes, and props, focusing on polygonal modeling, texturing, and sculpting to create detailed, optimized models. Beyond static objects, you’ll explore animation techniques, including rigging and keyframe animation, to bring your models to life with realistic motion. Additionally, you’ll dive into Unreal Engine’s Animation Blueprint to integrate animations into gameplay. Mastering these skills will enhance your game’s visuals and storytelling, making your creations dynamic, engaging, and immersive.",
            whatYouWillLearn: [
              "Importing Assets: Learn to import 3D models, textures, and other assets into Unreal Engine while ensuring compatibility and optimization for game development.",
              "Animation Basics: Explore foundational animation techniques, including keyframing and timeline editing, to create smooth and realistic movement for characters and objects.",
              "Rigging and Skeletal Meshes: Understand how to rig 3D models with skeletons and use skeletal meshes to enable dynamic animations and interactions in your game.",
              "Using Animation Blueprints: Dive into Unreal Engine’s Animation Blueprint system to integrate and control animations in gameplay, adding realism and interactivity to your creations.",
            ],

            challenges: [
              {
                title: "Import a 3D model into Unreal Engine",
                resources: [
                  "https://www.youtube.com/watch?v=axF0m6lOjG8",
                  "https://www.youtube.com/watch?v=0ISnxjlLfx0",
                ],
                description:
                  "Import a 3D model into Unreal Engine 5 to use within your project. Ensure the model is properly textured, scaled, and positioned in the scene. Verify that all materials, animations (if any), and collisions are functioning correctly. This task will familiarize you with the process of bringing external assets into Unreal Engine for use in game environments.\n\nImport a 3D model into Unreal Engine. The model should include textures and materials where applicable. Once imported, ensure the model is correctly placed in the scene and functions as expected.\n\nOnce completed, upload your project to GitHub, including a README file that describes the 3D model, the software used to create it, and any adjustments made in Unreal Engine.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-3dmodel to earn 250 Karma Points.",
              },
              {
                title: "Add simple animations to a character",
                resources: [
                  "https://www.youtube.com/watch?v=WUXvq6At6pE",
                  "https://www.youtube.com/watch?v=WUXvq6At6pE",
                ],
                description:
                  "Add simple animations to a character in Unreal Engine 5 using the Animation Blueprint system. Implement basic actions such as idle, walking, running, or jumping. Set up state transitions to ensure the animations play smoothly based on player input. This task will help you understand how to create lifelike movement and enhance the character’s presence in the game.\n\nAdd basic animations to a character in Unreal Engine, such as walking, running, and jumping. Use Unreal’s Animation Blueprint system to set up the character's animation states and transitions based on player input.\n\nOnce completed, upload your project to GitHub, including a README file that describes the animations added and how they are triggered within the game.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-characteranimations to earn 300 Karma Points.",
              },
              {
                title: "Set up a skeletal mesh for a character model",
                resources: [
                  "https://www.youtube.com/watch?v=g6BxRs910SA&list=WL&index=23",
                  "https://www.youtube.com/watch?v=FebmlYAJ0Uc&list=WL&index=19",
                  "https://www.youtube.com/watch?v=X4X-_ZdZgew&list=WL&index=20",
                ],
                description:
                  "Set up a skeletal mesh for a character model in Unreal Engine 5. Import the model with its skeleton and rigging, ensuring proper integration for animations and movement. Test the skeletal mesh to verify that it deforms correctly during animations. This task will help you understand the essentials of working with character models and preparing them for animation.\n\nSet up a skeletal mesh for a character model in Unreal Engine. Import your character model with its skeleton and rigging, ensuring that it is properly linked to the skeletal structure for animation. Configure the mesh to work with the animation system and verify that it moves correctly within the engine.\n\nOnce completed, upload your project to GitHub, including a README file that explains the skeletal mesh setup, the tools used for rigging, and any adjustments made in Unreal Engine.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-skeletalmesh to earn 350 Karma Points.",
              },
            ],
          },
          resources: 7,
          proofOfWork: 3,
          rating: 0,
          hasGift: true,
        },
        {
          title: "Physics and Spatial Effects",
          data: {
            description:
              "Games need more than visuals and interactivity—they need to feel real. Physics and special effects bring depth, realism, and excitement to your game world. Unreal Engine’s physics engine simulates gravity, collisions, and forces, enabling believable interactions like breaking walls or shattering objects. Special effects (VFX) enhance this realism, adding visual flair with elements like explosions, rain, fire, and magical spells. Using Unreal’s Niagara particle system, you’ll create dynamic, reactive effects that elevate gameplay. Mastering physics and VFX allows you to craft immersive, impactful experiences, blending realism with creative spectacle to make your game truly unforgettable.",
            whatYouWillLearn: [
              "Physics Simulation: Understand the fundamentals of Unreal Engine’s physics system, including gravity, collisions, forces, and constraints, to create realistic in-game interactions.",
              "Particle System and VFX: Learn to design visual effects using Unreal’s particle systems to simulate natural phenomena like fire, smoke, and water for a more immersive experience.",
              "Niagara Effects System: Master Unreal Engine’s advanced Niagara system to create dynamic, real-time effects that react to gameplay and player interactions.",
              "Integrating Physics with Gameplay: Combine physics simulations and special effects to enhance gameplay mechanics, such as destructible environments and interactive objects, for an engaging player experience.",
            ],
            challenges: [
              {
                title: "Apply Physics to Objects in a Scene",
                resources: [
                  "https://www.youtube.com/watch?v=Klgz8HKcI88&list=WL&index=18&t=289s",
                  "https://www.youtube.com/watch?v=qbgDaRo312k&list=WL&index=26",
                ],
                description:
                  "Apply physics to objects in a scene using Unreal Engine 5. Enable features like gravity, collisions, and physical interactions, allowing objects to respond realistically to forces such as pushes, pulls, or impacts. Test the setup to ensure the objects behave naturally within the environment. This task will introduce you to Unreal’s physics system and enhance the realism of your game. Apply physics to objects in a scene in Unreal Engine. Set up realistic behaviors such as gravity, collision, and forces (e.g., pushing, pulling, and rotating) for different objects. Ensure the objects interact naturally with the environment, responding to player actions or environmental factors.Once completed, upload your project to GitHub, including a README file that explains the physics settings applied and how they affect the objects in the scene. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-physics to earn 200 Karma Points.",
              },
              {
                title: "Create a Particle Effect",
                resources: [
                  "https://www.youtube.com/watch?v=0PZdiosoi68&list=WL&index=17",
                ],
                description:
                  "Create a particle effect in Unreal Engine 5, such as an explosion, smoke, or fire. Use the Niagara particle system to design the effect by adjusting properties like particle size, velocity, color, and lifespan. Experiment with additional modules to enhance realism and visual appeal. This task will help you understand the fundamentals of particle systems and how to add dynamic effects to your game. Create a particle effect using Niagara or other technologies available in Unreal Engine, such as an explosion, smoke, or fire. Use the Niagara system to design and implement the effect, adjusting properties like particle size, velocity, color, and duration to create a realistic and visually appealing result. Once completed, upload your project to GitHub, including a README file that describes the particle effect and how it was created using Niagara in Unreal Engine. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-particleeffect to earn 300 Karma Points.",
              },
              {
                title: "Design a Visual Effect Using Niagara",
                resources: [
                  "https://www.youtube.com/watch?v=pzIORuULNfo&list=WL&index=15",
                ],
                description:
                  "Design a visual effect using the Niagara system in Unreal Engine 5, such as a magical spell, energy burst, or environmental effect like rain or fog. Leverage Niagara’s advanced modules to control particle behavior, colors, and animations. Experiment with features like ribbons, trails, or mesh emitters to create a visually engaging and immersive effect. This task will help you develop skills in creating advanced, custom visual effects for your game. Design a visual effect using Niagara in Unreal Engine, such as a magic spell, energy beam, or environmental effect (e.g., rain or fog). Focus on creating dynamic visuals with a combination of particle systems, forces, and behaviors. You can also incorporate advanced features like mesh particles, ribbons, or trails to enhance the effect. Once completed, upload your project to GitHub, including a README file that describes the visual effect, the techniques used, and how it was created using Niagara. Submit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-niagaravfx to earn 350 Karma Points.",
              },
            ],
          },
          resources: 4,
          proofOfWork: 3,
          rating: 0,
          hasGift: true,
        },
      ],
    },
    {
      level: "Level 6",
      cards: [
        {
          title: "UI/UX Design",
          data: {
            description:
              "A game isn’t just about visuals and mechanics—it’s about crafting an experience that players navigate effortlessly. UI/UX design ensures interfaces are intuitive, functional, and immersive. In this phase, you’ll learn to create game menus, HUDs, and interactive elements using Unreal Engine’s UMG Editor. You’ll focus on designing clear layouts, responsive elements, and accessible features like colorblind-friendly palettes and readable fonts. By understanding player psychology, you’ll create seamless flows and consistent feedback that enhance gameplay. Mastering UI/UX design makes your game polished and enjoyable, turning complex systems into an intuitive, engaging experience for players.",
            whatYouWillLearn: [
              "User Interface (UI) Creation: Learn to design user interfaces using Unreal Engine's UMG Editor, including menus, settings screens, and interactive buttons that enhance player interaction.",
              "HUD and On-Screen Indicators: Explore how to create heads-up displays (HUDs) and in-game indicators for elements like health, ammo, and objectives, providing players with essential real-time information.",
              "Responsive and Accessible Design: Understand the principles of responsive design to ensure interfaces adapt to different screen sizes, while incorporating accessibility features for diverse player needs.",
              "Player Feedback and Interaction: Master techniques for delivering clear feedback through UI animations, sound effects, and visual cues, creating a seamless and engaging player experience.",
            ],

            challenges: [
              {
                title: "Design and implement a basic game menu",
                resources: [
                  "https://www.youtube.com/watch?v=kumZj_mov58&list=WL&index=13",
                  "https://www.youtube.com/watch?v=zWI-36fIoDQ&list=WL&index=14",
                ],
                description:
                  "Design and implement a basic game menu in Unreal Engine 5. Include essential features such as a start button, options menu, and quit functionality. Use the UMG (Unreal Motion Graphics) system to create the menu interface and configure interactions using Blueprints. Ensure smooth navigation between menu screens. This task will introduce you to UI design and functionality within Unreal Engine.\n\nDesign and implement a basic game menu in Unreal Engine, including features like a main menu, start button, options, and quit functionality. Use Blueprints or C++ to create the menu structure and set up interactions, such as transitioning between menus and adjusting simple settings (e.g., volume, graphics quality).\n\nOnce completed, upload your project to GitHub, including a README file that explains the menu layout, the interactions implemented, and the functionality of each button.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-gamemenu to earn 250 Karma Points.",
              },
              {
                title: "Displaying Player Health or Score in the UI",
                resources: [
                  "https://www.youtube.com/watch?v=vO1i9Wcx4Xc&list=WL&index=12",
                  "https://www.youtube.com/watch?v=2YEZpSrdHfk&list=WL&index=11",
                ],
                description:
                  "Implement a system to display player health or score on the screen in Unreal Engine 5. Use UMG (Unreal Motion Graphics) to create UI elements like a health bar or score counter that updates in real-time as the player progresses. Customize the display for clarity and aesthetics. This task will help you understand how to integrate essential gameplay data into the user interface, enhancing player experience.\n\nImplement a system to display the player’s health or score on the screen in Unreal Engine. Use Blueprints or C++ to create a UI element (e.g., a health bar or score counter) that updates in real-time as the player progresses through the game.\n\nOnce completed, upload your project to GitHub, including a README file that explains the implementation of the health or score display, how it updates, and any relevant UI setup.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-playerscore to earn 250 Karma Points.",
              },
            ],
          },
          resources: 4,
          proofOfWork: 2,
          rating: 0,
          hasGift: true,
        },
        {
          title: "Optimization and Debugging",
          data: {
            description:
              "Even the most visually stunning and feature-rich games can falter if they lack smooth performance. Optimization and debugging are crucial phases in game development, ensuring your game runs seamlessly across devices. You’ll learn to fine-tune assets using techniques like Level of Detail (LOD) management, optimize textures and shaders, and leverage Unreal Engine’s profiling tools like Unreal Insights to tackle frame rate drops and memory issues. Debugging focuses on identifying and resolving gameplay disruptions, using tools like the Blueprint Debugger and Breakpoints. By mastering these skills, you’ll polish your game to perfection, creating an experience that’s both visually impressive and technically robust.",
            whatYouWillLearn: [
              "Performance Optimization: Learn to enhance game performance by managing Level of Detail (LOD), optimizing textures, and reducing unnecessary resource usage.",
              "Unreal Insights and Profiling: Use Unreal Engine's profiling tools like Unreal Insights to monitor performance metrics, identify bottlenecks, and improve frame rates and memory efficiency.",
              "Debugging Tools: Master the Blueprint Debugger, Breakpoints, and Logs to identify and fix gameplay errors, ensuring a seamless player experience.",
              "Asset and Shader Optimization: Understand techniques to streamline assets and shaders for efficient rendering, reducing load times and improving overall performance.",
            ],
            challenges: [
              {
                title: "Optimize assets and scripts for better performance",
                resources: [
                  "https://www.youtube.com/watch?v=fUxZxQwL3W4&list=WL&index=10",
                  "https://www.youtube.com/watch?v=lfjG3z5VVIw&list=WL&index=9",
                  "https://www.youtube.com/watch?v=u3jlkKlzPiQ&list=WL&index=8",
                ],
                description:
                  "Optimize assets (such as textures, models, and sounds) and scripts in Unreal Engine 5 to improve game performance. Simplify meshes, reduce texture sizes, and optimize code to ensure smooth gameplay. Use Unreal's profiling tools to identify and address performance bottlenecks. This task will help you understand how to maintain high performance while ensuring visual and gameplay quality.\n\nOptimize game assets (textures, models, audio, etc.) and scripts in Unreal Engine to improve performance. Focus on reducing file sizes, simplifying meshes, and improving texture compression. For scripts, optimize code for efficiency, reduce unnecessary calculations, and ensure smooth execution.\n\nOnce completed, upload your project to GitHub, including a README file that describes the optimization techniques applied and the improvements in performance.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-optimization to earn 300 Karma Points.",
              },
              {
                title: "Use debugging tools to identify and fix issues",
                resources: [
                  "https://www.youtube.com/watch?v=XC_ntVpHg80&list=WL&index=7",
                  "https://www.youtube.com/watch?v=lflqdan_isw&list=WL&index=6",
                ],
                description:
                  "Use Unreal Engine’s debugging tools (such as the Blueprint Debugger, Visual Studio Debugger, and Profiler) to identify and resolve issues in your game project. Focus on solving common problems like performance drops, gameplay bugs, or logic errors. Document the issues you encounter and the steps you take to fix them. This task will enhance your troubleshooting skills and help ensure a smoother game development process.\n\nUse Unreal Engine’s debugging tools (such as the Blueprint Debugger, Visual Studio Debugger, and Profiler) to identify and fix issues within your game project. Focus on solving common problems like performance bottlenecks, gameplay bugs, or errors in logic. Document the issues you encountered and how you resolved them.\n\nOnce completed, upload your project to GitHub, including a README file that explains the debugging process, the tools used, and the fixes applied.\n\nSubmit the GitHub repository link in the #Game-Dev channel using the hashtag #cl-game-dev-debugging to earn 250 Karma Points.",
              },
            ],
          },
          resources: 5,
          proofOfWork: 2,
          rating: 0,
          hasGift: true,
        },
        {
          title: "Publishing and Testing",
          data: {
            description:
              "The final phases of game development—**Testing and Publishing**—are where your creation is polished and prepared for players. Testing ensures your game is stable, engaging, and performs flawlessly across platforms through rigorous playtesting, stress tests, and debugging. Tools like Unreal Engine’s Session Frontend and Automated Testing Frameworks help refine every detail. Publishing focuses on packaging and distributing your game, optimizing files, meeting platform-specific requirements, and crafting a compelling marketing strategy with trailers, visuals, and outreach to gaming communities. Together, these steps ensure your game not only reaches its audience but also delivers an unforgettable, polished experience.",
            whatYouWillLearn: [
              "Testing and Quality Assurance: Conduct comprehensive playtesting and stress tests to identify bugs, improve gameplay balance, and ensure a stable experience for players.",
              "Packaging and Deployment: Learn to package your game for distribution, optimizing files and ensuring compatibility with platform-specific requirements like consoles, PCs, and mobile devices.",
              "Publishing on Platforms: Master the process of submitting your game to platforms such as Steam, Epic Games Store, or mobile app stores, meeting their technical and compliance standards.",
              "Marketing and Launch Strategies: Develop compelling trailers, promotional materials, and community engagement plans to build excitement and attract players to your game.",
            ],
            challenges: [
              {
                title: "Conduct playtesting and gather feedback",
                resources: [
                  "https://www.youtube.com/watch?v=YY7XWz_q-qo&list=WL&index=5",
                ],
                description:
                  "Conduct playtesting of your game with a group of players and gather their feedback on aspects like gameplay mechanics, difficulty, and user experience. Analyze the feedback and make adjustments to improve the overall game. This task will help you understand how player feedback can refine your design and enhance the player experience.\n\nConduct playtesting for your game project, either with a small group of peers or through an online community. Gather valuable feedback on gameplay mechanics, difficulty, and overall experience. Make adjustments based on the feedback received to improve the game.\n\nProof of Work Submission Options:\n\nPlaytesting Video: Record a video of the playtesting session, showing feedback from players, and include any changes made based on their input.\n\nSubmission Medium: YouTube (unlisted link), Google Drive, or any video hosting platform.\n\nFeedback Summary Report: Collect feedback in the form of a report or a Google Form. Include the main points raised by testers, and outline any changes you made in response to the feedback.\n\nSubmission Medium: Google Doc or PDF.\n\nSurvey Results: If you used an online survey (e.g., Google Forms) to collect feedback, submit the survey link with an explanation of how the feedback influenced changes in your project.\n\nSubmission Medium: Google Forms link.\n\nOnce completed, submit the chosen/preferred proof of work in the #Game-Dev channel using the hashtag #cl-game-dev-playtesting to earn 250 Karma Points.",
              },
              {
                title: "Package the game for PC and test the build",
                resources: [
                  "https://www.youtube.com/watch?v=O2PKihXmejw&list=WL&index=4",
                  "https://www.youtube.com/watch?v=emOsoyHSmAE&list=WL&index=3",
                  "https://www.youtube.com/watch?v=JOMrVMwGBso&list=WL&index=2",
                ],
                description:
                  "Package your game for PC using Unreal Engine 5’s packaging tools. Ensure that all assets are included and the game runs smoothly on a standard PC setup. Test the build for performance, functionality, and potential bugs. This task will help you prepare the game for distribution while ensuring it’s optimized for the PC platform.\n\nPackage your game for PC using Unreal Engine’s packaging tools. Ensure that the build is optimized and runs smoothly on a standard PC. Test the packaged game on your machine to ensure there are no critical issues such as crashes, performance drops, or missing assets.\n\nPlayable Build Link: Upload the packaged game to a file hosting platform like Google Drive, Dropbox, or Itch.io. Share the link to the playable build and include a description of any issues you encountered and resolved.\n\nSubmission Medium: Google Drive, Dropbox, or Itch.io link.\n\nOnce completed, submit the link in the #Game-Dev channel using the hashtag #cl-game-dev-pcbuild to earn 300 Karma Points.",
              },
              {
                title: "Prepare the game for submission to a digital platform",
                resources: [
                  "https://www.youtube.com/watch?v=KQkG2KElVxo&list=WL&index=1",
                ],
                description:
                  "Prepare your game for submission to a digital platform like Steam, Itch.io, or Epic Games Store. This includes creating necessary metadata (e.g., descriptions, screenshots, system requirements), packaging the final build, and ensuring your game complies with platform guidelines. This task will help you understand the submission process and ensure your game is ready for distribution on digital platforms.\n\nPrepare your game for submission to a digital platform (such as Steam, Itch.io, or Epic Games Store). This involves finalizing the game’s assets, creating platform-specific metadata (e.g., descriptions, screenshots, system requirements), ensuring the game complies with platform guidelines, and testing the submission process.\n\nProof of Work Submission Options:\n\nSubmission Documentation: Provide a detailed document outlining the steps you took to prepare the game for submission, including metadata creation, asset preparation, and platform compliance.\n\nSubmission Medium: Google Doc or PDF.\n\nSubmission Confirmation: If possible, submit a screenshot or confirmation of your submission to the platform (e.g., Steamworks, Itch.io developer dashboard).\n\nSubmission Medium: Screenshot or link to submission confirmation.\n\nPlatform Page Link: If the game is live on a platform (like Itch.io or Steam), provide the link to the game page along with a brief description of the submission process.\n\nSubmission Medium: Link to the game page on the platform.\n\nOnce completed, submit the chosen/preferred proof of work in the #Game-Dev channel using the hashtag #cl-game-dev-submission to earn 300 Karma Points.",
              },
            ],
          },
          resources: 5,
          proofOfWork: 3,
          rating: 0,
          hasGift: true,
        },
        {
          title: "Portfolio and Community Engagement",
          data: {
            description: "Your journey as a game developer extends beyond creating games—it involves showcasing your work and engaging with a community of like-minded individuals. Portfolio Creation is essential to highlight your best work, including interactive demos, 3D environments, and mechanics. An interactive 3D portfolio using platforms like Unreal Engine or Three.js offers an immersive experience. Community Engagement, through platforms like Discord, Reddit, and Unreal Engine forums, is crucial for collaboration, learning, and networking. Participating in game jams, hackathons, and maintaining a professional presence on LinkedIn and ArtStation further enhances your career opportunities. Engaging with the community by mentoring, collaborating on open-source projects, and contributing to the ecosystem will establish your reputation as a skilled, approachable developer. By focusing on Portfolio and Community Engagement, you’ll open doors to professional opportunities and become an active contributor to the game development world.",
            whatYouWillLearn: ["Portfolio Development", "Community Engagement"],

            challenges: [
              {
                title: "Create a portfolio showcasing your projects",
                resources: [],
                description:
                  "Create a portfolio to showcase your game development projects. Include project descriptions, images, videos, or playable builds to highlight your skills and accomplishments. The portfolio can be a personal website, PDF, or a digital presentation. This task will help you organize and present your work in a professional way, making it easier to share with potential employers or collaborators.\n\nCreate a professional portfolio that showcases your game development projects. Include detailed descriptions, images, videos, and playable builds to highlight your work. The portfolio can be a personal website, PDF, or digital presentation that clearly communicates your skills and achievements.\n\nOnce completed, create a link to your portfolio and provide it for review.\n\nSubmit the link to your portfolio in the #Game-Dev channel using the hashtag #cl-game-dev-portfolio to earn 250 Karma Points.",
              },
              {
                title: "Share your work and connect with other developers",
                resources: [],
                description:
                  "Share your game development projects with the community by posting on platforms like GitHub, LinkedIn, or Twitter. Engage with other developers to receive feedback, share ideas, and expand your network. This task will help you build a professional presence and connect with like-minded individuals in the game development community.\n\nShare your game development work and connect with other developers through platforms such as GitHub, LinkedIn, or Twitter. Post a summary of your latest project, including images, videos, or playable builds, and engage with the community to receive feedback, share ideas, and expand your network.\n\nOnce completed, create a link to your post or profile and provide it for review.\n\nSubmit the link in the #Game-Dev channel using the hashtag #cl-game-dev-connect to earn 200 Karma Points.",
              },
            ],
          },
          resources: 0,
          proofOfWork: 2,
          rating: 0,
          hasGift: true,
        },
      ],
    },
  ],

  communityPartners: [
    {
      name: "TILTLABS",
      image: "/assets/IG/Game Development/Community Partners/Tiltlabs.png",
    },
    {
      name: "Banzan Studios",
      image: "/assets/IG/Game Development/Community Partners/Banzan.jpg",
    },
    {
      name: "Norian Games",
      image: "/assets/IG/Game Development/Community Partners/Norian.png",
    },
    {
      name: "AKEF",
      image: "/assets/IG/Game Development/Community Partners/AKEF.png",
    },
    {
      name: "AnimationXpress",
      image:
        "/assets/IG/Game Development/Community Partners/AnimationXpress.jpeg",
    },
  ],
  prerequisites: [
    "Basic computer skills, such as installing software and managing files or folders.",
    "Familiarity with programming concepts, including variables, loops, and functions.",
    "Knowledge of C++ is a plus but not mandatory.",
    "Basic understanding of 3D math, such as vectors and transformations, for working with 3D objects.",
    "Awareness of fundamental game design principles, including level layout and gameplay mechanics.",
  ],
  learningPath: {
    embedUrl: "https://roadmap.sh/r/unreal-engine-5-game-developer-19rqf",
  },
  mentors: [
    {
      name: "Nikhil Chandran",
      role: "Founder & CEO @ TILTLABS",
      linkedin: "https://www.linkedin.com/in/nikhil-tiltlabs/",
      imageUrl: "/assets/IG/Game Development/Mentors/Nikhil Chandran.png",
    },
    {
      name: "Mukesh Dev",
      role: "Founder & CEO-Banzan Studios",
      linkedin: "https://www.linkedin.com/in/mukeshdev/",
      imageUrl: "/assets/IG/Game Development/Mentors/Mukesh Dev.png",
    },
    {
      name: "Jobin Joseph",
      role: "Co founder and CFO @ Norian Games",
      linkedin: "https://www.linkedin.com/in/jobin-joseph-8b0aa4265/",
      imageUrl: "/assets/IG/Game Development/Mentors/Jobin.png",
    },
  ],
  interestGroupLeads: {
    description:
      "Interest group leads manage the activities and events within interest groups and serve as a point of contact for students interested in getting involved. Students can connect with these leads to learn about opportunities within their interests",
    leads: [
      {
        name: "Sabal Krishna S",
        institution:
          "St.Thomas Institute of Science and Technology, Trivandrum",
        linkedin: "https://www.linkedin.com/in/sabal-krishna-s-29b758298/",
        imageUrl: "/assets/IG/Game Development/IG Lead/image.jpg",
      },
    ],
  },
  opportunities: [
    {
      title: "Game Designer",
      description:
        "Shape the rules, mechanics, and storytelling for engaging gameplay.",
    },
    {
      title: "Game Programmer",
      description: "Code and optimize game mechanics, physics, and AI.",
    },
    {
      title: "3D Artist",
      description: "Design characters, environments, and props.",
    },
    {
      title: "Animator",
      description:
        "Create realistic or stylized movements for characters and objects.",
    },
    {
      title: "Level Designer",
      description: "Build engaging and balanced game levels.",
    },
    {
      title: "Sound Designer",
      description: "Develop immersive sound effects and music.",
    },
    {
      title: "UI/UX Designer",
      description:
        "Design user-friendly interfaces and enhance player experience.",
    },
    {
      title: "Quality Assurance Tester",
      description:
        "Ensure the game runs smoothly by identifying and reporting bugs.",
    },
    {
      title: "Narrative Designer",
      description: "Develop compelling stories, dialogues, and in-game lore.",
    },
  ],
  peopleToFollow: [
    {
      name: "Hideo Kojima",
      link: "https://twitter.com/HIDEO_KOJIMA_EN",
    },
    {
      name: "John Carmack",
      link: "https://x.com/ID_AA_Carmack",
    },
    {
      name: "Rami Ismail",
      link: "https://x.com/tha_rami",
    },
    {
      name: "Cory Barlog",
      link: "https://x.com/corybarlog",
    },
  ],
  blogsToFollow: [
    {
      name: "Next Level Plugins",
      link: "https://nextlevelplugins.com/blog//2024/11/Level-Up-Your-Unreal-Engine-Game-Essential-Blogs-for-Developers.html",
    },
    {
      name: "Game Developer",
      link: "https://www.gamedeveloper.com/design/the-art-of-game-balance-evolution",
    },
    {
      name: "Game Dev Candids",
      link: "https://gamedevcandids.com/how-to-find-your-games-north-star/",
    },
  ],
  topKeywords: [
    "Game Engines",
    "Level Design",
    "Scripting",
    "3D Modeling",
    "AI for Games",
    "Game Physics",
    "UI/UX for Games",
    "Multiplayer Systems",
  ],
};
