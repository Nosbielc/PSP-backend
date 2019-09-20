import {tMsg} from "../../util/Values";
import {Data} from "../../util/Data";
import {msgClient, msgErro} from "../../util/MessageTranslate";
import {Client} from "../model/ClientModel";

class ClientService {

    public async create(req, res) {
        let data = new Data();
        let result: {[k: string]: any} = {};

        let bodyRequest = req.body; //Pega informações do body
        try {
            req.assert('name', msgClient.erroParamBodyNameClientRequired).notEmpty();

            let errors = req.validationErrors();

            //Validando parametros enviados
            if (errors) {
                data.addMsgError(tMsg.DANGER, msgClient.erroCreateClient, errors);
                res.status(400).send(data);
                return
            }
            // - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _

            result.client = await Client.create({
                'name' : bodyRequest.name
            });

            data.obj = result;
            res.status(200).json(data);
        }  catch (error) {
            data.addMsgError(tMsg.DANGER, msgErro.erroAoRealizarConsulta, "Error ");
            res.status(500).json(data)
        }
    }

}

export default new ClientService()
