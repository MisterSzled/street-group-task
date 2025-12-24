

import { startMocks } from '@/_config/msw/setup';
import { ReactNode, useEffect, useState } from 'react';

export default function Msw({ children }: { children: ReactNode }) {
        const [ready, setReady] = useState(!__DEV__);

        useEffect(() => {
                startMocks().then(() => setReady(true))
        }, []);

        if (!ready) return null;
        return <>
                {children}
        </>
}