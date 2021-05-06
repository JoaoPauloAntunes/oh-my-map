import dynamic from "next/dynamic";
import { useMemo } from "react";
import axios from 'axios';

import styles from './home.module.scss';

export default function Home({ markersData }) {
  /* Carrega a biblioteca dinamicamente
  O hook "useMemo" guarda o valor de retorno de uma função a partir dos valores de entrada.
  Se nada mudar no mapa, o valor de entrada, então a variável MapWithoutSSR recebe o 
  valor memorizado pelo React
  */
  const MapWithoutSSR = useMemo(
    () => dynamic(() => import("../components/Map"), {
      ssr: false, // previne renderização do lado do servidor
      loading: () => <p>Loading map...</p>
    }),
    []
  );

  return (
    <div className={styles.homepage}>
      <MapWithoutSSR markersData={markersData} />
    </div>
  );
}


/* SSG
  ---------------
  Aviso: este recurso só funciona em produção!
  Em desenvolvimento, a renderização da página sempre é realizada quando a página é solicitada.
  ---------------
  Após montar uma versão estática da página no lado do servidor (Node.js), 
  o Next.js entrega esta versão para o cliente até que acabe seu tempo de validade
  e ele tenha que gerar uma nova versão. Assim, páginas cujo o conteúdo é o mesmo
  durante um tempo não precisam ser processadas toda vez que são solicitadas, economizando
  muito processamento e ganhando em desempenho com páginas sendo exibidas no navegador
  quase sempre de forma instantânea.
*/
export async function getStaticProps() {
  const { data } = await axios.get('https://cartovis-server.herokuapp.com/hospitales');
  // console.log(typeof data);
  console.log(data);

  return {
    props: {
      markersData: data,
    },
    revalidate: 60 * 60 * 8, // duração: 8h
  }
}