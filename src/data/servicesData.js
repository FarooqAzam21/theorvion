import { 
  TrendingUp, 
  Globe, 
  Cpu, 
  Code,
  Share2, 
  Server,
  Cloud
} from 'lucide-react';

export const servicesData = [
  {
    id: 'digital-marketing',
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Full-funnel digital marketing strategies that improve brand visibility, attract qualified leads, and support consistent business growth.',
    accent: 'from-violet-600 to-fuchsia-700',
    glow: 'rgba(217,70,239,0.18)',
    tags: ['SEO', 'Content', 'Funnels', 'Growth'],
    details: 'Our digital marketing services combine strategy, creative execution, analytics, and channel optimization. We help businesses plan campaigns, improve online visibility, create conversion-focused content, and build repeatable growth systems across the digital channels that matter most. From search engine optimization to paid advertising and email marketing, we drive measurable results.'
  },
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, responsive, and high-performing websites built to strengthen your online presence and improve customer experience across all devices.',
    accent: 'from-violet-700 to-indigo-900',
    glow: 'rgba(139,92,246,0.18)',
    tags: ['React', 'Next.js', 'Performance', 'UX'],
    details: 'We build websites that are not only visually stunning but also lightning-fast, accessible, and optimized for search engines. Our development team specializes in modern frameworks like React and Next.js, ensuring your digital presence is robust, scalable, and capable of handling future growth while providing a seamless user experience.'
  },
  {
    id: 'ai-development',
    icon: Cpu,
    title: 'AI Development',
    description: 'Intelligent AI solutions, automation workflows, chatbots, and machine learning systems designed to streamline operations and boost efficiency.',
    accent: 'from-violet-700 to-violet-900',
    glow: 'rgba(139,92,246,0.18)',
    tags: ['AI', 'ML', 'Chatbots', 'Automation'],
    details: 'Embrace the future of business with our AI development solutions. We build intelligent systems that streamline repetitive tasks, provide personalized customer experiences through advanced chatbots, and leverage machine learning for predictive analytics. Our solutions are designed to reduce operational costs and free up your team to focus on strategic initiatives.'
  },
  {
    id: 'software-solutions',
    icon: Code,
    title: 'Software Solutions',
    description: 'Custom CRM, POS, ERP, and bespoke software platforms engineered to optimize your business processes and drive operational excellence.',
    accent: 'from-violet-600 to-indigo-800',
    glow: 'rgba(147,51,234,0.18)',
    tags: ['CRM', 'POS', 'ERP', 'Custom'],
    details: 'We develop tailored software solutions that align perfectly with your business workflows. Whether you need a customer relationship management system, point-of-sale platform, enterprise resource planning tool, or a fully custom application, our team delivers scalable, secure, and intuitive software that grows with your business.'
  },
  {
    id: 'influencer-marketing',
    icon: Share2,
    title: 'Influencer Marketing',
    description: 'Strategic influencer collaborations that connect your brand with the right audience and drive real conversions through authentic promotion.',
    accent: 'from-violet-500 to-purple-800',
    glow: 'rgba(168,85,247,0.18)',
    tags: ['Creators', 'Reach', 'Engagement', 'Sales'],
    details: 'We help you tap into highly engaged audiences through strategic influencer partnerships. Our team handles everything from influencer identification and outreach to campaign management and performance tracking. We focus on authentic collaborations that align with your brand values and drive meaningful engagement and measurable conversions.'
  },
  {
    id: 'devops',
    icon: Server,
    title: 'DevOps',
    description: 'Streamlined CI/CD pipelines, infrastructure automation, and monitoring solutions to accelerate delivery and ensure system reliability.',
    accent: 'from-violet-600 to-violet-800',
    glow: 'rgba(147,51,234,0.18)',
    tags: ['CI/CD', 'Docker', 'Kubernetes', 'Monitoring'],
    details: 'Our DevOps services bridge the gap between development and operations, enabling faster and more reliable software delivery. We implement continuous integration and deployment pipelines, containerization with Docker and Kubernetes, infrastructure as code, and comprehensive monitoring to ensure your applications run smoothly at scale.'
  },
  {
    id: 'cloud-services',
    icon: Cloud,
    title: 'Cloud Services',
    description: 'Scalable cloud infrastructure, migration strategies, and managed services to power your applications with enterprise-grade reliability.',
    accent: 'from-violet-500 to-violet-700',
    glow: 'rgba(168,85,247,0.18)',
    tags: ['AWS', 'Azure', 'Migration', 'Scaling'],
    details: 'Deploy, monitor, improve, and scale your applications with confidence using our cloud services. We provide cloud architecture design, seamless migration strategies, and ongoing managed services across major platforms including AWS, Azure, and Google Cloud. Our solutions ensure high availability, security, and cost optimization for your infrastructure.'
  },
];
