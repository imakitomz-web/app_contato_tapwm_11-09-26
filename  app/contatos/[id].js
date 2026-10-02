// app/contatos/[id].js 

import { useEffect, useState } from 'react'; 

import { View, ActivityIndicator } from 'react-native'; 

import { useLocalSearchParams, useRouter } from 'expo-router'; 

import FormContato from '../../components/FormContato'; 

import api from '../../lib/api'; 

import { estilos } from '../../styles/estilos'; 

 

export default function EditarContato() { 

  const { id } = useLocalSearchParams(); 

  const contatoId = Array.isArray(id) ? id[0] : id; // garante string 

  const [contato, setContato] = useState(null); 

  const router = useRouter(); 

 

  useEffect(() => { 

    const fetchData = async () => { 

      const { data } = await api.get(`/contatos/${contatoId}`); 

      setContato(data); 

    }; 

    fetchData(); 

  }, [contatoId]); 

 

  const atualizar = async (dados) => { 

    await api.put(`/contatos/${contatoId}`, dados); 

    router.back(); 

  }; 

 

  if (!contato) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />; 

 

  return ( 

    <View style={estilos.container}> 

      <FormContato valores={contato} onSubmit={atualizar} /> 

    </View> 

  ); 

} 