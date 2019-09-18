import {Column, HasMany, Model, Table} from "sequelize-typescript";
import {Payable} from "./PayableModel";

@Table({tableName: "client"})
export class Client extends Model<Client> {
    static sequelize: any;

    @Column({ allowNull: false, comment: 'Nome do Cliente. '})
    name: string;

    @HasMany( () => Payable)
    payable : Payable[];

}
