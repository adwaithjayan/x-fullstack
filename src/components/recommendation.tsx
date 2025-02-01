import React from 'react'
import Link from "next/link";
import Image from "@/components/image";
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/prisma';

const Recommendation =async () => {
      const {userId} = await auth();
      if(!userId) return ;
      const followingIds =await prisma.follow.findMany({
            where:{followerId:userId},
            select:{followingId:true}
      });

      const followedUserIds =followingIds.map((follow)=>follow.followingId);

      const friendsRecomandations =await prisma.user.findMany({
            where:{
                  id:{not:userId,notIn:followedUserIds},
                  followings:{some:{followerId:{in:followedUserIds}}},
                  
            },
            take:3,
            select:{
                  id:true,
                  displayName:true,
                  username:true,
                  img:true,
            }
      })
      return (
          <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">

                {/* USER CARD */}
            {friendsRecomandations.map((friend)=>
                <div className='flex items-center justify-between' key={friend.id}>
                      {/* IMAGE AND USER INFO */}
                      <div className='flex items-center gap-2'>
                            <div className='relative rounded-full overflow-hidden w-10 h-10'>
                                  <Image path={friend.img || "general/avatar.png"} alt={friend.username} w={100} h={100} tr={true}/>
                            </div>
                            <div className=''>
                                  <h1 className="text-md font-bold">{friend.displayName || friend.username}</h1>
                                  <span className="text-textGray text-sm">@{friend.username}</span>
                            </div>
                      </div>
                      {/* BUTTON */}
                      <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">Follow</button>
                </div>
                )}
                <Link href="/" className="text-iconBlue">
                      Show More
                </Link>
          </div>

      )
}
export default Recommendation
