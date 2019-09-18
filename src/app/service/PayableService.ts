import {tMsg} from "../../util/Values";
import {Data} from "../../util/Data";
import {msgErro, msgPSP} from "../../util/MessageTranslate";
import {Payable} from "../model/PayableModel";
import {Client} from "../model/ClientModel";

class PayableService {

    public async payable(req, res) {
        let data = new Data();
        let result: {[k: string]: any} = {};
        try {
            let available = await Payable.sum('vlrPayable', { where: { status: 1 } });
            result.available = (available).toLocaleString('pt-BR',
                { style: 'currency', currency: 'BRL' });

            let waitingFunds = await Payable.sum('vlrPayable', { where: { status: 2 } });
            result.waitingFunds = (waitingFunds).toLocaleString('pt-BR',
                { style: 'currency', currency: 'BRL' });

            result.payables = await Payable.findAll();
            data.obj = result;
            res.status(200).json(data);
        }  catch (error) {
            data.addMsgError(tMsg.DANGER, msgErro.erroAoRealizarConsulta, "Error ");
            res.status(500).json(data)
        }
    }

    public async payableByClient(req, res) {
        let data = new Data();
        let id = req.params.clientId;
        let result: {[k: string]: any} = {};
        try {

            let client = await Client.findById(id);

            if (!client) {
                data.addMsgError(tMsg.DANGER, msgPSP.erroProcessRecordPSP, "Cliente desconhecido.");
                res.status(400).send(data);
                return
            }

            // - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _
            let available = await Payable.sum('vlrPayable', { where: { status: 1 , clientId: client.id} });
            result.available = (available).toLocaleString('pt-BR',
                { style: 'currency', currency: 'BRL' });

            let waitingFunds = await Payable.sum('vlrPayable', { where: { status: 2, clientId: client.id} });
            result.waitingFunds = (waitingFunds).toLocaleString('pt-BR',
                { style: 'currency', currency: 'BRL' });

            result.payables = await Payable.findAll({
                where : { clientId : client.id}
            });
            
            data.obj = result;
            res.status(200).json(data);
        }  catch (error) {
            data.addMsgError(tMsg.DANGER, msgErro.erroAoRealizarConsulta, "Error ");
            res.status(500).json(data)
        }
    }

}

export default new PayableService()
