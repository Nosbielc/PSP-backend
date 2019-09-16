import {tMsg} from "../../util/Values";
import {Data} from "../../util/Data";
import {msgErro, msgPSP} from "../../util/MessageTranslate";
import * as StringMask from 'string-mask';
import {Transaction} from "../model/TransactionModel";
import * as dateFns from 'date-fns';
import PayableService from "./PayableService";
import {Payable} from "../model/PayableModel";
import {Column} from "sequelize-typescript"; //https://date-fns.org/
import * as crypto from 'crypto';

class PSPService {

    public async record(req, res) {
        let data = new Data();
        let result: {[k: string]: any} = {};

        let bodyRequest = req.body; //Pega informações do body
        try {

            req.assert('vlrTransaction', msgPSP.erroParamBodyVlrtransactionRequired).notEmpty();
            req.assert('description', msgPSP.erroParamBodyDescriptionRequired).notEmpty();
            req.assert('typeTransaction', msgPSP.erroParamBodyTypeTransactionRequired).notEmpty().isNumeric().isInt({ min: 1, max: 2});
            req.assert('numCard', msgPSP.erroParamBodyNumCardRequired).notEmpty().isNumeric().len({ min: 14, max: 16});
            req.assert('bearerName', msgPSP.erroParamBodyBearerNameRequired).notEmpty();
            req.assert('dtExpiration', msgPSP.erroParamBodyDtExpirationRequired).notEmpty();
            req.assert('cvv', msgPSP.erroParamBodyCVVRequired).notEmpty();

             let errors = req.validationErrors();

            //Validando parametros enviados
            if (errors) {
                data.addMsgError(tMsg.DANGER, msgPSP.erroProcessRecordPSP, errors);
                res.status(400).send(data);
                return
            }
            // - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _

            //Resolvendo questão de segurança do numero
            let numCard = new StringMask('************0000').apply(bodyRequest.numCard);
            // Valor em formato apresentacao
            let vlrApresentacaoFull =
                (bodyRequest.vlrTransaction).toLocaleString('pt-BR',
                    { style: 'currency', currency: 'BRL' });
            //Registrando a transação
            let transactionBase = await Transaction.create({
                'vlrTransaction' : Number(bodyRequest.vlrTransaction),
                'description' : bodyRequest.description,
                'typeTransaction' : bodyRequest.typeTransaction,
                'numCard' : numCard,
                'bearerName' : bodyRequest.bearerName,
                'dtExpiration' : dateFns.parse(bodyRequest.dtExpiration),
                'cvv' : bodyRequest.cvv,

            });

            // validando status
            let statusPayable = bodyRequest.typeTransaction == 1 ? 1 : 2;
            let dtPayment = statusPayable == 1 ? new Date() : dateFns.addDays(new Date(), 30);
            let percentRate = bodyRequest.typeTransaction == 1 ? 0.03 : 0.05;
            let vlrBase = Number(bodyRequest.vlrTransaction);
            let vlrPayablePercent = Number(bodyRequest.vlrTransaction) * Number(percentRate);
            let vlrPayable = vlrBase - Number(vlrPayablePercent);
            let hashTransaction = crypto.createHash('md5').update(JSON.stringify(transactionBase)).digest("hex");

            // salvando os pagaveis da transação
            let payableBase = await Payable.create({
                'transactionId' : transactionBase.id,
                'status': statusPayable,
                'dtPayment': dtPayment,
                'percentRate': percentRate,
                'vlrPayable': vlrPayable,
                'hashTransaction' : hashTransaction
            });

            result.numCard = numCard;//
            result.vlrApresentacaoFull = vlrApresentacaoFull;
            result.statusPayable = statusPayable;
            result.dtPayment = dtPayment;
            result.percentRate = percentRate;
            result.vlrBase = vlrBase;
            result.vlrPayablePercent = vlrPayablePercent;
            result.vlrPayable = vlrPayable;
            result.hash =
            result.transaction = transactionBase;
            result.payable = payableBase;

            data.obj = result;
            data.addMsg(tMsg.SUCCESS, "Sucesso na transação. ");
            res.status(200).json(data);
        }  catch (error) {
            console.log(error);
            data.addMsgError(tMsg.DANGER, msgErro.erroAoRealizarConsulta, "Error ");
            res.status(500).json(data)
        }
    }

}

export default new PSPService()
