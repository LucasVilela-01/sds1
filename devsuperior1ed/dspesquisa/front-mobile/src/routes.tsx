import React from 'react';

import { NavigationContainer } from '@react-navigation/native'; // NavigationContainer terá o mesmo comportamento que o browserRouter do React para web.
// agrupa todas as rotas da navegação e gerencia elas.

import { createStackNavigator } from '@react-navigation/stack'; // Como o próprio nome diz, ele cria uma pilha de navegação.
// Como se o usuário na medida que interage com o app, caso ele avança uma página e queira voltar, é possível redirecionar o usuário para a página que estava anteriormente.
// É um histórico de navegação.

const Stack = createStackNavigator();

import Home from './pages/Home';
import CreateRecord from './pages/CreateRecord';

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#0B1F34',
                    }
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CreateRecord" component={CreateRecord} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Routes;