import React from 'react';
import { FontAwesome5 as Icon } from '@expo/vector-icons'; // Colocando o "as" e depois um "nome", acaba renomeando a extensão.
import { Text, StyleSheet } from 'react-native';
import { GamePlatform } from './types';
import { RectButton } from 'react-native-gesture-handler';

type Props = {
    platform: GamePlatform;
    onChange: (platform: GamePlatform) => void;
    icon: string;
    activePlatform?: GamePlatform; // ?: Prop opcional, nesse caso quando iniciamos a aplicação, não temos nenhuma plataforma selecionada.
}

const PlatformCard = ({
    platform,
    onChange,
    icon,
    activePlatform
} : Props) => {

    const isActive = platform === activePlatform;
    const backgroundColor = isActive ? '#fad7c8' : '#FFF';
    const textColor = isActive ? '#ED7947' : '#9E9E9E';

    return (
        <RectButton 
            style={[styles.platformCard, { backgroundColor }]} // Como a chave e o valor é o mesmo, no js podemos omitir o valor, deixando uma coisa só.
            onPress={() => onChange(platform)}
        >
            <Icon name={icon} size={60} color={textColor} />
            <Text style={[styles.platformCardText, { color: textColor }]}>
                {platform === 'PLAYSTATION' ? 'PS' : platform }
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    platformCard: {
      paddingTop: 30,
      paddingBottom: 20,
      width: '30%',
      backgroundColor: '#FFF',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    platformCardText: {
      marginTop: 40,
      color: '#9E9E9E',
      fontSize: 24,
      fontFamily: "Play_700Bold",
      textAlign: 'center'
    },
  });

export default PlatformCard;