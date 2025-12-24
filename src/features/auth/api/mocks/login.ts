import { HTTP_STATUS } from "@/src/api/http/codes";
import { HandlerContext, mock } from "@/src/api/mock/factory";
import { LoginRequest } from "../../schema";

export const login = {
        delay: 1200,
        handler: async (context: HandlerContext) => {
                const { username, password } = await context.request.json() as LoginRequest;
                if (username === "demo" && password === "demo") {
                        return {
                                token: "demo",
                                userId: "demo",
                                username: "Demoman"
                        }
                }
        
                return mock.error(HTTP_STATUS.UNAUTHORIZED, "User not found or authorized");
        }
};