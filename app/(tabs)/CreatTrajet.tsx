import React from 'react';
import Creat from '@/components/CreaTrajet'
import Navbar from '@/components/Navbar';
type Props = {
  // Ajoute ici les props que ton composant recevra
};


const CreaTrajet: React.FC<Props> = (props) => {
  return (
    <div>
      <Navbar/>
      <Creat/>
      {/* Ajoute ton contenu ici */}
    </div>
  );
};

export default CreaTrajet;
