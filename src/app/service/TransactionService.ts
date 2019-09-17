import {tMsg} from "../../util/Values";
import {Data} from "../../util/Data";
import {msgErro} from "../../util/MessageTranslate";
import {Transaction} from "../model/TransactionModel";

class TransactionService {

    public async transaction(req, res) {
        let data = new Data();
        let result: {[k: string]: any} = {};
        try {
            result.transactions = await Transaction.findAll();
            data.obj = result;
            res.status(200).json(data);
        }  catch (error) {
            data.addMsgError(tMsg.DANGER, msgErro.erroAoRealizarConsulta, "Error ");
            res.status(500).json(data)
        }
    }

}

export default new TransactionService()
