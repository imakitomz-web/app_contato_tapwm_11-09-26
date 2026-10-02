// app/contatos/novo.js 

import { View } from 'react-native'; 

import { useRouter } from 'expo-router'; 

import FormContato from '../../components/FormContato'; 

import api from '../../lib/api'; 

import { estilos } from '../../styles/estilos'; 

 

export default function NovoContato() { 

  const router = useRouter(); 

 

  const salvar = async (dados) => { 

    await api.post('/contatos', dados); 

    router.back(); 

  }; 

 

  return ( 

    <View style={estilos.container}> 

      <FormContato onSubmit={salvar} /> 

    </View> 

  ); 

} 