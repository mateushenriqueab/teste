import { Entity } from '@backstage/catalog-model';

/**
 * Interface para o Kind Application personalizado
 */
export interface ApplicationEntityV1alpha1 extends Entity {
  apiVersion: 'backstage.io/v1alpha1';
  kind: 'Application';
  spec: {
    department: string;
    tribe: string;
    squad: string;
    system?: string;
    owner: string;
    language: string;
    repository: string;
    status: 'development' | 'staging' | 'production' | 'deprecated';
    dependencies?: string[];
    sla?: {
      availability: number;
      responseTime: number;
    };
    documentation?: string;
    monitoring?: {
      dashboard?: string;
      alerts?: string;
      logs?: string;
    };
    deployment?: {
      type?: 'kubernetes' | 'ecs' | 'lambda' | 'vm';
      environment?: string[];
      cicd?: string;
    };
  };
}

/**
 * Validador para o Kind Application
 */
export function isApplicationEntity(entity: Entity): entity is ApplicationEntityV1alpha1 {
  return entity.kind === 'Application';
}

/**
 * Schema JSON para validação do Kind Application
 */
export const applicationEntityV1alpha1Schema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'ApplicationEntityV1alpha1',
  description: 'An Application describes a deployable software application in the organization',
  type: 'object',
  required: ['apiVersion', 'kind', 'metadata', 'spec'],
  properties: {
    apiVersion: {
      enum: ['backstage.io/v1alpha1'],
    },
    kind: {
      enum: ['Application'],
    },
    metadata: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the application',
        },
        description: {
          type: 'string',
          description: 'A brief description of the application',
        },
        labels: {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
        annotations: {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      required: ['name'],
    },
    spec: {
      type: 'object',
      required: ['department', 'tribe', 'squad', 'owner', 'language', 'repository', 'status'],
      properties: {
        department: {
          type: 'string',
          description: 'The department that owns this application',
        },
        tribe: {
          type: 'string',
          description: 'The tribe within the department',
        },
        squad: {
          type: 'string',
          description: 'The squad responsible for the application',
        },
        system: {
          type: 'string',
          description: 'The system this application belongs to',
        },
        owner: {
          type: 'string',
          description: 'The owner of this application (user or group)',
        },
        language: {
          type: 'string',
          description: 'The main programming language used',
        },
        repository: {
          type: 'string',
          format: 'uri',
          description: 'The source code repository URL',
        },
        status: {
          enum: ['development', 'staging', 'production', 'deprecated'],
          description: 'The current status of the application',
        },
        dependencies: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of other applications or services this application depends on',
        },
        sla: {
          type: 'object',
          properties: {
            availability: {
              type: 'number',
              minimum: 0,
              maximum: 100,
              description: 'Target availability percentage',
            },
            responseTime: {
              type: 'number',
              description: 'Target response time in milliseconds',
            },
          },
        },
        documentation: {
          type: 'string',
          format: 'uri',
          description: 'Link to the application documentation',
        },
        monitoring: {
          type: 'object',
          properties: {
            dashboard: {
              type: 'string',
              format: 'uri',
              description: 'Link to monitoring dashboard',
            },
            alerts: {
              type: 'string',
              format: 'uri',
              description: 'Link to alert configuration',
            },
            logs: {
              type: 'string',
              format: 'uri',
              description: 'Link to log aggregation',
            },
          },
        },
        deployment: {
          type: 'object',
          properties: {
            type: {
              enum: ['kubernetes', 'ecs', 'lambda', 'vm'],
              description: 'Deployment platform type',
            },
            environment: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of deployment environments',
            },
            cicd: {
              type: 'string',
              format: 'uri',
              description: 'Link to CI/CD pipeline',
            },
          },
        },
      },
    },
  },
};
