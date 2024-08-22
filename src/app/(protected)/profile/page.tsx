import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

import {getUsers} from "~/hooks/api/user";
import Profile from "~/app/(protected)/profile/Profile";
import getQueryClient from "~/lib/react-query";

const ProfilePage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["hydrate-users"],
    queryFn: getUsers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Profile />
    </HydrationBoundary>
  );
};

export default ProfilePage;
