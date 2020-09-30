import { PlatformAndroidStatic } from "react-native";

export type GamePlatform = 'XBOX' | 'PC' | 'PLAYSTATION';


export type Game = { // label é o que aparece para o usuário e o value é o que mandamos para a API.
    id: number;
    title: string;
    platform: GamePlatform;
    label: string;
    value: number;
}