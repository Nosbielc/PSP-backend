import { secretToken } from './Values';
import * as crypto from "crypto";
import * as url from 'url';

class UtilService {

    private algoritEncrypt = 'aes256';

    public encrypt(text: any) {
        try {
            let cipher = crypto.createCipher(this.algoritEncrypt, secretToken.SECRET);
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        } catch (error) {
        }
    }
    public decrypt(textEncript: any) {
        try {
            let decipher = crypto.createDecipher(this.algoritEncrypt, secretToken.SECRET);
            console.log("text: " + textEncript);
            let decrypted = decipher.update(textEncript, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (error) {
            console.log("Erro ao decriptar: " + textEncript);
            return "";
        }
    }

    public hMacSha512(text: any) {
        try {
            const hmac = crypto.createHmac('sha512', secretToken.SECRET);
            hmac.update(text);
            return hmac.digest('hex');
        } catch (error) {
            console.log("Erro ao criar hMacSha512: " + text);
            return "";
        }
    }
    
    public fullUrl(req) {
        return url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl
        });
    }

    public servicoUrl(req, servico) {
        let reg = new RegExp('[a-z0-9\/:]*(' + servico + ')'); 

        let urlFormatada = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl
        });

        return reg.exec(urlFormatada)[0];
    }

    public getLinksNavegacao(init: number, end: number, qtdTotal : number, count : number, req : any, ultimoRegistro: number, servico : string) {
        let result = new Array(); 

        const COMPLEMENTO_RANGE = '?range=';

        let urlFirst = '';
        let urlPrev = '';
        let urlNext = '';
        let urlLast = '';  
        
        let initPrev = (init - qtdTotal);
        let endNext = (end + qtdTotal);

        urlFirst = qtdTotal < count ? this.servicoUrl(req, servico) + COMPLEMENTO_RANGE + 0 + '-' + (qtdTotal - 1) : '';
        urlPrev = initPrev >= 0 ? this.servicoUrl(req, servico) + COMPLEMENTO_RANGE + initPrev + '-' + (init - 1) : '';
        urlNext = endNext < count ? this.servicoUrl(req, servico) + COMPLEMENTO_RANGE + (end + 1) + '-' + (end + qtdTotal) : '';
        urlLast = this.servicoUrl(req, servico) + COMPLEMENTO_RANGE + (ultimoRegistro - (qtdTotal - 1)) + '-' + ultimoRegistro;

        result.push({url: urlFirst, rel: 'first'});
        result.push({url: urlPrev, rel: 'prev'});
        result.push({url: urlNext, rel: 'next'});
        result.push({url: urlLast, rel: 'last'});

        return result
    }

    public getCriteriosOrdenacao(asc : Array<any>, desc : Array<any>, nomeCampoDefault: string) {
        let orderParams = [];
        if(asc && asc.length > 0) {
            asc = [].concat( asc);
            asc.forEach(element => {
                orderParams.push([element, 'ASC']);    
            });
        }
        if(desc && desc.length > 0) {
            desc = [].concat( desc);
            desc.forEach(element => {
                orderParams.push([element, 'DESC']);    
            });
        }
        if(orderParams.length == 0) {
            orderParams.push([nomeCampoDefault, 'ASC']);
        }
        return orderParams;
    }

    /**
     * Gera caracteres usados no salt
     * @function genRandomString
     * @param {number} length - Compirmento de caracteres. Obs. Não altulizada no momento
     */
    private getSalt(precisao) {
        return crypto.randomBytes(Math.ceil(16 / 2))
            .toString('hex') /** converte para formato hexadecimal */
            .slice(0, 16)   /** retornar o número necessário de caracteres */
    }

    /**
     * Senha hash com sha512.
     * @function
     * @param {string} senha - Senha.
     * @param {string} salt - dados para validacao.
     */
    private genSenhaComSalt(senha, salt){
        let hash = crypto.createHmac('sha512', salt) /** Algoritmo Hashing sha512 */
        hash.update(this.getHash256String(senha))
        let value = hash.digest('hex')
        return {
            salt:salt,
            passwordHash:value
        }
    }
    
    private getHash256String(senha) {
        return crypto.createHash('sha256').update(senha).digest('hex')
    }

    public saltHashPassword(senha) {
        let salt = this.getSalt(16) /** Nos retorna o Sal com comprimento de 16 setado fixo */
        let passwordData = this.genSenhaComSalt(senha, salt)
        // console.log('UserPassword = '+senha)
        // console.log('Passwordhash = '+passwordData.passwordHash)
        // console.log('nSalt = '+passwordData.salt)
        return passwordData['passwordHash'] + "." + passwordData['salt']
    }

    public isPasswordCorrect(basePass, passRequest) {

        try {
            let passBase = basePass.split('.') 
            let hashBase = passBase[0]
            let saltBase = passBase[1]

            let passwordData = this.genSenhaComSalt(passRequest, saltBase)

            return hashBase == passwordData.passwordHash

        } catch (eror) {
            return false
        }
    }

}

export default new UtilService();