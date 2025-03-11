"use client";

import { useState } from "react";
import {
	Menu,
	Plus,
	ListFilter,
	Diamond,
	HelpCircle,
	Clock,
	Settings,
	Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Main() {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	return (
		<div className="fixed inset-0 flex bg-black text-white">
			{/* Sidebar */}
			<div
				className={`${sidebarOpen ? "w-[344px]" : "w-20"} flex-shrink-0 bg-[#0f0f0f] border-r border-[#2a2a2a] flex flex-col overflow-hidden transition-all duration-300`}
			>
				<div className="p-4">
					<Button
						variant="ghost"
						size="icon"
						className="h-10 w-10"
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						<Menu className="h-5 w-5" />
					</Button>
				</div>

				<div className="px-4 py-2">
					<Button
						variant="ghost"
						className={`w-full justify-start gap-3 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white ${!sidebarOpen && "justify-center"}`}
					>
						<Plus className="h-5 w-5" />
						{sidebarOpen && <span>New chat</span>}
					</Button>
				</div>

				<div className="mt-6 px-4">
					<h3
						className={`text-sm font-medium mb-2 ${!sidebarOpen && "hidden"}`}
					>
						Recent
					</h3>
					<Button
						variant="ghost"
						className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] ${!sidebarOpen && "justify-center"}`}
					>
						<ListFilter className="h-5 w-5 flex-shrink-0" />
						{sidebarOpen && (
							<span className="truncate text-left">Example Story 1</span>
						)}
					</Button>
				</div>

				<div className="mt-auto px-4 py-4 space-y-1">
					<Button
						variant="ghost"
						className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] relative ${!sidebarOpen && "justify-center"}`}
					>
						<HelpCircle className="h-5 w-5" />
						{sidebarOpen && <span>Help</span>}
					</Button>
					<Button
						variant="ghost"
						className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] ${!sidebarOpen && "justify-center"}`}
					>
						<Clock className="h-5 w-5" />
						{sidebarOpen && <span>Activity</span>}
					</Button>
					<Button
						variant="ghost"
						className={`w-full justify-start gap-3 py-2 text-[#e0e0e0] hover:bg-[#2a2a2a] relative ${!sidebarOpen && "justify-center"}`}
					>
						<Settings className="h-5 w-5" />
						{sidebarOpen && <span>Settings</span>}
					</Button>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 flex flex-col overflow-hidden h-full">
				{/* Header */}
				<header className="flex items-center justify-between px-4 py-2 border-b border-[#2a2a2a]">
					<div className="flex items-center">
						<span className="text-xl font-medium">Endless Odyssey</span>
					</div>

					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon" className="h-10 w-10">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="3"
									y="3"
									width="7"
									height="7"
									rx="1"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<rect
									x="14"
									y="3"
									width="7"
									height="7"
									rx="1"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<rect
									x="3"
									y="14"
									width="7"
									height="7"
									rx="1"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<rect
									x="14"
									y="14"
									width="7"
									height="7"
									rx="1"
									stroke="currentColor"
									strokeWidth="2"
								/>
							</svg>
						</Button>
						<Button className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium">
							X
						</Button>
					</div>
				</header>

				{/* Chat area */}
				<div className="flex-1 flex flex-col items-center justify-center p-4 overflow-auto">
					<h1 className="text-4xl font-medium">
						<span className="bg-gradient-to-r from-[var(--gradient-5)] to-[var(--gradient-6)] bg-clip-text text-transparent">
							Hello,
						</span>
						<span className="bg-gradient-to-r from-[var(--gradient-6)] to-[var(--gradient-7)] bg-clip-text text-transparent">
							{" "}
							(Insert Name Here)
						</span>
					</h1>
				</div>

				{/* Input area */}
				<div className="p-4 flex justify-center">
					<div className="relative w-full max-w-3xl">
						<div className="flex items-center rounded-full border border-[#444] bg-[#1e1e1e] px-4 py-3">
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 rounded-full"
							>
								<Plus className="h-5 w-5" />
							</Button>
							<input
								type="text"
								placeholder="Start an Odyssey"
								className="flex-1 bg-transparent border-none outline-none px-3 text-white placeholder-gray-400"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
