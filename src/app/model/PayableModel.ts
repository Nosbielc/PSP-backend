import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: "payable"})
export class Payable extends Model<Payable> {
    static sequelize: any

    @Column({
        type : DataType.ENUM,
        values: ['1', '2', '3'],
        allowNull: false,
        defaultValue: 3,
        field: "transaction_type",
        comment : '1 -> paid , 2 -> waiting_funds, 3 -> unknown'
    })
    status: number;

    @Column( {
        allowNull: false,
        field: "dt_payment",
        comment : 'Data do pagamento'
    } )
    dtPayment: Date;

    @Column({
        allowNull: false,
        field: "percent_rate",
        comment: "Porcetagem de taxa"
    })
    percentRate: number;

    @Column({
        allowNull: false,
        field: "vlr_payable",
        comment: "Valor da Transação final do cliente"
    })
    vlrPayable: number;

}
