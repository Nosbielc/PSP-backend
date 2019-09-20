import {tMsg} from "../../util/Values";
import {Data} from "../../util/Data";
import {msgErro, msgPSP} from "../../util/MessageTranslate";
import * as StringMask from 'string-mask';
import {Transaction} from "../model/TransactionModel";
import * as dateFns from 'date-fns';
import {Payable} from "../model/PayableModel";
import * as crypto from 'crypto';
import {Client} from "../model/ClientModel";

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
            req.assert('clientId', msgPSP.erroParamBodyClientIdRequired).notEmpty().isNumeric();

             let errors = req.validationErrors();

            //Validando parametros enviados
            if (errors) {
                data.addMsgError(tMsg.DANGER, msgPSP.erroProcessRecordPSP, errors);
                res.status(400).send(data);
                return
            }
            // - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _

            //Tratamento de data invalida ou expirada
            if (!dateFns.isDate(bodyRequest.dtExpiration) &&
                dateFns.compareDesc( new Date(), dateFns.parse(bodyRequest.dtExpiration)) !== 1 ) {
                data.addMsgError(tMsg.DANGER, msgPSP.erroProcessRecordPSP, "Cartão Expirado.");
                res.status(400).send(data);
                return
            }
            // - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _

            let client = await Client.findById(bodyRequest.clientId);

            if (!client) {
                data.addMsgError(tMsg.DANGER, msgPSP.erroProcessRecordPSP, "Cliente desconhecido.");
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
                'cvv' : bodyRequest.cvv
            });

            // validando status
            let statusPayable = bodyRequest.typeTransaction == 1 ? 1 : 2;
            // Resolvendo data de pagamento
            let dtPayment = statusPayable == 1 ? new Date() : dateFns.addDays(new Date(), 30);
            // Resolvendo porcentagem para taxa
            let percentRate = bodyRequest.typeTransaction == 1 ? 3 : 5;
            // Valor da transação
            let vlrBase = Number(bodyRequest.vlrTransaction);
            // Valor total que será usado como taxa administrativa
            let vlrPayablePercent = Number(bodyRequest.vlrTransaction) * (Number(percentRate) / 100);
            // Valor do recebivél final
            let vlrPayable = vlrBase - Number(vlrPayablePercent);
            // Gerando um hash para consultas futuras
            let hashTransaction = crypto.createHash('md5').update(JSON.stringify(transactionBase)).digest("hex");

            // salvando os pagaveis da transação
            let payableBase = await Payable.create({
                'transactionId' : transactionBase.id,
                'status': statusPayable,
                'dtPayment': dtPayment,
                'percentRate': percentRate,
                'vlrPayable': vlrPayable,
                'hashTransaction' : hashTransaction,
                'clientId' : client.id
            });

            //result.numCard = numCard;//
            //result.vlrApresentacaoFull = vlrApresentacaoFull;
            //result.statusPayable = statusPayable;
            //result.dtPayment = dtPayment;
            //result.percentRate = percentRate;
            //result.vlrBase = vlrBase;
            //result.vlrPayablePercent = vlrPayablePercent;
            //result.vlrPayable = vlrPayable;
            //result.hash = payableBase.hashTransaction;
            result.transaction = transactionBase;
            //result.payable = payableBase;

            data.obj = result;
            data.addMsg(tMsg.SUCCESS, "Sucesso.");
            res.status(200).json(data);
        }  catch (error) {
            console.log(error);
            data.addMsgError(tMsg.DANGER, msgErro.erroAoRealizarConsulta, "Error ");
            res.status(500).json(data)
        }
    }

}

export default new PSPService()
