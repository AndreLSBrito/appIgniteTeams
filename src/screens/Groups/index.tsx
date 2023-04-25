import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, Alert } from 'react-native';


import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import {Container}  from './styles';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { GroupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';



export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups,setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup(){
    navigation.navigate('new')
  }

  async function fetchGroups(){
    try {
      setIsLoading(true);
      const data = await GroupsGetAll();
      setGroups(data);
      

    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregar as turnmas');
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpengroup(group:string){
    navigation.navigate('players', {group});
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      
      <Highlight 
        title='Turmas'
        subtitle='jogue com a sua turma'
      />

      {
        isLoading ? <Loading/> :
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <GroupCard 
              title={item}
              onPress={() => handleOpengroup(item)}
            /> 
          )}
          contentContainerStyle={groups.length ===0 && {flex:1}}
          ListEmptyComponent={()=> (
            <ListEmpty message="Que tal cadastrar a primeira turma?"/>
          )}
          showsVerticalScrollIndicator={false}
        />
      }
      

       <Button 
        title="Criar nova turma"
        onPress={handleNewGroup}
       />
    </Container>
  );
}
