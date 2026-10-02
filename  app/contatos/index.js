// app/contatos/index.js 

import { useCallback, useState } from 'react'; 

import { View, Text, Button, FlatList, Image, TouchableOpacity, Alert } from 'react-native'; 

import { useRouter, useFocusEffect } from 'expo-router'; 

import api from '../../lib/api'; 

import { estilos } from '../../styles/estilos'; 

 

export default function ListaContatos() { 

  const [contatos, setContatos] = useState([]); 

  const router = useRouter(); 

 

  const carregar = async () => { 

    try { 

      const { data } = await api.get('/contatos'); 

      setContatos(data); 

    } catch (err) { 

      Alert.alert('Erro ao carregar contatos'); 

    } 

  }; 

 

  const excluir = async (id) => { 

    try { 

      await api.delete(`/contatos/${id}`); 

      carregar(); 

    } catch (e) { 

      Alert.alert('Erro ao excluir'); 

    } 

  }; 

 

  useFocusEffect( 

    useCallback(() => { 

      carregar(); 

    }, []) 

  ); 

 

  return ( 

    <View style={estilos.container}> 

      <Button title="Novo contato" onPress={() => router.push('/contatos/novo')} /> 

 

      <FlatList 

        data={contatos} 

        keyExtractor={(item) => String(item.id)} 

        renderItem={({ item }) => ( 

          <TouchableOpacity onPress={() => router.push(`/contatos/${item.id}`)} style={{ paddingVertical: 8 }}> 

            <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text> 

            {item.foto ? ( 

              <Image 

                source={{ uri: `http://SEU_BACKEND:3000/uploads/${item.foto}` }} 

                style={{ width: 100, height: 100, marginVertical: 6 }} 

              /> 

            ) : null} 

            <Button title="Excluir" onPress={() => excluir(item.id)} /> 

          </TouchableOpacity> 

        )} 

      /> 

    </View> 

  ); 

} 