"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, FlowButton, ShimmerButton } from "@/components/ui/button";
import { FlowButton2 } from "@/components/ui/button2";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/menu-toggle-icon";
import { createPortal } from "react-dom";
import { Input } from "@/components/ui/input";
import BannerScroller from "@/components/banner-scroller";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
	Flame,
	Wallet,
	Headphones,
	UserCog,
	Megaphone,
	Search,
	Sparkles as SparklesIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ---------------------------------- */
/* 🔥 SHARED NAV ITEM STYLE (FINAL FIX) */
/* ---------------------------------- */
const navItemClass =
	"!text-black relative px-1 p-2 rounded-md font-medium text-[14px] md:text-[16px] " +
	"!bg-transparent focus:!text-black " +
	"after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 " +
	"after:bg-[#1e3a8a] after:transition-all after:duration-300 " +
	"hover:!text-[#1e3a8a] hover:after:w-full " +
	"data-[active]:after:w-0 data-[state=open]:after:w-0";

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
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [currentDate, setCurrentDate] = React.useState(new Date());
	const [showTime, setShowTime] = React.useState(false);

	React.useEffect(() => {
		const interval = showTime ? 1000 : 60000;
		const timer = setInterval(() => setCurrentDate(new Date()), interval);
		return () => clearInterval(timer);
	}, [showTime]);

	const formatDate = (date: Date) =>
		date.toLocaleDateString("en-GB", {
			weekday: "short",
			day: "numeric",
			month: "short",
			year: "numeric",
		});

	const formatTime = (date: Date) =>
		date
			.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
			.replace(" ", "")
			.toLowerCase();

	React.useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "";

		return () => {
			document.body.style.overflow = "";
		};
	}, [isMenuOpen]);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md transition-all duration-500",
				scrolled ? "py-1 shadow-2xl shadow-blue-900/5 bg-white/90" : "py-2"
			)}
		>
			<nav className="flex h-16 items-center px-4 md:px-8 gap-6 max-w-[1600px] mx-auto">

				{/* Logo */}
				<Link href="/" className="flex items-center gap-2 group">
					<div className="relative">
						<div className="absolute inset-0 bg-blue-600/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
						<Image
							src="/img/D_logo.svg"
							alt="Demand Teq"
							width={48}
							height={48}
							className="h-10 w-10 md:h-11 md:w-11 relative transform group-hover:scale-110 transition-transform duration-300"
							priority
						/>
					</div>
				</Link>

				{/* Desktop Nav */}
				<div className="hidden lg:flex items-center gap-2">
					<NavigationMenu>
						<NavigationMenuList className="space-x-2">

							<NavigationMenuLink asChild>
								<Link href="/" className={navItemClass}>Home</Link>
							</NavigationMenuLink>

							<NavigationMenuItem>
								<NavigationMenuTrigger
									className={cn(
										navItemClass,
										"!bg-transparent focus:!bg-transparent [&>svg]:!rotate-0"
									)}
								>
									Tech News
								</NavigationMenuTrigger>

								<NavigationMenuContent className="bg-transparent">
									<ul className="grid grid-cols-2 gap-2 rounded-2xl p-3 glass-premium shadow-2xl border-white/20 w-[400px]">
										{techNewsLinks.map((item) => (
											<li key={item.title}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuLink asChild>
								<Link href="/event" className={navItemClass}>Events</Link>
							</NavigationMenuLink>

							<NavigationMenuLink asChild>
								<Link href="/about-us" className={navItemClass}>About Us</Link>
							</NavigationMenuLink>

						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* Search & Date */}
				<div className="flex-1 flex items-center justify-end gap-4 max-w-xl ml-auto">
					<div className="relative hidden sm:block flex-1 group">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
						<Input
							type="search"
							placeholder="Search insights..."
							className="h-10 w-full rounded-full bg-slate-100/50 border-0 pl-11 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								onSearchChange?.(e.target.value);
							}}
						/>
					</div>

					<button
						onClick={() => setShowTime(!showTime)}
						className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:border-blue-500/30 hover:bg-slate-50 transition-all"
					>
						<div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
						{showTime ? formatTime(currentDate) : formatDate(currentDate)}
					</button>
				</div>

				{/* Action Buttons */}
				<div className="hidden md:flex items-center gap-3">
					<ShimmerButton text="Community" onClick={() => (window.location.href = "/community")} />
					<FlowButton2 text="Contact" onClick={() => (window.location.href = "/contact-us")} />
				</div>

				{/* Mobile Toggle */}
				<Button
					size="icon"
					variant="ghost"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="md:hidden ml-auto hover:bg-slate-100 rounded-xl"
				>
					<MenuToggleIcon open={isMenuOpen} className="size-5" />
				</Button>
			</nav>

			<BannerScroller />

			<MobileMenu open={isMenuOpen}>
				<div className="flex flex-col gap-4 p-4">
					<Link href="/" className="text-xl font-bold p-2 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
					<Link href="/tech" className="text-xl font-bold p-2 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Tech News</Link>
					<Link href="/event" className="text-xl font-bold p-2 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Events</Link>
					<Link href="/about-us" className="text-xl font-bold p-2 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</Link>
					<div className="pt-4 border-t border-slate-100 mt-4">
						<ShimmerButton text="Join Community" className="w-full justify-center" onClick={() => (window.location.href = "/community")} />
					</div>
				</div>
			</MobileMenu>
		</header>
	);
}

/* ---------------------------------- */
/* Mobile Menu */
/* ---------------------------------- */
function MobileMenu({ open, children }: { open: boolean; children: React.ReactNode }) {
	if (!open) return null;
	return createPortal(
		<div className="fixed inset-0 top-14 bg-white/95 text-black z-40 p-4 md:hidden">
			{children}
		</div>,
		document.body
	);
}

/* ---------------------------------- */
/* Dropdown Item */
/* ---------------------------------- */
function ListItem({ title, href, icon: Icon, description }: LinkItem) {
	return (
		<a href={href} className="flex gap-3 p-2 rounded-md hover:bg-[#1e3a8a]/10 transition-colors duration-200">
			<div className="h-10 w-10 flex items-center justify-center border border-black/10 rounded-md bg-transparent">
				<Icon className="h-5 w-5 text-black" />
			</div>
			<div>
				<div className="font-semibold text-black">{title}</div>
				{description && <p className="text-xs text-black/70">{description}</p>}
			</div>
		</a>
	);
}

/* ---------------------------------- */
/* Data */
/* ---------------------------------- */
const techNewsLinks: LinkItem[] = [
	{ title: "Trending Topics", href: "/tech", icon: Flame },
	{ title: "FinTeq", href: "/tech/finteq", icon: Wallet },
	{ title: "CXTeq", href: "/tech/cxteq", icon: Headphones },
	{ title: "HRTeq", href: "/tech/hrteq", icon: UserCog },
	{ title: "MarTeq", href: "/tech/marteq", icon: Megaphone },
];

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);
	React.useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > threshold);
		window.addEventListener("scroll", onScroll);
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, [threshold]);
	return scrolled;
}
