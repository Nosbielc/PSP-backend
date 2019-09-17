import {BelongsTo, Column, Model, Table} from "sequelize-typescript";
import { CreatedAt } from 'sequelize-typescript/lib/annotations/CreatedAt';
import { DataType } from 'sequelize-typescript/lib/enums/DataType';
import {Payable} from "./PayableModel";

@Table({tableName: "transaction"})
export class Transaction extends Model<Transaction> {
    static sequelize: any;

    @Column({ allowNull: false, comment: 'Valor da Transação' })
    vlrTransaction: number;

    @Column({ allowNull: false, comment: 'Descrição da transação. Ex: Smartband XYZ 3.0 '})
    description: string;

    @Column({ type : DataType.ENUM, values: ['1', '2'], allowNull: false, comment : '1 -> debit_card , 2 -> credit_card'})
    typeTransaction: number;

    @Column({ allowNull: false, comment: 'Número do cartão ' })
    numCard: string;

    @Column({ allowNull: false, comment: 'Nome do portador do cartão'})
    bearerName: string;

    @Column( { allowNull: false, comment : 'Data de validade do cartão'} )
    dtExpiration: Date;

    @Column({ allowNull: false, comment: 'Código de verificação do cartão (CVV)'})
    cvv: string;

    @CreatedAt
    @Column( { allowNull: false, comment : 'Data da entrada do registro'} )
    dtCreated: Date;
}
