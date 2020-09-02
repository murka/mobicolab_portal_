import { Entity, PrimaryColumn, ManyToOne, Column } from 'typeorm';
import { Habitan } from 'src/modules/habitans/models/habitan.model';
import { HType } from 'src/modules/htypes/models/habitans-type.model';

@Entity()
export class Act {
  @PrimaryColumn()
  id: string;
  @ManyToOne(
    type => Habitan,
    habitan => habitan.acts,
    {
      eager: true,
    },
  )
  habitan: Habitan;
  @ManyToOne(
    type => HType,
    htype => htype.acts,
    {
      eager: true,
    },
  )
  htype: HType;
}
