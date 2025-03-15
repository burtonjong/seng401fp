import { Button } from "@/components/ui/button";

export default function HomeHeader() {
  return (
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
  );
}
