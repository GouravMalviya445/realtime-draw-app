"use client";
import { Form, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { config } from "@/config";
import { apiClient } from "@/lib/apiClient";

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
        // const res = await apiClient.post(`/rooms/create-room`, {
        //   name: slug
        // });
  
        // if (res.data.status === 200) {
        //   setLoading(false);
          router.push(`/rooms/${slug}`)
          reset({roomName: ""})
        // }
      } catch (err: any) {
        setLoading(false);
      }
    });
  
    return (
      <div style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeContent: "center"
      }}>
        <form onSubmit={createRoom}>
          <label htmlFor="roomName">
            <input type="text" {...register("roomName", {
              required: "please provide any name",
              minLength: {
                value: 3,
                message: "roomName must be at least 3 char"
              },
              maxLength: {
                value: 50,
                message: "roomName must be at least 50 char"
              }
            })} />
          </label>
          <button>Create Room</button>
          {errors.roomName && <p>{ errors.roomName.message }</p>}
        </form>
      </div>
    );
}