"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { toast } from "react-toastify";

export default function CreateRoom() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
      defaultValues: {
        roomName: ""
      }
    });
  
    const createRoom = handleSubmit(async (data) => {
      setLoading(true);
      try {
        const slug = data.roomName.split(" ").join("-");
        const res = await apiClient.post(`/rooms/create-room`, {
          name: slug
        });

        
        if (res.data.statusCode === 201) {
          setLoading(false);
          toast.success(res.data.message);
          reset({roomName: ""})
          router.push(`/rooms/${slug}`)
        }
      } catch (err: any) {
        setTimeout(() => { 

          setLoading(false);
        }, 2000)
        if (err.response.data.statusCode === 500) {
          toast.error(err.response.data.message || "Internal server error")
        }
        if (err.response.data.statusCode === 401) {
          toast.error(err.response.data.message || "User Unauthorized please first login")
        }
      }
    });
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-10">
        <div className="w-full sm:w-xl lg:w-md shadow-lg p-6 rounded-xl">
          <h1 className="text-3xl font-bold text-center mb-10">Create Room</h1>
          <form onSubmit={createRoom} className="flex flex-col gap-5">
            <Input
              labelClassName="text-base sm:text-lg lg:tex-xl"
              containerClassName="flex justify-between"
              inputClassName="w-2/3"
              label="Room Name" type="text"
              {...register("roomName", {
                required: "Room is required please enter any name",
                minLength: {
                  value: 3,
                  message: "roomName must be at least 3 char"
                },
                maxLength: {
                  value: 50,
                  message: "roomName must be at least 50 char"
                }
              })}
            />
            
            {errors.roomName && <p className="text-red-500 text-center text-sm">{ errors.roomName.message }</p>}
            <Button type="submit" className={loading ? "pointer-events-none opacity-70 cursor-not-allowed" : ""}>
              {loading ? "Creating..." : "Create Room"}
            </Button>
          </form>
        </div>
      </div>
    );
}