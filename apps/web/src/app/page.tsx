// "use client";
import { LandingPage } from "@/components/LandingPage";
import { apiClient } from "@/lib/apiClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function isAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) {
    return false;
  }
  try {
    const res = await apiClient.get("/users/current-user", {
      headers: {
        "Cookie": `accessToken=${token}`
      }
    });
    if (res.data.success) {
      return true;
    } else {
      return false
    }
  } catch (error) {
    console.log("Error while getting current user", error);
    return false;
  }
}

export default async function Home() {
  const isAuth = await isAuthenticated();
  if (isAuth) {
    return redirect("/rooms/create");
  }
  return (
    <LandingPage /> 
  )
}