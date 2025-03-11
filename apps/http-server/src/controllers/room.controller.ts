import { requestHandler, ApiError, ApiResponse } from "@repo/be-common/src/utils";
import { createRoomValidation } from "@repo/common/zod"
import { prisma } from "@repo/db/prisma";

const createRoom = requestHandler(async (req, res) => {
  const { success, data, error } = createRoomValidation.safeParse(req.body);
  if (!success) {
    throw new ApiError(400, "Invalid inputs", error.errors, error.stack);
  }

  try {
    // slugify the name and store the slug
    const slug = data.name.split(" ").join("-").toLowerCase().trim();
    
    // db calls  
    // check room exist
    const existingRoom = await prisma.room.findUnique({
      where: { slug }
    })
    if (existingRoom) {
      throw new ApiError(400, "Room with this name is already exist");
    }

    // create new room
    const newRoom = await prisma.room.create({
      data: {
        slug,
        adminId: req?.user?.id as string
      }
    })

    return res
      .status(201)
      .json(new ApiResponse(
        201,
        "Room is successfully created",
        { room: newRoom }
      ))


  } catch (error: any) {
    throw new ApiError(500, error.message || "Error while creating room", [], error.stack)
  }
})

export {
  createRoom,
}