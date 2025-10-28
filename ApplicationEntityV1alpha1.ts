import { EntitySchema } from '@backstage/catalog-model';

export const ApplicationEntityV1alpha1Schema = EntitySchema.object({
  apiVersion: EntitySchema.string().default('backstage.io/v1alpha1'),
  kind: EntitySchema.string().equals('Application'),
  metadata: EntitySchema.metadataSchema(),
  spec: EntitySchema.object({
    department: EntitySchema.string().optional(),
    tribe: EntitySchema.string().optional(),
    squad: EntitySchema.string().optional(),
    system: EntitySchema.string().optional(),
    owner: EntitySchema.string().optional(),
    language: EntitySchema.string().optional(),
    repository: EntitySchema.string().optional(),
    status: EntitySchema.string().optional(),
  }),
});
