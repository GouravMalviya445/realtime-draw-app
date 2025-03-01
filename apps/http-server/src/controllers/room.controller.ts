import { requestHandler, ApiError, ApiResponse } from "@repo/be-common/src/utils";

const createRoom = requestHandler(async (req, res) => {
  try {
    // db calls  
  } catch (error: any) {
    throw new ApiError(500, "Error while creating room", [], error.stack)
  }
})