import bcrypt from "bcrypt";
import getUserModel from "@/models/user";
import getProjectModel from "@/models/projects";
import getPollModel from "@/models/poll";

// Demo users with authentic names and roles
const demoUsers = [
    {
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        password: "TestPass123!", // Will be hashed
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        title: "Full Stack Developer",
        bio: "Passionate about building scalable web applications. Love working with React and Node.js. Open source contributor.",
        role: "student",
        socialLinks: {
            github: "https://github.com/priyasharma",
            linkedin: "https://linkedin.com/in/priyasharma",
            website: "https://priyasharma.dev",
        },
        stats: {
            projects: 5,
            polls: 3,
            achievements: 8,
        },
    },
    {
        name: "Rajesh Patel",
        email: "rajesh.patel@example.com",
        password: "TestPass123!",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
        title: "Backend Engineer",
        bio: "Specialized in microservices and cloud architecture. DevOps enthusiast. Always learning new technologies.",
        role: "student",
        socialLinks: {
            github: "https://github.com/rajeshpatel",
            linkedin: "https://linkedin.com/in/rajeshpatel",
            website: "https://rajeshpatel.dev",
        },
        stats: {
            projects: 8,
            polls: 5,
            achievements: 12,
        },
    },
    {
        name: "Ananya Verma",
        email: "ananya.verma@example.com",
        password: "TestPass123!",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
        title: "Frontend Specialist",
        bio: "Creating beautiful and responsive user interfaces. UX/UI enthusiast. CSS expert.",
        role: "student",
        socialLinks: {
            github: "https://github.com/ananyaverma",
            linkedin: "https://linkedin.com/in/ananyaverma",
            website: "https://ananyaverma.dev",
        },
        stats: {
            projects: 6,
            polls: 4,
            achievements: 10,
        },
    },
    {
        name: "Admin User",
        email: "admin@example.com",
        password: "AdminPass123!",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
        title: "Platform Administrator",
        bio: "Managing the community and ensuring quality contributions.",
        role: "admin",
        socialLinks: {
            github: "https://github.com/admin",
            linkedin: "https://linkedin.com/in/admin",
            website: "https://admin.example.com",
        },
        stats: {
            projects: 3,
            polls: 10,
            achievements: 15,
        },
    },
    {
        name: "Vikram Kumar",
        email: "vikram.kumar@example.com",
        password: "TestPass123!",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
        title: "Data Scientist",
        bio: "Passionate about machine learning and data analysis. Python expert.",
        role: "student",
        socialLinks: {
            github: "https://github.com/vikramkumar",
            linkedin: "https://linkedin.com/in/vikramkumar",
            website: "https://vikramkumar.dev",
        },
        stats: {
            projects: 4,
            polls: 2,
            achievements: 6,
        },
    },
];

// Demo projects
const demoProjects = [
    {
        owner: "Priya Sharma",
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include product catalog, shopping cart, and payment integration.",
        githubRepoLink: "https://github.com/priyasharma/ecommerce-platform",
        liveOnLink: "https://ecommerce-platform-demo.vercel.app",
        youtubeDemoLink: "https://youtube.com/watch?v=demo1",
    },
    {
        owner: "Priya Sharma",
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates. Built with Next.js, TypeScript, and Firebase.",
        githubRepoLink: "https://github.com/priyasharma/task-manager",
        liveOnLink: "https://task-manager-demo.vercel.app",
        youtubeDemoLink: "https://youtube.com/watch?v=demo2",
    },
    {
        owner: "Rajesh Patel",
        title: "Microservices Architecture",
        description: "Production-ready microservices architecture with Docker, Kubernetes, and message queues. Includes monitoring and logging.",
        githubRepoLink: "https://github.com/rajeshpatel/microservices",
        liveOnLink: "https://microservices-demo.example.com",
        youtubeDemoLink: "https://youtube.com/watch?v=demo3",
    },
    {
        owner: "Rajesh Patel",
        title: "API Gateway Service",
        description: "High-performance API gateway with rate limiting, authentication, and request routing. Built with Express and Redis.",
        githubRepoLink: "https://github.com/rajeshpatel/api-gateway",
        liveOnLink: "https://api-gateway-demo.example.com",
    },
    {
        owner: "Ananya Verma",
        title: "Design System UI Components",
        description: "Comprehensive design system with reusable UI components. Built with React, Storybook, and styled-components.",
        githubRepoLink: "https://github.com/ananyaverma/design-system",
        liveOnLink: "https://design-system-demo.vercel.app",
        youtubeDemoLink: "https://youtube.com/watch?v=demo4",
    },
    {
        owner: "Ananya Verma",
        title: "Personal Portfolio Website",
        description: "Modern portfolio website showcasing projects and skills. Built with Next.js, Tailwind CSS, and animations.",
        githubRepoLink: "https://github.com/ananyaverma/portfolio",
        liveOnLink: "https://ananyaverma.dev",
    },
    {
        owner: "Vikram Kumar",
        title: "Machine Learning Pipeline",
        description: "End-to-end ML pipeline for predictive analytics. Includes data processing, model training, and API endpoint.",
        githubRepoLink: "https://github.com/vikramkumar/ml-pipeline",
        liveOnLink: "https://ml-pipeline-demo.herokuapp.com",
    },
];

