import type z from 'zod';
import type { createMapSchema } from '../schema/map.schema';
import type { Map } from './map';

export type CreateMapPayload = z.infer<typeof createMapSchema>;

export type CreateMapResponse = {
  data: {
    map: Map;
  };
};
export type GetMapsPayload = {
  limit: number;
  page: number;
};

export type GetMapsResponse = {
  data: {
    total: number;
    totalPages: number;
    page: number;
    maps: Map[];
  };
};
