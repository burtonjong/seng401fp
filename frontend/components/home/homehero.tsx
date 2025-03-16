interface HomeHeroProps {
  username: string;
}

export default function HomeHero({ username }: HomeHeroProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-auto">
      <h1 className="text-4xl font-medium">
        <span className="bg-gradient-to-r from-[var(--gradient-5)] to-[var(--gradient-6)] bg-clip-text text-transparent">
          Hello,
        </span>
        <span className="bg-gradient-to-r from-[var(--gradient-6)] to-[var(--gradient-7)] bg-clip-text text-transparent">
          {" "}
          {username}
        </span>
      </h1>
    </div>
  );
}
