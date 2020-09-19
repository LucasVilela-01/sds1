import React, { useEffect, useState } from 'react';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import { Text, StyleSheet, View, TextInput, Alert } from 'react-native'; // TextInput é uma caixa de texto onde o usuário pode colocar uma informação.
import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { Game, GamePlatform } from './types';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';

const placeholder = {
    label: 'Selecione o Game',
    value: null
}

const BASE_URL = 'http://192.168.0.2:8080';

const mapSelectValues = (games: Game[]) => {
    return games.map(game => ({
        ...game, // ... significa que temos tudo que tem no objeto "game", ou seja, a API mandou o id, platform e title, mantendo todos os objetos e atributos.
        label: game.title, // o que será exibido no select
        value: game.id
    }));
}
 
const CreateRecord = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [platform, setPlatform] = useState<GamePlatform>();
    const [selectedGame, setSelectedGame] = useState('');
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);

    const handleChangePlatform = (selectedPlatform : GamePlatform) => {
        setPlatform(selectedPlatform);
        const gamesByPlatform = allGames.filter(
            game => game.platform === selectedPlatform
        )
        setFilteredGames(gamesByPlatform);
    }

    const handleSubmit = () => {
        const payload = { name, age, gameId : selectedGame };

        axios.post(`${BASE_URL}/records`, payload)
            .then(() => {
                Alert.alert('Dados salvos com sucesso!');
                // Limpando as caixas preenchidas após o envio.
                setName('');
                setAge('');
                setSelectedGame('');
                setPlatform(undefined); // undefined - não tenho nenhuma plataforma selecionada.
            })
            // Caso a requisição der erro, mostrando ao usuário.
            .catch (() => Alert.alert('Erro ao salvar informações!')) // Esse catch captura erros que aconteceu na requisição.
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/games`)
            .then(response => {
                const selectValues = mapSelectValues(response.data); // A partir deste momento, pega a lista de games e para cada um ele atribui um label e value.
                setAllGames(selectValues);
            })
            .catch (() => Alert.alert('Erro ao listar os jogos!'))
    }, []);

    return (
        <>
            <Header />
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputText}
                    placeholder="Nome"
                    placeholderTextColor="#9E9E9E"
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <TextInput
                    keyboardType="numeric"
                    style={styles.inputText}
                    placeholder="Idade"
                    placeholderTextColor="#9E9E9E"
                    maxLength={2}
                    onChangeText={text => setAge(text)}
                    value={age}
                />
                <View style={styles.platformContainer}>
                    <PlatformCard 
                        platform="PC"
                        icon="laptop"
                        onChange={handleChangePlatform}
                        activePlatform={platform}
                    />
                    <PlatformCard 
                        platform="XBOX"
                        icon="xbox"
                        onChange={handleChangePlatform}
                        activePlatform={platform}
                    />
                    <PlatformCard 
                        platform="PLAYSTATION"
                        icon="playstation"
                        onChange={handleChangePlatform}
                        activePlatform={platform}
                    />
                </View>
                <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                // onValueChange é para quando o usuário mudar o item no combo de opções, precisa armazenar o valor que o usuário selecionou em algum lugar. 
                    onValueChange={value => {
                        setSelectedGame(value)
                    }}
                    placeholder={placeholder}
                    value={selectedGame}
                    items={filteredGames}
                    style={pickerSelectStyles}
                    Icon={() => {
                        return <Icon name="chevron-down" color="#9E9E9E" size={25} />
                    }}
                />
                <View style={styles.footer}>
                    <RectButton style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>
                            SALVAR
                        </Text>
                    </RectButton>
                </View>
            </View>
        </>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      paddingRight: 30,
      fontFamily: "Play_700Bold",
      height: 50
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      paddingRight: 30,
      fontFamily: "Play_700Bold",
      height: 50
    },
    placeholder: {
      color: '#9E9E9E',
      fontSize: 16,
      fontFamily: "Play_700Bold",
    },
    iconContainer: {
      top: 10,
      right: 12,
    }
  })

const styles = StyleSheet.create({
    container: {
      marginTop: '15%',
      paddingRight: '5%',
      paddingLeft: '5%',
      paddingBottom: 50
    },
    inputText: {
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      fontFamily: "Play_700Bold",
      fontSize: 16,
      paddingLeft: 20,
      marginBottom: 21
    },
    platformContainer: {
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footer: {
      marginTop: '15%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#00D4FF',
      flexDirection: 'row',
      borderRadius: 10,
      height: 60,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      fontFamily: "Play_700Bold",
      fontWeight: 'bold',
      fontSize: 18,
      color: '#0B1F34',
    }
  });
  

export default CreateRecord;