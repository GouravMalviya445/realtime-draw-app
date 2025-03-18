"use client";
import { ArrowBigRight, FlagTriangleRight, Search, SeparatorHorizontal } from "lucide-react";
import { Input } from "./Input";
import { TopBar } from "./TopBar";
import { Button } from "./Button";
import Link from "next/link";
import { useRooms } from "@/hooks/useRooms";
import { useState } from "react";

interface Room{
  id: number;
  slug: string;
  createdAt: Date;
}

export function Dashboard() {
  const { rooms, loading } = useRooms();
  const [query, setQuery] = useState("");

  const filteredRooms = rooms.filter((room: Room) => room.slug.includes(query.toLowerCase()))
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TopBar />
      <div className="relative mb-6 w-full">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-500/90"><Search /></span>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search for room" inputClassName="w-full pl-10 py-2" />
      </div>

      {/* container of rooms */}
      <div className="flex flex-col space-y-2">
        {loading ? <p>loading...</p> : (
          filteredRooms.map((room: Room) => <RoomCard key={room.id} createdAt={room.createdAt} roomName={room.slug} roomId={room.id} />)
        )}
      </div>
    </div>
  )
}


export function RoomCard({ roomId, roomName, createdAt }: { roomId: number, roomName: string, createdAt: Date}) {

  return (
    <div className="p-3 flex items-center hover:bg-gray-200/60 transition duration-200 ease-in rounded-xl">
      <div className="flex flex-1 items-center gap-5">
          <span className="text-gray-500"><FlagTriangleRight size={18} /></span>
        <div className="flex flex-col">
          <Link href={`/canvas/${roomId}`}>
            <Button variant="link">{roomName}</Button>
          </Link>
          <span className="text-gray-500 text-[12px] px-1">{ new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>      
      <div className="hidden sm:block">
        <Link href={`/canvas/${roomId}`}>
          <Button size="sm" className="text-sm" endIcon={<ArrowBigRight size={18}/>} variant="primary">Join</Button>
        </Link>
      </div>
    </div>
  )  
}