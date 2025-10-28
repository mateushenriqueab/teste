import { ApplicationEntityV1alpha1Schema } from '@backstage/catalog-model';

export default async function createPlugin(env) {
  const builder = await CatalogBuilder.create(env);

  builder.addEntityProcessor(new DefaultNamespaceEntityProcessor());
  builder.setProcessingIntervalSeconds(60);

  builder.addEntityPolicy(ApplicationEntityV1alpha1Schema);

  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
