export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center"></div>
      <h1 className="sr-only">Endless Odyssey</h1>
      <h2 className="font-bold text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        {" "}
        Endless Odyssey
      </h2>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
