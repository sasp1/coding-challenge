import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ArtworkDocument = Artwork & Document;

@Schema()
export class Artwork {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  artist_title: string;

  @Prop()
  place_of_origin: string;

  @Prop()
  timestamp: string
}

export const ArtworkSchema = SchemaFactory.createForClass(Artwork);