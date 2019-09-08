import {tMsg} from "../../util/Values";
import {Data} from "../../util/Data";
import {msgErro} from "../../util/MessageTranslate";

class PSPService {

    public async list(req, res) {
        let data = new Data();
        try {
            
        }  catch (error) {
            data.addMsgError(tMsg.DANGER, msgErro.erroAoRealizarConsulta, "Error registering your premium.");
            res.status(500).json(data)
        }
    }

}

export default new PSPService()