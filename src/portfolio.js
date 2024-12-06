/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: false, // Change this to false if you don't want Splash screen.
};

// const splashScreen = {
//   enabled: true, // set false to disable splash screen
//   animation: splashAnimation,
//   duration: 2000 // Set animation duration as per your animation
// };

//SEO Related settings
const seo = {
  title: "Serena's Portfolio",
  description:
    "A passionate Computer Scientist 🚀 having an experience machine learning, systems, and algorithms in internship and research positions.",
  og: {
    title: "Serena Pei's Portfolio",
    type: "website",
    url: "https://spei04.github.io/",
  },
};

//Home Page
const greeting = {
  title: "Serena Pei",
  logo_name: "spei04",
  nickname: "serena",
  subTitle:
    "A passionate Computer Scientist 🚀 having an experience machine learning, systems, and algorithms in internship and research positions.",
  resumeLink:
    "https://docs.google.com/document/d/1oGIOKSkarpXCzJZTpMqSVjxzjzXVvCVtgq78K5Oanxo/edit?usp=sharing",
};

const socialMediaLinks = [
  /* Your Social Media Link */
  // github: "https://github.com/ashutosh1919",
  // linkedin: "https://www.linkedin.com/in/ashutosh-hathidara-88710b138/",
  // gmail: "ashutoshhathidara98@gmail.com",
  // gitlab: "https://gitlab.com/ashutoshhathidara98",
  // facebook: "https://www.facebook.com/laymanbrother.19/",
  // twitter: "https://twitter.com/ashutosh_1919",
  // instagram: "https://www.instagram.com/layman_brother/"

  {
    name: "Github",
    link: "https://github.com/spei04",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/serena-pei-80ab21215/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  {
    name: "Gmail",
    link: "mailto:serenapei123@gmail.com",
    fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
    backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/serenaaa.04/",
    fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#E4405F", // Reference https://simpleicons.org/?q=instagram
  },
];

const skills = {
  data: [
    {
      title: "Data Analysis, AI, & Systems",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Applying machine learning to diverse fields in research and industrial settings",
        "⚡ Backend development experience in building and deploying applications",
        "⚡ Solid programming skills in Python, Java, Javascript, SQL, and more!",
      ],
      softwareSkills: [
        {
          skillName: "Java",
          fontAwesomeClassname: "simple-icons:java",
          style: {
            backgroundColor: "white",
            color: "#D00000",
          },
        },
        {
          skillName: "PyTorch",
          fontAwesomeClassname: "logos-pytorch",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Python",
          fontAwesomeClassname: "ion-logo-python",
          style: {
            backgroundColor: "transparent",
            color: "#3776AB",
          },
        },
        {
          skillName: "Deeplearning",
          imageSrc: "deeplearning_ai_logo.png",
        },
      ],
    },
    {
      title: "Full Stack Development",
      fileName: "FullStackImg",
      skills: ["⚡ Creating application backend in Node & Express"],
      softwareSkills: [
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "Sass",
          fontAwesomeClassname: "simple-icons:sass",
          style: {
            color: "#CC6699",
          },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            backgroundColor: "#000000",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "NodeJS",
          fontAwesomeClassname: "devicon-plain:nodejs-wordmark",
          style: {
            color: "#339933",
          },
        },
        {
          skillName: "NPM",
          fontAwesomeClassname: "simple-icons:npm",
          style: {
            color: "#CB3837",
          },
        },
        {
          skillName: "Yarn",
          fontAwesomeClassname: "simple-icons:yarn",
          style: {
            color: "#2C8EBB",
          },
        },
      ],
    },
    {
      title: "Cloud Infra-Architecture",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Experience working on cloud platforms",
        "⚡ Deploying deep learning models on cloud to use on mobile devices",
      ],
      softwareSkills: [
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: {
            color: "#336791",
          },
        },
        {
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongodb",
          style: {
            color: "#47A248",
          },
        },
      ],
    },
    {
      title: "Low Level Programming",
      skills: [
        "⚡ Using C to program low level operating system system calls",
        "⚡ Implementing file systems, page tables, superpages, copy-on-write, etc.",
      ],
      softwareSkills: [
        {
          skillName: "C",
          style: {
            color: "#FF2BC2",
          },
        },
        {
          skillName: "Assembly",
          style: {
            color: "#FF2BC2",
          },
        },
        {
          skillName: "Linux",
          style: {
            color: "#FF2BC2",
          },
        },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    {
      siteName: "LeetCode",
      iconifyClassname: "simple-icons:leetcode",
      style: {
        color: "#F79F1B",
      },
      profileLink: "https://leetcode.com/layman_brother/",
    },
    {
      siteName: "HackerRank",
      iconifyClassname: "simple-icons:hackerrank",
      style: {
        color: "#2EC866",
      },
      profileLink: "https://www.hackerrank.com/layman_brother",
    },
    {
      siteName: "Codechef",
      iconifyClassname: "simple-icons:codechef",
      style: {
        color: "#5B4638",
      },
      profileLink: "https://www.codechef.com/users/ashutosh_1919",
    },
    {
      siteName: "Codeforces",
      iconifyClassname: "simple-icons:codeforces",
      style: {
        color: "#1F8ACB",
      },
      profileLink: "http://codeforces.com/profile/layman_brother",
    },
    {
      siteName: "Hackerearth",
      iconifyClassname: "simple-icons:hackerearth",
      style: {
        color: "#323754",
      },
      profileLink: "https://www.hackerearth.com/@ashutosh391",
    },
    {
      siteName: "Kaggle",
      iconifyClassname: "simple-icons:kaggle",
      style: {
        color: "#20BEFF",
      },
      profileLink: "https://www.kaggle.com/laymanbrother",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "Massachusetts Institute of Technology",
      subtitle: "Bachelor of Science in Computer Science and Engineering",
      // logo_path: "iiitk_logo.png",
      // alt_name: "IIITDM Kurnool",
      duration: "September 2022 - May 2026",
      descriptions: [
        "⚡ Gordon-MIT Engineering Leadership Program (GEL) student",
        "⚡ Chinese minor",
        "⚡ Eta Kappa Nu (HKN) honors (top performing student in class)",
      ],
      website_link: "http://iiitk.ac.in",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "Machine Learning",
      subtitle: "- Andrew Ng",
      logo_path: "stanford_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/verify/22MTSSC5WDTM",
      alt_name: "Stanford University",
      color_code: "#8C151599",
    },
    {
      title: "Deep Learning",
      subtitle: "- Andrew Ng",
      logo_path: "deeplearning_ai_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/specialization/H8CPSFXAJD2G",
      alt_name: "deeplearning.ai",
      color_code: "#00000099",
    },
    {
      title: "ML on GCP",
      subtitle: "- GCP Training",
      logo_path: "google_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/specialization/EB4VJARK8647",
      alt_name: "Google",
      color_code: "#0C9D5899",
    },
    {
      title: "Data Science",
      subtitle: "- Alex Aklson",
      logo_path: "ibm_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/specialization/PLEAPCSJBZT5",
      alt_name: "IBM",
      color_code: "#1F70C199",
    },
    {
      title: "Big Data",
      subtitle: "- Kim Akers",
      logo_path: "microsoft_logo.png",
      certificate_link:
        "https://drive.google.com/file/d/164zKCFOsI4vGqokc-Qj-e_D00kLDHIrG/view",
      alt_name: "Microsoft",
      color_code: "#D83B0199",
    },
    {
      title: "Advanced Data Science",
      subtitle: "- Romeo Kienzler",
      logo_path: "ibm_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/verify/BH2T9BRU87BH",
      alt_name: "IBM",
      color_code: "#1F70C199",
    },
    {
      title: "Advanced ML on GCP",
      subtitle: "- GCP Training",
      logo_path: "google_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/verify/5JZZM7TNQ2AV",
      alt_name: "Google",
      color_code: "#0C9D5899",
    },
    {
      title: "DL on Tensorflow",
      subtitle: "- Laurence Moroney",
      logo_path: "deeplearning_ai_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/verify/6T4DCUGNK8J8",
      alt_name: "deeplearning.ai",
      color_code: "#00000099",
    },
    {
      title: "Fullstack Development",
      subtitle: "- Jogesh Muppala",
      logo_path: "coursera_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/NRANJA66Y2YA",
      alt_name: "Coursera",
      color_code: "#2A73CC",
    },
    {
      title: "Kuberenetes on GCP",
      subtitle: "- Qwiklabs",
      logo_path: "gcp_logo.png",
      certificate_link:
        "https://google.qwiklabs.com/public_profiles/e4d5a92b-faf6-4679-a70b-a9047c0cd750",
      alt_name: "GCP",
      color_code: "#4285F499",
    },
    {
      title: "Cryptography",
      subtitle: "- Saurabh Mukhopadhyay",
      logo_path: "nptel_logo.png",
      certificate_link:
        "https://drive.google.com/open?id=1z5ExD_QJVdU0slLkp8CBqSF3-C3g-ro_",
      alt_name: "NPTEL",
      color_code: "#FFBB0099",
    },
    {
      title: "Cloud Architecture",
      subtitle: "- Qwiklabs",
      logo_path: "gcp_logo.png",
      certificate_link:
        "https://google.qwiklabs.com/public_profiles/5fab4b2d-be6f-408c-8dcb-6d3b58ecb4a2",
      alt_name: "GCP",
      color_code: "#4285F499",
    },
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work, Internship and Volunteership",
  description: "Software engineering and Machine Learning research positions",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "Software Developer Intern (Machine Learning)",
          company: "Amazon",
          company_url: "https://www.tiktok.com/en/",
          // logo_path: "tiktok_logo.png",
          duration: "May 2025 – Aug 2025",
          location: "Seattle, WA, USA",
          description: "",
          color: "#000000",
        },
        {
          title: "Research Intern",
          company: "Agency for Science, Technology, and Research",
          company_url: "https://legatohealthtech.com/",
          // logo_path: "legato_logo.png",
          duration: "May 2024 - Aug 2024",
          location: "Singapore",
          // description:
          //  "Implemented unsupervised model for feature extraction and tissue clustering for histomorphology in H&E stained tissue images from liver cancer patients (5000+ lines of Python code for model training and evaluation, and data visualization), Conducted literature reviews for SOTA deep learning models, clustering methods, and self-supervised encoders"
          //   "Tested libraries and optimized code for opening large whole slide images for downstream biomedical data analysis"
          //   "Overlaid predicted cluster masks on original tissue images to analyze and document accuracy"
          description: [
            "Implemented unsupervised model for feature extraction and tissue clustering for histomorphology in H&E stained tissue images from liver cancer patients (5000+ lines of Python code for model training and evaluation, and data visualization)",
            "Conducted literature reviews for SOTA deep learning models, clustering methods, and self-supervised encoders",
            "Tested libraries and optimized code for opening large whole slide images for downstream biomedical data analysis",
            "Overlaid predicted cluster masks on original tissue images to analyze and document accuracy",
          ],
          color: "#0879bf",
        },
        {
          title: "Research Assistant",
          company:
            "MIT Computer Science and Artificial Intelligence Laboratory",
          company_url: "https://www.linkedin.com/company/muffito-inc/about/",
          // logo_path: "muffito_logo.png",
          duration: "Mar 2024 - present",
          location: "Cambridge, MA",
          description: [
            "Studied the economics of labor automation by AI and finding functional form of computer vision fine tuning scaling law",
            "Wrote Python code to run scaling law experiments, visualize data, and analyze inconsistencies with survey data",
            "Cleaned 100+ MB of data from LLM outputs to study automation vs. augmentation and scaling law for prompt engineering",
            "Conducted literature reviews on 30+ scholarly articles on information theory, LLM benchmarks, and economics of AI",
          ],
          color: "#9b1578",
        },
        {
          title: "Research Assistant",
          company: "MIT Media Lab",
          company_url: "https://www.linkedin.com/company/muffito-inc/about/",
          // logo_path: "muffito_logo.png",
          duration: "Feb 2024 - present",
          location: "Cambridge, MA",
          descBullets: [
            "Co-author of paper accepted to 2024 IEEE 20th International Conference on Body Sensor Networks (BSN)",
            "Led 20+ hours of studies for AttentivU, a pair of glasses created in MIT Media Lab that uses Electroencephalography (EEG) and Electrooculography (EOG) signals to track eye movement and brain activity",
            "Author of paper on analyzing surface electromyography signals of minimally verbal adults with autism spectrum disorder",
            "Pre-processed EEG/EOG signal data and trained machine learning models to predict labels (700+ lines of Python)",
          ],
          color: "#fc1f20",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "AI EarthHack Finalist",
  description: [
    "Certificate: https://docs.google.com/document/d/1PqnWxnh1RKS2BQ6UDC3h4XKnt_LqtKPnBS0IuyopL-8/edit?usp=sharing",
    "Finalist and best pitch award (top 3 out of over 150 teams) for Streamlit application for AI business evaluation.",
  ],
  // avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  title: "Machine Learning paper",
  description: [
    "https://jhss.scholasticahq.com/article/25164",
    "Published paper on the Scholastica Journal of High School Science, titled on An Empirical Analysis of Machine Learning Based Emotion Recognition",
  ],
};

const publications = {
  data: [
    {
      // id: "neuro-symbolic-sudoku-solver",
      name:
        "An Empirical Analysis of Machine Learning Based Emotion Recognition",
      // createdAt: "2023-07-02T00:00:00Z",
      description: "Paper published in April 2022",
      url: "https://jhss.scholasticahq.com/article/25164",
    },
    {
      id: "mdp-diffusion",
      name: "MDP-Diffusion",
      createdAt: "2023-09-19T00:00:00Z",
      description: "Blog published in Paperspace",
      url: "https://blog.paperspace.com/mdp-diffusion/",
    },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "animated_ashutosh.png",
    description:
      "I am available on almost every social media. You can message me, I will reply within 24 hours.",
  },
  // blogSection: {
  //   title: "Blogs",
  //   subtitle:
  //     "I like to document some of my experiences in professional career journey as well as some technical knowledge sharing.",
  //   link: "https://blogs.ashutoshhathidara.com/",
  //   avatar_image_path: "blogs_image.svg",
  // },
  addressSection: {
    title: "Address",
    subtitle: "San Jose, CA, USA 95138",
    locality: "San Jose",
    country: "USA",
    region: "California",
    postalCode: "95129",
    // streetAddress: "Saratoga Avenue",
    avatar_image_path: "address_image.svg",
    // location_map_link: "https://maps.app.goo.gl/NvYZqa34Wye4tpS17",
  },
  phoneSection: {
    title: "4087082258",
    subtitle: "",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  projectsHeader,
  publicationsHeader,
  publications,
  contactPageData,
};

// export {
//   settings,
//   seo,
//   greeting,
//   socialMediaLinks,
//   skills,
//   degrees,
//   experience,
//   publications,
//   contactPageData,
// };
