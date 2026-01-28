import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight, Zap, Vote, Code2, Briefcase, Brain, Users, TrendingUp, ArrowRight, Github, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Home() {
	const features = [
		{
			icon: <Vote className="w-8 h-8" />,
			title: "Community Polls",
			description: "Participate in engaging polls and see what the community thinks about trending tech topics",
			link: "/poll",
			color: "from-blue-500 to-cyan-500",
		},
		{
			icon: <Code2 className="w-8 h-8" />,
			title: "Project Showcase",
			description: "Share your amazing projects and discover projects from talented developers in the community",
			link: "/projects",
			color: "from-purple-500 to-pink-500",
		},
		{
			icon: <Briefcase className="w-8 h-8" />,
			title: "Job Board",
			description: "Find exciting job opportunities from tech companies across different experience levels",
			link: "/jobs",
			color: "from-orange-500 to-red-500",
		},
		{
			icon: <Brain className="w-8 h-8" />,
			title: "AI Coding Assistant",
			description: "Get intelligent coding help, code generation, and debugging assistance from advanced AI",
			link: "/bot",
			color: "from-green-500 to-emerald-500",
		},
	];

	const stats = [
		{ label: "Active Users", value: "300+" },
		{ label: "Projects Shared", value: "110+" },
		{ label: "Polls Created", value: "480+" },
		{ label: "Job Listings", value: "250+" },
	];

	const testimonials = [
		{
			name: "Priya Sharma",
			role: "Full Stack Developer",
			comment: "INSPIRE helped me showcase my projects and land my dream job. The community is amazing!",
		},
		{
			name: "Rajesh Patel",
			role: "Backend Engineer",
			comment: "The AI coding assistant has been a game-changer for debugging and optimization.",
		},
		{
			name: "Ananya Verma",
			role: "Frontend Specialist",
			comment: "Love participating in polls and connecting with developers who share similar interests.",
		},
	];

	return (
		<>
			{/* Navigation Bar */}
			<nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
						<span className="font-bold text-xl">INSPIRE</span>
					</div>
					<div className="flex gap-4">
						<Link href="/login">
							<Button variant="ghost">Login</Button>
						</Link>
						<Link href="/signup">
							<Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg">Sign Up</Button>
						</Link>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="pt-32 pb-20 px-4 bg-gradient-to-b from-slate-50 to-white">
				<div className="max-w-5xl mx-auto text-center">
					<div className="mb-6 inline-block">
						<span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
							Welcome to the Developer Community
						</span>
					</div>
					<h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Inspire. Connect. Create.
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Your all-in-one platform for community polls, project showcase, job hunting, and AI-powered coding assistance. Join thousands of developers transforming their careers today.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/dashboard">
							<Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl">
								Get Started <ArrowRight className="ml-2 w-5 h-5" />
							</Button>
						</Link>
						<Link href="/poll">
							<Button size="lg" variant="outline" className="border-2">
								Explore Polls <Vote className="ml-2 w-5 h-5" />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 px-4 bg-white">
				<div className="max-w-5xl mx-auto">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, idx) => (
							<div key={idx} className="text-center">
								<div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
								<p className="text-gray-600">{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 px-4 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
						<p className="text-xl text-gray-600">Everything you need to grow as a developer</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{features.map((feature, idx) => (
							<Link key={idx} href={feature.link}>
								<Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white">
									<CardHeader>
										<div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} text-white flex items-center justify-center mb-4`}>
											{feature.icon}
										</div>
										<CardTitle className="text-2xl">{feature.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-gray-600 mb-4">{feature.description}</p>
										<div className="flex items-center text-blue-600 font-medium">
											Explore <MoveRight className="ml-2 w-4 h-4" />
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Features Detail Section */}
			<section className="py-20 px-4 bg-white">
				<div className="max-w-5xl mx-auto">
					<div className="mb-16">
						<h2 className="text-4xl font-bold mb-4">Why Choose INSPIRE?</h2>
						<p className="text-xl text-gray-600">Everything designed for your success</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="space-y-4">
							<div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
								<Users className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold">Active Community</h3>
							<p className="text-gray-600">Connect with passionate developers, share ideas, and grow together</p>
						</div>
						<div className="space-y-4">
							<div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
								<TrendingUp className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold">Career Growth</h3>
							<p className="text-gray-600">Showcase projects, apply to jobs, and advance your career rapidly</p>
						</div>
						<div className="space-y-4">
							<div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
								<Zap className="w-6 h-6" />
							</div>
							<h3 className="text-xl font-bold">AI-Powered Tools</h3>
							<p className="text-gray-600">Leverage advanced AI to improve your coding skills faster</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Showcase Section */}
			<section className="py-20 px-4 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4">✨ See What You Get Inside</h2>
						<p className="text-xl text-gray-600 mb-4">A glimpse of the powerful features awaiting you</p>
						<Badge className="bg-blue-100 text-blue-700 border-blue-300 px-4 py-2">
							🔐 IIITN Member Exclusive - Full access upon login
						</Badge>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{/* Dashboard Screenshot */}
						<div className="space-y-4">
							<div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
								<div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
								<div className="relative w-full h-64 bg-gray-100">
									<Image
										src="/screenshots/dashboard.png"
										alt="Dashboard"
										fill
										className="object-cover"
									/>
								</div>
							</div>
							<div>
								<h3 className="font-bold text-lg">📊 Personal Dashboard</h3>
								<p className="text-gray-600">Track your polls voted, projects submitted, jobs applied, and engagement metrics at a glance</p>
							</div>
						</div>

						{/* Projects Showcase */}
						<div className="space-y-4">
							<div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
								<div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2"></div>
								<div className="relative w-full h-64 bg-gray-100">
									<Image
										src="/screenshots/projects.png"
										alt="Project Showcase"
										fill
										className="object-cover"
									/>
								</div>
							</div>
							<div>
								<h3 className="font-bold text-lg">💻 Project Showcase</h3>
								<p className="text-gray-600">Display your amazing projects, get feedback, view count, likes, and connect with other developers</p>
							</div>
						</div>

						{/* Community Polls */}
						<div className="space-y-4">
							<div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
								<div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2"></div>
								<div className="relative w-full h-64 bg-gray-100">
									<Image
										src="/screenshots/polls.png"
										alt="Community Polls"
										fill
										className="object-cover"
									/>
								</div>
							</div>
							<div>
								<h3 className="font-bold text-lg">🗳️ Community Polls</h3>
								<p className="text-gray-600">Participate in trending tech polls, see what the community thinks, and share your opinion on industry topics</p>
							</div>
						</div>

						{/* Job Board */}
						<div className="space-y-4">
							<div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
								<div className="bg-gradient-to-r from-orange-500 to-red-600 h-2"></div>
								<div className="relative w-full h-64 bg-gray-100">
									<Image
										src="/screenshots/jobs.png"
										alt="Job Board"
										fill
										className="object-cover"
									/>
								</div>
							</div>
							<div>
								<h3 className="font-bold text-lg">💼 Job Board</h3>
								<p className="text-gray-600">Explore curated job listings from tech companies, apply directly, and track your application status</p>
							</div>
						</div>

						{/* AI Assistant */}
						<div className="space-y-4">
							<div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
								<div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2"></div>
								<div className="relative w-full h-64 bg-gray-100">
									<Image
										src="/screenshots/ai-assistant.png"
										alt="AI Assistant"
										fill
										className="object-cover"
									/>
								</div>
							</div>
							<div>
								<h3 className="font-bold text-lg">🤖 AI Coding Assistant</h3>
								<p className="text-gray-600">Get instant coding help, generate code, debug issues, and improve your programming skills with AI</p>
							</div>
						</div>

						{/* User Profile */}
						<div className="space-y-4">
							<div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
								<div className="bg-gradient-to-r from-pink-500 to-rose-600 h-2"></div>
								<div className="relative w-full h-64 bg-gray-100">
									<Image
										src="/screenshots/profile.png"
										alt="User Profile"
										fill
										className="object-cover"
									/>
								</div>
							</div>
							<div>
								<h3 className="font-bold text-lg">👤 Professional Profile</h3>
								<p className="text-gray-600">Build your developer profile, showcase achievements, connect with recruiters, and network with peers</p>
							</div>
						</div>
					</div>

					{/* CTA for Non-IIITN Users */}
					<div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 p-8 text-center">
						<h3 className="text-2xl font-bold mb-4">💡 Want to Use This for Your Community?</h3>
						<p className="text-gray-600 mb-6 max-w-2xl mx-auto">
							INSPIRE is open-source! Clone it, customize the features to match your college or community's needs, and deploy it with your own branding.
						</p>
						<Link href="https://github.com/sandeshlavshetty/buss_poll" target="_blank">
							<Button size="lg" variant="outline" className="border-2">
								View Open Source Repository <Github className="ml-2 w-5 h-5" />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* INSPIRE Journey Section */}
			<section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4">🚀 Our Journey</h2>
						<p className="text-xl text-gray-600">From solving local problems to inspiring a community</p>
					</div>

					<div className="space-y-6">
						<div className="flex gap-6 items-start">
							<div className="flex-shrink-0">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white font-bold">1</div>
							</div>
							<div>
								<h3 className="text-xl font-bold mb-2">🏠 Started at IIITN (DIA Hostel)</h3>
								<p className="text-gray-600">INSPIRE began as a solution to help students at IIITN manage bus commute schedules between DIA Hostel and College. A simple problem, but with a powerful purpose - connecting the community.</p>
							</div>
						</div>

						<div className="flex gap-6 items-start">
							<div className="flex-shrink-0">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white font-bold">2</div>
							</div>
							<div>
								<h3 className="text-xl font-bold mb-2">📈 Rapid Expansion</h3>
								<p className="text-gray-600">As the platform grew, we realized the potential to do much more. We expanded beyond bus scheduling to create a comprehensive developer community platform with polls, projects, and career opportunities.</p>
							</div>
						</div>

						<div className="flex gap-6 items-start">
							<div className="flex-shrink-0">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white font-bold">3</div>
							</div>
							<div>
								<h3 className="text-xl font-bold mb-2">🤖 AI Integration</h3>
								<p className="text-gray-600">We integrated AI-powered features to help developers code better, learn faster, and advance their careers. What started as a campus solution became a powerful tool for thousands.</p>
							</div>
						</div>

						<div className="flex gap-6 items-start">
							<div className="flex-shrink-0">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white font-bold">4</div>
							</div>
							<div>
								<h3 className="text-xl font-bold mb-2">🌍 Going Open Source</h3>
								<p className="text-gray-600">Believing in the power of open-source, we released INSPIRE as open-source software. Now any college or community can clone, customize, and deploy it for their students.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Open Source Section */}
			<section className="py-20 px-4 bg-white">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4">💚 Open Source for Everyone</h2>
						<p className="text-xl text-gray-600">Built with ❤️ for the developer community</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8 mb-12">
						<Card className="border-2 border-gray-200">
							<CardHeader>
								<div className="flex items-center gap-3 mb-3">
									<Github className="w-8 h-8 text-gray-900" />
									<CardTitle>Clone & Deploy</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 mb-4">Get the entire codebase from our GitHub repository. Deploy it on your server or hosting platform within minutes.</p>
								<Link href="https://github.com/sandeshlavshetty/buss_poll" target="_blank">
									<Button variant="outline" className="w-full">
										View on GitHub <ArrowRight className="ml-2 w-4 h-4" />
									</Button>
								</Link>
							</CardContent>
						</Card>

						<Card className="border-2 border-gray-200">
							<CardHeader>
								<div className="flex items-center gap-3 mb-3">
									<Globe className="w-8 h-8 text-blue-600" />
									<CardTitle>Customize for Your Community</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 mb-4">Modify features, branding, and functionality to match your college or community's unique needs. The possibilities are endless.</p>
								<Link href="https://github.com/sandeshlavshetty/buss_poll" target="_blank">
									<Button variant="outline" className="w-full">
										Learn More <ArrowRight className="ml-2 w-4 h-4" />
									</Button>
								</Link>
							</CardContent>
						</Card>
					</div>

					<Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-white">
						<CardHeader>
							<CardTitle className="text-2xl">Perfect For:</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-3 gap-6">
								<div>
									<h4 className="font-bold mb-2">🎓 Educational Institutions</h4>
									<p className="opacity-90">Create a platform for your college students to connect and grow</p>
								</div>
								<div>
									<h4 className="font-bold mb-2">👥 Developer Communities</h4>
									<p className="opacity-90">Build a hub for local tech meetups and networking</p>
								</div>
								<div>
									<h4 className="font-bold mb-2">🏢 Corporate Teams</h4>
									<p className="opacity-90">Use it as an internal platform for team engagement and growth</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="mt-12 text-center">
						<h3 className="text-2xl font-bold mb-4">Tech Stack Used</h3>
						<div className="flex flex-wrap justify-center gap-4">
							{['Next.js', 'React', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Node.js', 'Express'].map((tech, idx) => (
								<Badge key={idx} variant="outline" className="px-4 py-2 text-sm">
									{tech}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-20 px-4 bg-gray-50">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-16">What Developers Say</h2>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, idx) => (
							<Card key={idx} className="border-0 bg-white">
								<CardContent className="pt-6">
									<div className="flex gap-1 mb-4">
										{[...Array(5)].map((_, i) => (
											<span key={i} className="text-yellow-400">★</span>
										))}
									</div>
									<p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
									<div>
										<p className="font-semibold">{testimonial.name}</p>
										<p className="text-sm text-gray-500">{testimonial.role}</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-6">Ready to Join the Community?</h2>
					<p className="text-xl mb-8 opacity-90">Start your journey with INSPIRE today and unlock your potential as a developer</p>
					<Link href="/signup">
						<Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
							Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
						</Button>
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-gray-400 py-12 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
						<div>
							<h3 className="text-white font-bold mb-4">Product</h3>
							<ul className="space-y-2">
								<li><Link href="/poll" className="hover:text-white">Polls</Link></li>
								<li><Link href="/projects" className="hover:text-white">Projects</Link></li>
								<li><Link href="/jobs" className="hover:text-white">Jobs</Link></li>
								<li><Link href="/bot" className="hover:text-white">AI Assistant</Link></li>
							</ul>
						</div>
						<div>
							<h3 className="text-white font-bold mb-4">Company</h3>
							<ul className="space-y-2">
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">About Us</a></li>
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">Blog</a></li>
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">Careers</a></li>
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">Contact</a></li>
							</ul>
						</div>
						<div>
							<h3 className="text-white font-bold mb-4">Resources</h3>
							<ul className="space-y-2">
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">Documentation</a></li>
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">FAQ</a></li>
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">Support</a></li>
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">Community</a></li>
							</ul>
						</div>
						<div>
							<h3 className="text-white font-bold mb-4">Legal</h3>
							<ul className="space-y-2">
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">Privacy</a></li>
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">Terms</a></li>
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">Cookies</a></li>
								<li><a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">License</a></li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 pt-8 flex justify-between items-center">
						<p>&copy; 2026 INSPIRE. All rights reserved.</p>
						<div className="flex gap-4">
							<a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">Twitter</a>
							<a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">GitHub</a>
							<a href="https://www.linkedin.com/in/sandesh-lavshetty-143334281/" className="hover:text-white">LinkedIn</a>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
