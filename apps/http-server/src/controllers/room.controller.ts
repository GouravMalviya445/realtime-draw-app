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

const getRoomChats = requestHandler(async (req, res) => { 
  const roomId = req.params?.roomId;
  if (!roomId) {
    throw new ApiError(400, "Room id not found");
  }

  try {
    const chats = await prisma.chat.findMany({
      where: {
        roomId: parseInt(roomId)
      },
      orderBy: {
        id: "desc"
      },
      take: 50
    })

    if (!chats) {
      throw new ApiError(404, "Chats not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(
        200,
        "Chats successfully feched",
        { chats }
      ))
  } catch (err: any) {
    throw new ApiError(500, err.message || "Error while getting the chats", [], err.stack || "")
  }
  
})

const getRoom = requestHandler(async (req, res) => {
  const slug = req.params?.slug;
  if (!slug?.trim()) {
    throw new ApiError(400, "Slug is required");
  }

  const filteredSlug = slug.toLowerCase().split(" ").join("-")

  try {
    const room = await prisma.room.findUnique({
      where: { slug:  filteredSlug}
    });
    if (!room) {
      throw new ApiError(404, `Room with slug: ${filteredSlug} is not find`);
    }

    return res
      .status(200)
      .json(new ApiResponse(
        200,
        "Room fetched successfully",
        { room }
      ));
  } catch (err: any) {
    throw new ApiError(500, err.message || "Something went wrong while fetching the room");
  }
})

export {
  createRoom,
  getRoomChats,
  getRoom
}