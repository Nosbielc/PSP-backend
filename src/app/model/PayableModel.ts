import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Transaction} from "./TransactionModel";

@Table({tableName: "payable"})
export class Payable extends Model<Payable> {
    static sequelize: any;

    @Column({
        type : DataType.ENUM,
        values: ['1', '2', '3'],
        allowNull: false,
        defaultValue: 3,
        comment : '1 -> paid , 2 -> waiting_funds, 3 -> unknown'
    })
    status: number;

    @Column( {
        allowNull: false,
        comment : 'Data do pagamento'
    } )
    dtPayment: Date;

    @Column({
        allowNull: false,
        comment: "Porcetagem de taxa"
    })
    percentRate: number;

    @Column({
        allowNull: false,
        comment: "Valor da Transação final do cliente"
    })
    vlrPayable: number;

    @Column({ allowNull: false, comment: 'Hash gerado com o proprio objeto, Obs.: Ideia que precisa de analise'})
    hashTransaction: string;

    @ForeignKey(() => Transaction)
    @Column({comment : 'Transação registrada.'})
    transactionId: number

}
