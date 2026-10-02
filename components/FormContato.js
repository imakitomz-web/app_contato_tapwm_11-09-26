// components/FormContato.js 

import { useState } from 'react'; 

import { View, TextInput, Button, Image } from 'react-native'; 

import * as ImagePicker from 'expo-image-picker'; 

import api from '../lib/api'; 

import { estilos } from '../styles/estilos'; 

 

export default function FormContato({ valores, onSubmit }) { 

  const [nome, setNome] = useState(valores?.nome || ''); 

  const [email, setEmail] = useState(valores?.email || ''); 

  const [telefone, setTelefone] = useState(valores?.telefone || ''); 

  const [endereco, setEndereco] = useState(valores?.endereco || ''); 

  const [foto, setFoto] = useState(valores?.foto || ''); 

 

  const escolherImagem = async () => { 

    const resultado = await ImagePicker.launchImageLibraryAsync({ 

      mediaTypes: ImagePicker.MediaTypeOptions.Images, 

      quality: 0.8, 

    }); 

 

    if (!resultado.canceled && resultado.assets?.length > 0) { 

      const file = resultado.assets[0]; 

      const form = new FormData(); 

      form.append('foto', { 

        uri: file.uri, 

        name: file.fileName || 'imagem.jpg', 

        type: file.mimeType || 'image/jpeg', 

      }); 

 

      const res = await api.post('/upload', form, { 

        headers: { 'Content-Type': 'multipart/form-data' }, 

      }); 

      setFoto(res.data.nomeArquivo); 

    } 

  }; 

 

  const enviar = () => { 

    onSubmit({ nome, email, telefone, endereco, foto }); 

  }; 

 

  return ( 

    <View> 

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={estilos.input} /> 

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={estilos.input} autoCapitalize="none" /> 

      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={estilos.input} /> 

      <TextInput placeholder="Endereço" value={endereco} onChangeText={setEndereco} style={estilos.input} /> 

 

      <Button title="Selecionar imagem" onPress={escolherImagem} /> 

      {foto ? ( 

        <Image source={{ uri: `http://SEU_BACKEND:3000/uploads/${foto}` }} style={{ width: 100, height: 100, marginVertical: 6 }} /> 

      ) : null} 

 

      <Button title="Salvar" onPress={enviar} /> 

    </View> 

  ); 

} 