import {Column, Model, Table} from "sequelize-typescript";

@Table({tableName: "payable"})
export class Payable extends Model<Payable> {
    static sequelize: any

    @Column({
        allowNull: false,
        field: "descricao",
        comment: "Descrição da transação. Ex: 'Smartband XYZ 3.0' "
    })
    descricao: string;

}
