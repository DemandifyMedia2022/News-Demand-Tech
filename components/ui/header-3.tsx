"use client";

import React from "react";
import Image from "next/image";
import { Button, FlowButton } from "@/components/ui/button";
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
	const [open, setOpen] = React.useState(false);
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
		document.body.style.overflow = open ? "hidden" : "";

		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-white/95 backdrop-blur-sm transition-all",
				scrolled && "shadow-lg"
			)}
		>
			<nav className="flex h-18 items-center px-3 md:px-6 gap-4">

				{/* Logo */}
				<a href="/" className="flex items-center gap-2">
					<Image
						src="/img/D_logo.png"
						alt="Demand Teq"
						width={48}
						height={48}
						className="h-10 w-10 md:h-12 md:w-12"
						priority
					/>
				</a>

				{/* Date / Time */}
				<div className="flex-1 flex justify-center">
					<button
						onClick={() => setShowTime(!showTime)}
						className="group rounded-full border border-black/20 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm px-4 py-2 text-sm font-medium text-black/80 hover:border-black/30 hover:bg-gradient-to-r hover:from-white hover:to-white/90 hover:text-black hover:shadow-md transition-all duration-300"
					>
						<span className="flex items-center gap-2">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							{showTime ? formatTime(currentDate) : formatDate(currentDate)}
						</span>
					</button>
				</div>

				{/* Desktop Nav */}
				<div className="hidden md:flex items-center gap-6">
					<NavigationMenu>
						<NavigationMenuList className="space-x-5">

							<NavigationMenuLink asChild>
								<a href="/" className={navItemClass}>Home</a>
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
									<ul className="grid grid-cols-2 gap-2 rounded-xl p-2 shadow-lg shadow-black/10">
										{techNewsLinks.map((item) => (
											<li key={item.title}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuLink asChild>
								<a href="/event" className={navItemClass}>Events</a>
							</NavigationMenuLink>

							<NavigationMenuLink asChild>
								<a href="/about-us" className={navItemClass}>About-Us</a>
							</NavigationMenuLink>

						</NavigationMenuList>
					</NavigationMenu>

					{/* Search */}
					<div className="relative hidden lg:block">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/60" />
						<Input
							type="search"
							placeholder="Search blogs..."
							className="h-9 rounded-full bg-black/10 border border-black/10 pl-9 text-slate-900 placeholder:text-black/60"
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								onSearchChange?.(e.target.value);
							}}
						/>
					</div>
				</div>

				{/* Buttons */}
				<div className="hidden md:flex gap-2">
					<FlowButton text="Community" onClick={() => (window.location.href = "/community")} />
					<FlowButton2 text="Contact Us" onClick={() => (window.location.href = "/contact-us")} />
				</div>

				{/* Mobile Toggle */}
				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden ml-auto"
				>
					<MenuToggleIcon open={open} className="size-5" />
				</Button>
			</nav>

			<BannerScroller />

			<MobileMenu open={open}>
				<a href="/" className="p-2 text-black">Home</a>
				<a href="/tech" className="p-2 text-black">Tech News</a>
				<a href="/event" className="p-2 text-black">Events</a>
				<a href="/about-us" className="p-2 text-black">About Us</a>
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
