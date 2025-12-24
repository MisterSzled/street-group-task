import { RootProps } from "../types";
import AnimatedButton from "./AnimatedButton";
import { Button } from "./Button";

export const Root = ({ animation = null, ...props }: RootProps) => {
        if (animation) {
                return <AnimatedButton animation={animation} {...props} />;
        }

        return <Button {...props} />;
};

export default Root;

