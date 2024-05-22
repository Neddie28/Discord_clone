import { Server, Member, Profile } from "@prisma/client";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Server as NetServer, Socket } from "net";

export type serverWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
    socket : Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};