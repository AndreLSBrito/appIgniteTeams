import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import {Container}  from './styles';
// import { GroupCard } from '@components/GroupCard';


export function Groups() {
  return (
    <Container>
      <Header />
      
      <Highlight 
        title='Turmas'
        subtitle='jogue com a sua turma'
      />
      {/* <GroupCard title='Galera do Ignite'/> */}
    </Container>
  );
}
