import { render } from '@testing-library/react-native';

import Index from '@src/app/index.tsx';

describe('./index.tsx', () => {
        test('Text renders correctly on HomeScreen', () => {
                const { getByText } = render(<Index />);

                getByText('Welcome');
        });
});
