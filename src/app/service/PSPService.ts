import {tMsg} from "../../util/Values";
import {Data} from "../../util/Data";
import {msgErro, msgPSP} from "../../util/MessageTranslate";
import * as StringMask from 'string-mask';
import {Transaction} from "../model/TransactionModel";
import * as dateFns from 'date-fns'; //https://date-fns.org/

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

            let transactionBase = await Transaction.create({
                'vlrTransaction' : Number(bodyRequest.vlrTransaction),
                'description' : bodyRequest.description,
                'typeTransaction' : bodyRequest.typeTransaction,
                'numCard' : numCard,
                'bearerName' : bodyRequest.bearerName,
                'dtExpiration' : dateFns.parse(bodyRequest.dtExpiration),
                'cvv' : bodyRequest.cvv
            });

            result.numCard = numCard;//
            result.vlrApresentacaoFull = vlrApresentacaoFull;
            result.transaction = transactionBase;

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
