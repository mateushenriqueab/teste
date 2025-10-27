// packages/app/src/plugins/infra/InfraPage.tsx
import React, { useState } from 'react';
import {
  Page,
  Header,
  Content,
  ContentHeader,
  SupportButton,
} from '@backstage/core-components';
import { CatalogTable } from '@backstage/plugin-catalog';
import { PodLogs } from '@backstage/plugin-kubernetes';
import { Button, TextField } from '@material-ui/core';

export const InfraPage = () => {
  const [cluster, setCluster] = useState('');
  const [namespace, setNamespace] = useState('default');
  const [pod, setPod] = useState('');
  const [container, setContainer] = useState('');

  return (
    <Page themeId="tool">
      <Header title="Infraestrutura" subtitle="Recursos e observability" />
      <Content>
        <ContentHeader title="Recursos">
          <SupportButton>Infra</SupportButton>
        </ContentHeader>

        <div style={{ marginBottom: 24 }}>
          <CatalogTable
            // Nem todas as versões têm `initialFilter`. Caso sua versão não aceite,
            // o componente continua funcionando como tabela padrão.
            initialFilter={(entity: any) =>
              (entity?.metadata?.tags || []).includes('infraestrutura')
            }
          />
        </div>

        <div style={{ marginTop: 24 }}>
          <h3>Logs do Pod</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField label="Cluster" value={cluster} onChange={e => setCluster(e.target.value)} size="small" />
            <TextField label="Namespace" value={namespace} onChange={e => setNamespace(e.target.value)} size="small" />
            <TextField label="Pod" value={pod} onChange={e => setPod(e.target.value)} size="small" />
            <TextField label="Container (opcional)" value={container} onChange={e => setContainer(e.target.value)} size="small" />
            <Button onClick={() => {}} variant="outlined">Carregar</Button>
          </div>

          <div style={{ marginTop: 12 }}>
            {pod ? (
              <PodLogs
                clusterName={cluster || undefined}
                namespace={namespace}
                podName={pod}
                containerName={container || undefined}
              />
            ) : (
              <div style={{ color: '#666' }}>Insira um nome de Pod para visualizar os logs aqui.</div>
            )}
          </div>
        </div>
      </Content>
    </Page>
  );
};

export default InfraPage;
