// app/cadastro.js 

import { useState } from 'react'; 

import { View, TextInput, Button, Alert } from 'react-native'; 

import { useRouter } from 'expo-router'; 

import api from '../lib/api'; 

import { estilos } from '../styles/estilos'; 

 

export default function Cadastro() { 

  const [nome, setNome] = useState(''); 

  const [email, setEmail] = useState(''); 

  const [senha, setSenha] = useState(''); 

  const router = useRouter(); 

 

  const cadastrar = async () => { 

    try { 

      await api.post('/usuarios/registrar', { nome, email, senha }); 

      Alert.alert('Cadastro realizado'); 

      router.replace('/'); 

    } catch (e) { 

      Alert.alert('Erro no cadastro'); 

    } 

  }; 

 

  return ( 

    <View style={estilos.container}> 

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={estilos.input} /> 

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={estilos.input} autoCapitalize="none" /> 

      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={estilos.input} /> 

      <Button title="Cadastrar" onPress={cadastrar} /> 

    </View> 

  ); 

} 