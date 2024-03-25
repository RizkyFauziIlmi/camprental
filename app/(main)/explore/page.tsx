import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./_components/logout-button";


export default async function ExplorePage() {
  const user = await useCurrentUser();

 

  return (
    <div>
      <p>{JSON.stringify(user, null, 2)}</p>
     <LogoutButton />
    </div>
  );
}
