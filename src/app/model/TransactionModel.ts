import {Column, CreatedAt, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: "transaction"})
export class Transaction extends Model<Transaction> {
    static sequelize: any;

    @CreatedAt
    @Column( { allowNull: false, field: "dt_created", comment : 'Data da entrada do registro' } )
    dtCreated: Date;

    @Column({
        allowNull: false,
        field: "vlr_transacation",
        comment: "Valor da Transação"
    })
    vlrTransaction: number;

    @Column({
        allowNull: false,
        field: "description",
        comment: "Descrição da transação. Ex: 'Smartband XYZ 3.0' "
    })
    description: string;

    @Column({
        type : DataType.ENUM,
        values: ['1', '2'],
        allowNull: false,
        field: "transaction_type",
        comment : '1 -> debit_card , 2 -> credit_card'
    })
    typeTransaciton: number;

    @Column({
        allowNull: false,
        field: "num_card",
        comment: "Número do cartão "
    })
    numCard: string;

    @Column({
        allowNull: false,
        field: "num_card",
        comment: "Nome do portador do cartão"
    })
    bearerName: string;

    @Column( {
        allowNull: false,
        field: "dt_expiration",
        comment : 'Data de validade do cartão'
    } )
    dtExpiration: Date;

    @Column({
        allowNull: false,
        field: "cvv",
        comment: "Código de verificação do cartão (CVV)"
    })
    cvv: string;
}
