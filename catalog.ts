// packages/backend/src/plugins/catalog.ts
// Adicione este código ao seu arquivo de configuração do catálogo

import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { applicationEntityV1alpha1Schema } from '@internal/plugin-application-kind';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  
  // Adiciona o processador para o scaffold
  builder.addProcessor(new ScaffolderEntitiesProcessor());
  
  // Registra o schema do Kind Application
  builder.addEntityPolicy({
    async enforce(entity) {
      if (entity.kind === 'Application') {
        // Validações customizadas aqui se necessário
        return entity;
      }
      return entity;
    },
  });

  // Adiciona validação do schema
  builder.setEntityDataParser((data) => {
    if (data.kind === 'Application') {
      // Aqui você pode adicionar validações específicas usando o applicationEntityV1alpha1Schema
      return data;
    }
    return data;
  });

  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  
  return router;
}
