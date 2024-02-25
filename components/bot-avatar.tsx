import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "./ui/avatar";

const BotAvatar = () => {
  const { user } = useUser();
  return (
    <div>
      <Avatar className="h-8 w-8">
        <AvatarImage className="p-1" src="/logo.svg" />
      </Avatar>
    </div>
  );
};

export default BotAvatar;
