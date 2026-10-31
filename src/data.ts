import virtualityPreview from "./assets/virtuality-preview.png";
import oracleCertificate from "./assets/oracle-java-fundamentals.png";
import sapCertificate from "./assets/sap-global-bike-participation.png";
import divingResortPreview from "./assets/diving-resort-preview.png";

export const profile = {
  name: "Philip Miguel",
  role: "Web Developer",
  location: "Oriental Mindoro, Philippines",
  email: "philipmiguel246@gmail.com",
  linkedin: "https://www.linkedin.com/in/philip-nyson-miguel-9127a22ab/",
  github: "https://github.com/Philip13-Nys",
  intro:
    "Web Developer with an interest in gaming and technology. I’m building thoughtful digital experiences and growing my skills through hands-on work.",
  about:
    "I’m Philip Miguel, a Web Developer interested in technology and gaming. I’m building my web development skills and exploring how design and code can make digital experiences more useful.",
  availability: "[Availability status]",
};

export const education = [
  {
    school: "[School or University]",
    program: "[Degree, course, or program]",
    period: "[Year started] — [Expected graduation]",
    note: "[Optional focus area or relevant coursework]",
  },
];

export const skills = [
  {
    category: "DESIGN",
    items: ["[UI / UX design]", "[Wireframing]", "[Figma]"],
  },
  {
    category: "DEVELOPMENT",
    items: ["[HTML & CSS]", "[JavaScript]", "[React]"],
  },
  {
    category: "TOOLKIT",
    items: ["[Git & GitHub]", "[Your tools]", "[Your next skill]"],
  },
];

export const projects = [
  {
    number: "01",
    title: "Virtuality",
    type: "Internship discovery website",
    description:
      "A website designed to help people find internships with ease.",
    tags: ["Web app", "[Add technologies]"],
    href: "https://philip13-nys.github.io/Virtuality_website/",
    art: "peach",
    image: virtualityPreview,
  },
  {
    number: "02",
    title: "Sabang Beach and Diving Resort",
    type: "Resort booking website",
    description:
      "Online Booking System for Diving Resort with Customer AI-Assistance, designed to provide customers with a convenient and efficient way tomake reservations and access resort services online",
    tags: ["Resort booking", "[Add technologies]"],
    href: "https://diving-resort.web.app/",
    art: "lavender",
    image: divingResortPreview,
  },
  {
    number: "03",
    title: "[Project name]",
    type: "[Game · Creative coding · Open source]",
    description:
      "[A small idea, a useful tool, or a playful experiment — tell the story behind it here.]",
    tags: ["[Tool]", "[Topic]"],
    href: "#contact",
    art: "mint",
  },
];

export const experience = [
  {
    role: "[Role or activity]",
    organization: "[Organization, club, or personal project]",
    period: "[Dates]",
    detail: "[Briefly describe your responsibilities and contribution.]",
  },
];

export const certifications = [
  {
    title: "Java Fundamentals",
    issuer: "Oracle Academy",
    year: "2024",
    image: oracleCertificate,
  },
  {
    title: "S/4HANA Global Bike modules (SD, MM, PP, FI, CO)",
    issuer: "SAP University Alliances · STI College, Philippines",
    year: "2025",
    image: sapCertificate,
  },
];
