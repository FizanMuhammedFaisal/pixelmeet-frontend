import type z from "zod";
import type { createMapSchema } from "../schema/map.schema";
import type { Map } from "./map";

export type CreateMapPayload=z.infer<typeof createMapSchema>


export type CreateMapResponse={
    data:{
        map:Map
    }
}