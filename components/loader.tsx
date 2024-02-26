import Image from "next/image";
interface Props {
  message?: string;
  waitingMessage?: boolean;
}
const Loader = ({ message, waitingMessage }: Props) => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" src="/logo.svg" fill />
      </div>
      <p className="text-sm text-muted-foreground">
        {message || "Intellecta is thinking ..."}
        {waitingMessage && (
          <p className="text-[10px]">
            Sometimes it can take up to 20 minutes due to rate limitations and
            cold start.
          </p>
        )}
      </p>
    </div>
  );
};

export default Loader;
