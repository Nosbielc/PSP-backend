import {Column, Model, Table} from "sequelize-typescript";

@Table({tableName: "transaction"})
export class Transaction extends Model<Transaction> {
    static sequelize: any;

    @Column({
        allowNull: false,
        field: "descricao",
        comment: "Descrição da transação. Ex: 'Smartband XYZ 3.0' "
    })
    descricao: string;
}