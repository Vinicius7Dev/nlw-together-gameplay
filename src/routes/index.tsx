import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

import AppRoutes from './app.routes';
import SignIn from '../screens/SignIn';

const Routes: React.FC = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {
                user.id ? <AppRoutes /> : <SignIn />
            }
        </NavigationContainer>
    );
}

export default Routes;