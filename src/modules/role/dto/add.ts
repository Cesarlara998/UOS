import { Type, Static } from '@sinclair/typebox';

// Define el esquema del cuerpo de la solicitud
const nameSchema = Type.Object({
  name: Type.String({ minLength: 4 })
}, { additionalProperties: false });

export type NameSchema = Static<typeof nameSchema>;

export default nameSchema;