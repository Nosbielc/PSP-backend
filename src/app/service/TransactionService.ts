import {tMsg} from "../../util/Values";
import {Data} from "../../util/Data";
import {msgErro} from "../../util/MessageTranslate";

class TransactionService {

    public async transaction(req, res) {
        let data = new Data();
        try {
            data.addMsg(tMsg.SUCCESS, "Sucesso na transação. ");
            res.status(200).json(data);
        }  catch (error) {
            data.addMsgError(tMsg.DANGER, msgErro.erroAoRealizarConsulta, "Error ");
            res.status(500).json(data)
        }
    }

}

export default new TransactionService()
