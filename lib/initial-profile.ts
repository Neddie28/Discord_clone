import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialProfile = async () => {
    const user = await currentUser();

    if(!user) {
        redirectToSignIn();
    }

    const profile =  await db.profile.findUnique({
        where: {
            userId: user?.id
        }
    });

    if(profile) {
        return profile;
    }

    const newProfile = await db.profile.create({
        data: {
            //@ts-ignore
            userId: user?.id,
            name: `${user?.firstName} ${user?.lastName}`,
            //@ts-ignore
            imageUrl: user?.imageUrl,
            //@ts-ignore
            email: user?.emailAddresses[0].emailAddress
        }
    })

    return newProfile;
   
}

