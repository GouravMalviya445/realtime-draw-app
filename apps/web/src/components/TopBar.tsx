import Link from "next/link";
import { Button } from "./Button";
import { Plus } from "lucide-react";

export function TopBar() {

  return (
    
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rooms</h1>
        <p className="text-gray-500 mt-1">Join room or create a new room</p>
      </div>
        <Link href="/rooms/create">
          <Button size="md" variant="secondary" startIcon={<Plus size={19}/>}>
            Create Room
          </Button>
        </Link>
    </div>
  
  )
}