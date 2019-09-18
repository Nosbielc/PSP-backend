import {Column, DataType, Model, Table} from "sequelize-typescript";
import { BelongsTo } from "sequelize-typescript/lib/annotations/association/BelongsTo";
import { ForeignKey } from "sequelize-typescript/lib/annotations/ForeignKey";
import {Transaction} from "./TransactionModel";
import {Client} from "./ClientModel";
import {Sequelize} from "sequelize";
import * as sequelize from "sequelize";

@Table({tableName: "payable"})
export class Payable extends Model<Payable> {
    //static sequelize: any;

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
        type: DataType.FLOAT,
        allowNull: false,
        comment: "Valor da Transação final do cliente"
    })
    vlrPayable: number;

    @Column({ allowNull: false, comment: 'Hash gerado com o proprio objeto, Obs.: Ideia que precisa de analise'})
    hashTransaction: string;

    @ForeignKey(() => Transaction)
    @Column({comment : 'Transação registrada.'})
    transactionId: number;

    @BelongsTo(() => Transaction)
    transaction: Transaction;

    @ForeignKey(() => Client)
    @Column({comment : 'Cliente da transação.'})
    clientId: number;

    @BelongsTo(() => Client)
    client: Client;

}