// Demo polls
const demoPolls = [
    {
        name: "Preferred Frontend Framework",
        options: [
            { option: "React", votes: 45 },
            { option: "Vue.js", votes: 28 },
            { option: "Angular", votes: 15 },
            { option: "Svelte", votes: 12 },
        ],
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: "active",
        votes: [
            { userId: "priya", chosenOption: "React" },
            { userId: "rajesh", chosenOption: "Vue.js" },
            { userId: "ananya", chosenOption: "React" },
        ],
    },
    {
        name: "Best Backend Runtime for 2024",
        options: [
            { option: "Node.js", votes: 62 },
            { option: "Python (FastAPI)", votes: 38 },
            { option: "Go", votes: 25 },
            { option: "Rust", votes: 20 },
        ],
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        status: "active",
        votes: [
            { userId: "rajesh", chosenOption: "Node.js" },
            { userId: "vikram", chosenOption: "Python (FastAPI)" },
        ],
    },
    {
        name: "Database Preference",
        options: [
            { option: "MongoDB", votes: 35 },
            { option: "PostgreSQL", votes: 52 },
            { option: "MySQL", votes: 28 },
            { option: "Firebase", votes: 18 },
        ],
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        status: "pending",
        votes: [
            { userId: "priya", chosenOption: "MongoDB" },
            { userId: "rajesh", chosenOption: "PostgreSQL" },
        ],
    },
    {
        name: "Deployment Platform Choice",
        options: [
            { option: "Vercel", votes: 48 },
            { option: "AWS", votes: 55 },
            { option: "Google Cloud", votes: 32 },
            { option: "Azure", votes: 25 },
        ],
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: "pending",
        votes: [],
    },
];

export async function seedDemoData() {
    try {
        console.log("🌱 Starting demo data seeding...");

        // Seed Users
        console.log("📝 Seeding users...");
        const User = await getUserModel();
        await User.deleteMany({}); // Clear existing data

        const hashedUsers = await Promise.all(
            demoUsers.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10),
            }))
        );

        const createdUsers = await User.insertMany(hashedUsers);
        console.log(`✅ Created ${createdUsers.length} users`);

        // Seed Projects
        console.log("📝 Seeding projects...");
        const Project = await getProjectModel();
        await Project.deleteMany({}); // Clear existing data

        const createdProjects = await Project.insertMany(demoProjects);
        console.log(`✅ Created ${createdProjects.length} projects`);

        // Seed Polls
        console.log("📝 Seeding polls...");
        const Poll = await getPollModel();
        await Poll.deleteMany({}); // Clear existing data

        const createdPolls = await Poll.insertMany(demoPolls);
        console.log(`✅ Created ${createdPolls.length} polls`);

        console.log("✨ Demo data seeding completed successfully!");

        return {
            success: true,
            data: {
                users: createdUsers.length,
                projects: createdProjects.length,
                polls: createdPolls.length,
            },
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("❌ Error seeding demo data:", errorMessage);
        throw error;
    }
}
