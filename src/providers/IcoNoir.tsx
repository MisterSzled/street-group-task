
import { IconoirProvider } from 'iconoir-react-native';
import { ReactNode } from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function IconoirRoot({ children }: { children: ReactNode }) {
        const { theme } = useUnistyles();

        return <IconoirProvider iconProps={{
                color: theme.colors.neutral_content,
                strokeWidth: theme.tokens.icon.stroke_width.md,
                width: theme.tokens.icon.sizes.lg,
                height: theme.tokens.icon.sizes.lg,
        }}>
                {children}
        </IconoirProvider>
}