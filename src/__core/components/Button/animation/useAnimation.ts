import { useMemo } from "react";
import { animations } from "./animations/index";

export const useAnimation = (animation: "bounce") => {
        return useMemo(() => {
                switch (animation) {
                        case "bounce":
                                return animations.bounce();
                        default:
                                return animations.bounce();
                }
        }, [animation])
}