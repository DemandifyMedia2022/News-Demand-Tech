"use client";
import React from "react";
import Image from "next/image";
import { Button, FlowButton } from "@/components/ui/button";
import { FlowButton2 } from "@/components/ui/button2";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/menu-toggle-icon";
import { createPortal } from "react-dom";
import { Input } from "@/components/ui/input";
import  BannerScroller from "@/components/banner-scroller";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
	CodeIcon,
	GlobeIcon,
	LayersIcon,
	UserPlusIcon,
	Users,
	Star,
	FileText,
	Shield,
	RotateCcw,
	Handshake,
	Leaf,
	HelpCircle,
	BarChart,
	PlugIcon,
	Flame,
	Wallet,
	Headphones,
	UserCog,
	Megaphone,
	Search,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

type HeaderProps = {
	onSearchChange?: (value: string) => void;
};

export function Header({ onSearchChange }: HeaderProps) {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [currentDate, setCurrentDate] = React.useState(new Date());
	const [showTime, setShowTime] = React.useState(false);
	const now = new Date();
	const isDecember = now.getMonth() === 11;

	// Update date every minute to keep it current, or every second if showing time
	React.useEffect(() => {
		const interval = showTime ? 1000 : 60000; // 1 second if showing time, 1 minute otherwise
		const timer = setInterval(() => {
			setCurrentDate(new Date());
		}, interval);

		return () => clearInterval(timer);
	}, [showTime]);

	// Format date with day and ordinal suffix
	const formatDate = (date: Date) => {
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
						'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		
		const dayName = days[date.getDay()];
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		
		// Add ordinal suffix (st, nd, rd, th)
		const getOrdinalSuffix = (day: number) => {
			if (day > 3 && day < 21) return 'th';
			switch (day % 10) {
				case 1: return 'st';
				case 2: return 'nd';
				case 3: return 'rd';
				default: return 'th';
			}
		};
		
		return `${dayName} ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
	};

	// Format shorter date for mobile
	const formatShortDate = (date: Date) => {
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
						'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		
		const dayName = days[date.getDay()];
		const day = date.getDate();
		const month = months[date.getMonth()];
		
		return `${dayName} ${day} ${month}`;
	};

	// Format time
	const formatTime = (date: Date) => {
		const timeString = date.toLocaleTimeString('en-US', { 
			hour: 'numeric', 
			minute: '2-digit',
			hour12: true 
		});
		// Remove spaces and make more compact
		return timeString.replace(' ', '').toLowerCase();
	};

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn('fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/95 text-slate-900 backdrop-blur-sm transition-all duration-300', {
				'shadow-lg': scrolled,
			})}
		>
			<nav className="flex h-18 w-full items-center px-3 md:px-6 gap-3 md:gap-5">

				{/* Left: Logo */}
				<div className="flex items-center">
					<a href="/" className="flex items-center gap-2 relative group">
						<div className="relative overflow-hidden rounded-lg">
							<Image
								src="/img/D_logo.svg"
								alt="Demand Teq"
								width={48}
								height={48}
								className="h-10 w-10 md:h-12 md:w-12 transition-transform duration-200 group-hover:scale-105"
								priority
							/>
						</div>
						{isDecember && (
							<span className="relative -mt-7 md:-mt-8 flex items-center justify-center christmas-tree-wrapper">
								{/* Snowflakes around tree */}
								<span className="snowflake snowflake-1 mt-10">✦</span>
								<span className="snowflake snowflake-2 mt-10">✦</span>
								<span className="snowflake snowflake-3 mt-10">✦</span>
								<span className="snowflake snowflake-4 mt-10">✦</span>
								<ChristmasTreeIcon className="h-20 w-20 md:h-18 md:w-18 text-emerald-300 mt-10" />
							</span>
						)}
					</a>
				</div>

				{/* Center: Date */}
				<div className="flex-1 flex justify-center">
					<button
						onClick={() => setShowTime(!showTime)}
						className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[11px] md:text-xs font-medium tracking-wide text-sky-900 hover:bg-sky-100 transition-colors cursor-pointer h-8 min-w-fit whitespace-nowrap"
						title={showTime ? "Click to show date" : "Click to show time"}
					>
						<span className={`inline-block h-1.5 w-1.5 rounded-full bg-sky-600 flex-shrink-0 ${showTime ? 'animate-pulse' : ''}`} />
						{showTime ? (
							<span className="font-mono text-[11px] md:text-xs">{formatTime(currentDate)}</span>
						) : (
							<>
								<span className="hidden sm:inline text-[11px] md:text-xs">{formatDate(currentDate)}</span>
								<span className="sm:hidden text-[11px]">{formatShortDate(currentDate)}</span>
							</>
						)}
					</button>
				</div>

				{/* Right: Navigation + Buttons + Mobile Menu */}
				<div className="flex items-center gap-3 md:gap-5">
					<div className="hidden md:flex items-center md:pl-4 lg:pl-6 gap-3 lg:gap-5">
					<NavigationMenu>
						<NavigationMenuList className="space-x-4 md:space-x-5">
							{/* Home */}
							<NavigationMenuLink className="px-1" asChild>
								<a
									href="/"
									className="relative rounded-md p-2 text-slate-900 font-sans text-[14px] md:text-[16px] font-medium hover:text-sky-600 after:block after:h-0.5 after:w-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
									style={{ fontFamily: "'InterDisplay', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
								>
									Home
								</a>
							</NavigationMenuLink>

							{/* Tech News dropdown (keeps same structure/animations) */}
							<NavigationMenuItem>
								<NavigationMenuTrigger
								className="px-1 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent !bg-transparent text-slate-900 focus:text-slate-900 data-[state=open]:text-slate-900 data-[active]:text-slate-900 font-sans p-2 text-[14px] md:text-[16px] font-medium hover:text-sky-600 relative whitespace-nowrap rounded-md after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full [&>svg]:!rotate-0"
									style={{ fontFamily: "'InterDisplay', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
								>
									Tech News
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-white text-slate-900 p-1 pr-1.5">
									<ul className="grid w-lg grid-cols-2 gap-2 rounded-md border border-sky-200 bg-white p-2 shadow">
										{techNewsLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							{/* Events */}
							<NavigationMenuLink className="px-1" asChild>
								<a
									href="/event"
									className="relative rounded-md p-2 text-slate-900 font-sans text-[14px] md:text-[16px] font-medium hover:text-sky-600 after:block after:h-0.5 after:w-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
									style={{ fontFamily: "'InterDisplay', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
								>
									Events
								</a>
							</NavigationMenuLink>

							{/* About Us */}
							<NavigationMenuLink className="px-1" asChild>
								<a
									href="/about-us"
									className="relative rounded-md p-2 text-slate-900 font-sans whitespace-nowrap text-[14px] md:text-[16px] font-medium hover:text-sky-600 after:block after:h-0.5 after:w-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full"
									style={{ fontFamily: "'InterDisplay', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
								>
									About-Us
								</a>
							</NavigationMenuLink>
						</NavigationMenuList>
					</NavigationMenu>
					<div className="relative hidden lg:block w-full max-w-[13rem] xl:max-w-[15rem] ml-4">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
						<Input
							type="search"
							placeholder="Search blogs..."
							className="h-9 rounded-full bg-sky-50 border-sky-200 pl-9 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:ring-sky-500 focus-visible:border-sky-500"
							value={searchTerm}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const value = event.target.value;
								setSearchTerm(value);
								onSearchChange?.(value);
							}}
						/>
					</div>
				</div>
				{/* Desktop Community and Contact Us buttons on the right */}
				<div className="hidden md:flex items-center gap-2">
					<FlowButton 
						text="Community" 
						onClick={() => {
							if (typeof window !== "undefined") {
								window.location.href = "/community";
							}
						}}
					/>
					<FlowButton2
						text="Contact Us"
						onClick={() => {
							if (typeof window !== "undefined") {
								window.location.href = "/contact-us";
							}
						}}
					/>
				</div>
				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden ml-auto"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</div>
			</nav>
			<BannerScroller />
			<style jsx>{`
				.christmas-tree-wrapper {
					animation: tree-sway 2.4s ease-in-out infinite;
					transform-origin: bottom center;
				}

				.christmas-tree-wrapper svg {
					animation: tree-glow 3.6s ease-in-out infinite;
					filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.9));
				}

				.snowflake {
					position: absolute;
					color: rgba(248, 250, 252, 0.9);
					font-size: 1.5rem;
					pointer-events: none;
				}		

				.snowflake-1 {
					left: -0.4rem;
					top: -0.6rem;
					animation: snow-fall 3.2s linear infinite;
				}

				.snowflake-2 {
					left: 0.4rem;
					top: -0.9rem;
					animation: snow-fall 2.9s linear infinite;
					animation-delay: -3s;
				}

				.snowflake-3 {
					left: 1.5rem;
					top: -0.7rem;
					animation: snow-fall 3.6s linear infinite;
					animation-delay: -1.6s;
				}
				.snowflake-4 {
					left: 2rem;
					top: -0.8rem;
					animation: snow-fall 3.6s linear infinite;
					animation-delay: -1.6s;
				}

				@keyframes snow-fall {
					0% { transform: translateY(0) translateX(0); opacity: 0; }
					15% { opacity: 1; }
					60% { transform: translateY(10px) translateX(2px); opacity: 1; }
					100% { transform: translateY(16px) translateX(4px); opacity: 0; }
				}

				@keyframes tree-sway {
					0%, 100% { transform: rotate(0deg) translateY(0); }
					25% { transform: rotate(-3deg) translateY(-1px); }
					50% { transform: rotate(2.5deg) translateY(0); }
					75% { transform: rotate(-1.5deg) translateY(-0.5px); }
				}

				@keyframes tree-glow {
					0%, 100% { filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.5)); }
					40% { filter: drop-shadow(0 0 18px rgba(16, 185, 129, 0.95)); }
					70% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
				}
			`}</style>

			<MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
				<NavigationMenu className="max-w-full">
					<div className="flex w-full flex-col gap-y-2">
						<a href="/" className="relative rounded-md p-2 text-slate-900 font-['InterDisplay'] transition-colors duration-200 hover:bg-sky-100 hover:text-sky-900">Home</a>
						<span className="text-sm font-['InterDisplay'] text-slate-700">Tech News</span>
						{techNewsLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						<a href="/community" className="relative rounded-md p-2 text-slate-900 font-['InterDisplay'] transition-colors duration-200 hover:bg-sky-100 hover:text-sky-900">Community</a>
						<a href="/event" className="relative rounded-md p-2 text-slate-900 font-['InterDisplay'] transition-colors duration-200 hover:bg-sky-100 hover:text-sky-900">Events</a>
						<a href="/about-us" className="relative rounded-md p-2 text-slate-900 font-['InterDisplay'] transition-colors duration-200 hover:bg-sky-100 hover:text-sky-900">About Us</a>
					</div>
				</NavigationMenu>
				{/* Removed auth buttons in mobile menu */}
			</MobileMenu>
		</header>
	);
}


type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-white/95 text-slate-900 supports-[backdrop-filter]:bg-white/80 backdrop-blur-lg',
				'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-4',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,	
	);
}

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
	return (
		<NavigationMenuLink className={cn("group w-full flex flex-row gap-x-2 rounded-md px-3 py-2 text-slate-900 font-['InterDisplay'] transition-colors duration-200 hover:bg-sky-100 hover:text-sky-900", className)} {...props} asChild>
			<a href={href}>
				<div className="flex aspect-square size-12 items-center justify-center rounded-md border border-sky-200 bg-white shadow-sm transition-colors duration-200 group-hover:border-sky-300 group-hover:bg-sky-50">
					<Icon className="size-5 text-slate-700 transition-colors duration-200 group-hover:text-sky-700" />
				</div>
				<div className="flex flex-col items-start justify-center">
					<span className="text-[15px] md:text-[16px] font-semibold">{title}</span>
					{description && <span className="text-xs text-slate-600 transition-colors duration-200 group-hover:text-slate-700">{description}</span>}
				</div>
			</a>
		</NavigationMenuLink>
	);
}

const techNewsLinks: LinkItem[] = [
	{
		title: 'Trending Topics',
		href: '/tech',
		description: 'The latest buzz in tech',
		icon: Flame,
	},
	{
		title: 'FinTeq',
		href: '/tech/finteq',
		description: 'Fintech insights and updates',
		icon: Wallet,
	},
	{
		title: 'CXTeq',
		href: '/tech/cxteq',
		description: 'Customer experience technology',
		icon: Headphones,
	},
	{
		title: 'HRTeq',
		href: '/tech/hrteq',
		description: 'HR tech trends and tools',
		icon: UserCog,
	},
	{
		title: 'MarTeq',
		href: '/tech/marteq',
		description: 'Marketing tech strategies',
		icon: Megaphone,
	},
];

const productLinks: LinkItem[] = [
	{
		title: 'Website Builder',
		href: '#',
		description: 'Create responsive websites with ease',
		icon: GlobeIcon,
	},
	{
		title: 'Cloud Platform',
		href: '#',
		description: 'Deploy and scale apps in the cloud',
		icon: LayersIcon,
	},
	{
		title: 'Team Collaboration',
		href: '#',
		description: 'Tools to help your teams work better together',
		icon: UserPlusIcon,
	},
	{
		title: 'Analytics',
		href: '#',
		description: 'Track and analyze your website traffic',
		icon: BarChart,
	},
	{
		title: 'Integrations',
		href: '#',
		description: 'Connect your apps and services',
		icon: PlugIcon,
	},
	{
		title: 'API',
		href: '#',
		description: 'Build custom integrations with our API',
		icon: CodeIcon,
	},
];

const companyLinks: LinkItem[] = [
	{
		title: 'About Us',
		href: '/about-us',
		description: 'Learn more about our story and team',
		icon: Users,
	},
	{
		title: 'Customer Stories',
		href: '#',
		description: 'See how we’ve helped our clients succeed',
		icon: Star,
	},
	{
		title: 'Partnerships',
		href: '#',
		icon: Handshake,
		description: 'Collaborate with us for mutual growth',
	},
];

const companyLinks2: LinkItem[] = [
	{
		title: 'Terms of Service',
		href: '#',
		icon: FileText,
	},
	{
		title: 'Privacy Policy',
		href: '/privacy-policy',
		icon: Shield,
	},
	{
		title: 'Refund Policy',
		href: '#',
		icon: RotateCcw,
	},
	{
		title: 'Blog',
		href: '#',
		icon: Leaf,
	},
	{
		title: 'Help Center',
		href: '#',
		icon: HelpCircle,
	},
];

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	// also check on first load
	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}


const ChristmasTreeIcon = (props: React.ComponentProps<"svg">) => (
	<svg
		viewBox="0 0 36 36"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<defs>
			<linearGradient id="treeGradient" x1="20" y1="2" x2="16" y2="26" gradientUnits="userSpaceOnUse">
				<stop stopColor="#6EE7B7" />
				<stop offset="1" stopColor="#10B981" />
			</linearGradient>
		</defs>
		<path
			d="M15.1 3.5c.5-.8 1.3-.8 1.8 0l4 6.5c.4.7.1 1.3-.7 1.3h-2.2l3.3 5.3c.4.7.1 1.3-.7 1.3h-2.1l3 5c.4.7.1 1.6-.9 1.6H11.4c-1 0-1.3-.9-.9-1.6l3-5h-2.1c-.8 0-1.1-.6-.7-1.3l3.3-5.3h-2.2c-.8 0-1.1-.6-.7-1.3l4-6.5Z"
			fill="url(#treeGradient)"
		/>
		<circle cx="16" cy="6" r="0.8" fill="#FDE68A" />
		<circle cx="13" cy="11" r="0.7" fill="#F97316" />
		<circle cx="19" cy="13" r="0.7" fill="#3B82F6" />
		<circle cx="14" cy="17" r="0.7" fill="#FACC15" />
		<circle cx="18" cy="19" r="0.7" fill="#EC4899" />
		<rect x="14.1" y="23" width="3.8" height="4.5" rx="0.6" fill="#4B5563" />
	</svg>
);

const WordmarkIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 84 24" fill="currentColor" {...props}>
    <path d="M45.035 23.984c-1.34-.062-2.566-.441-3.777-1.16-1.938-1.152-3.465-3.187-4.02-5.36-.199-.784-.238-1.128-.234-2.058 0-.691.008-.87.062-1.207.23-1.5.852-2.883 1.852-4.144.297-.371 1.023-1.09 1.41-1.387 1.399-1.082 2.84-1.68 4.406-1.816.536-.047 1.528-.02 2.047.054 1.227.184 2.227.543 3.106 1.121 1.277.84 2.5 2.184 3.367 3.7.098.168.172.308.172.312-.004 0-1.047.723-2.32 1.598l-2.711 1.867c-.61.422-2.91 2.008-2.993 2.062l-.074.047-1-1.574c-.55-.867-1.008-1.594-1.012-1.61-.007-.019.922-.648 2.188-1.476 1.215-.793 2.2-1.453 2.191-1.46-.02-.032-.508-.27-.691-.34a5 5 0 0 0-.465-.13c-.371-.09-1.105-.125-1.426-.07-1.285.219-2.336 1.3-2.777 2.852-.215.761-.242 1.636-.074 2.355.129.527.383 1.102.691 1.543.234.332.727.82 1.047 1.031.664.434 1.195.586 1.969.555.613-.023 1.027-.129 1.64-.426 1.184-.574 2.16-1.554 2.828-2.843.122-.235.208-.372.227-.368.082.032 3.77 1.938 3.79 1.961.034.032-.407.93-.696 1.414a12 12 0 0 1-1.051 1.477c-.36.422-1.102 1.14-1.492 1.445a9.9 9.9 0 0 1-3.23 1.684 9.2 9.2 0 0 1-2.95.351M74.441 23.996c-1.488-.043-2.8-.363-4.066-.992-1.687-.848-2.992-2.14-3.793-3.774-.605-1.234-.863-2.402-.863-3.894.004-1.149.176-2.156.527-3.11.14-.378.531-1.171.75-1.515 1.078-1.703 2.758-2.934 4.805-3.524.847-.242 1.465-.332 2.433-.351 1.032-.024 1.743.055 2.48.277l.31.09.007 2.48c.004 1.364 0 2.481-.008 2.481a1 1 0 0 1-.12-.055c-.688-.347-2.09-.488-2.962-.296-.754.167-1.296.453-1.785.945a3.7 3.7 0 0 0-1.043 2.11c-.047.382-.02 1.109.055 1.437a3.4 3.4 0 0 0 .941 1.738c.75.75 1.715 1.102 2.875 1.05.645-.03 1.118-.14 1.563-.366q1.721-.864 2.02-3.145c.035-.293.042-1.266.042-7.957V0H84l-.012 8.434c-.008 7.851-.011 8.457-.054 8.757-.196 1.274-.586 2.25-1.301 3.243-1.293 1.808-3.555 3.07-6.145 3.437-.664.098-1.43.14-2.047.125M9.848 23.574a14 14 0 0 1-1.137-.152c-2.352-.426-4.555-1.781-6.117-3.774-.27-.335-.75-1.05-.95-1.406-1.156-2.047-1.695-4.27-1.64-6.77.047-1.995.43-3.66 1.23-5.316.524-1.086 1.04-1.87 1.793-2.715C4.567 1.72 6.652.535 8.793.171 9.68.02 10.093 0 12.297 0h1.789v5.441l-.961.016c-2.36.04-3.441.215-4.441.719-.836.414-1.278.879-1.895 1.976-.219.399-.535 1.02-.535 1.063 0 .02 1.285.027 3.918.027h3.914v5.113h-3.914c-2.54 0-3.918.008-3.918.028 0 .05.254.597.441.953.344.656.649 1.086 1.051 1.48.668.657 1.356.985 2.445 1.16.645.106 1.274.145 2.61.16l1.285.016v5.442l-2.055-.004a120 120 0 0 1-2.183-.016M16.469 14.715c0-5.504.011-9.04.031-9.29a5.54 5.54 0 0 1 1.527-3.48c.778-.82 1.922-1.457 3.118-1.734C21.915.035 22.422 0 24.39 0h1.652v4.914h-1.426c-1.324 0-1.445.004-1.644.055-.739.191-1.059.699-1.106 1.754l-.015.355h4.191v4.914h-4.184v11.602h-5.39ZM27.023 14.727c0-5.223.012-9.04.028-9.278.129-1.98 1.234-3.68 3.012-4.62.87-.462 1.777-.716 2.851-.802A61 61 0 0 1 34.945 0h1.649v4.914h-1.426c-1.32 0-1.441.004-1.64.055-.739.191-1.063.699-1.106 1.754l-.02.355h4.192v4.914H32.41v11.602h-5.387ZM55.48 15.406V7.22h4.66v1.363c0 1.3.005 1.363.051 1.363.04 0 .075-.054.133-.203.38-.98.969-1.68 1.711-2.031.563-.266 1.422-.43 2.492-.48l.414-.02v4.914l-.414.035c-.738.063-1.597.195-2.058.313-.297.082-.688.28-.875.449-.324.289-.532.703-.625 1.254-.094.547-.098.879-.098 5.144v4.274h-5.39Zm0 0" />
  </svg>
);