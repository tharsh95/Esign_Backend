import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Pdf extends Model {
  @Column
  owner_id: string;
  @Column
  status: string;
  @Column
  message: string;
  @Column
  request_id: string;
  @Column
  document_id: string;
  @Column
  action_id: string;
  @Column
  createdAt: Date;
  @Column
  updatedAt: Date;
  @Column({
    type:'JSON',
  })
  meta: any;
 
}