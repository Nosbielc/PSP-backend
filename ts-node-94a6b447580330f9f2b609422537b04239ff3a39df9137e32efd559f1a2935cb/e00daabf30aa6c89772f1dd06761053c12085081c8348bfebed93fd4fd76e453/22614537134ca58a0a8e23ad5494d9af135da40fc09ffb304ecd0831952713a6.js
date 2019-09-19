"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Values_1 = require("./Values");
const crypto = require("crypto");
const url = require("url");
class UtilService {
    constructor() {
        this.algoritEncrypt = 'aes256';
    }
    encrypt(text) {
        try {
            let cipher = crypto.createCipher(this.algoritEncrypt, Values_1.secretToken.SECRET);
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        }
        catch (error) {
        }
    }
    decrypt(textEncript) {
        try {
            let decipher = crypto.createDecipher(this.algoritEncrypt, Values_1.secretToken.SECRET);
            console.log("text: " + textEncript);
            let decrypted = decipher.update(textEncript, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
        catch (error) {
            console.log("Erro ao decriptar: " + textEncript);
            return "";
        }
    }
    hMacSha512(text) {
        try {
            const hmac = crypto.createHmac('sha512', Values_1.secretToken.SECRET);
            hmac.update(text);
            return hmac.digest('hex');
        }
        catch (error) {
            console.log("Erro ao criar hMacSha512: " + text);
            return "";
        }
    }
    fullUrl(req) {
        return url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl
        });
    }
    servicoUrl(req, servico) {
        let reg = new RegExp('[a-z0-9\/:]*(' + servico + ')');
        let urlFormatada = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl
        });
        return reg.exec(urlFormatada)[0];
    }
    getLinksNavegacao(init, end, qtdTotal, count, req, ultimoRegistro, servico) {
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
        result.push({ url: urlFirst, rel: 'first' });
        result.push({ url: urlPrev, rel: 'prev' });
        result.push({ url: urlNext, rel: 'next' });
        result.push({ url: urlLast, rel: 'last' });
        return result;
    }
    getCriteriosOrdenacao(asc, desc, nomeCampoDefault) {
        let orderParams = [];
        if (asc && asc.length > 0) {
            asc = [].concat(asc);
            asc.forEach(element => {
                orderParams.push([element, 'ASC']);
            });
        }
        if (desc && desc.length > 0) {
            desc = [].concat(desc);
            desc.forEach(element => {
                orderParams.push([element, 'DESC']);
            });
        }
        if (orderParams.length == 0) {
            orderParams.push([nomeCampoDefault, 'ASC']);
        }
        return orderParams;
    }
    /**
     * Gera caracteres usados no salt
     * @function genRandomString
     * @param {number} length - Compirmento de caracteres. Obs. Não altulizada no momento
     */
    getSalt(precisao) {
        return crypto.randomBytes(Math.ceil(16 / 2))
            .toString('hex') /** converte para formato hexadecimal */
            .slice(0, 16); /** retornar o número necessário de caracteres */
    }
    /**
     * Senha hash com sha512.
     * @function
     * @param {string} senha - Senha.
     * @param {string} salt - dados para validacao.
     */
    genSenhaComSalt(senha, salt) {
        let hash = crypto.createHmac('sha512', salt); /** Algoritmo Hashing sha512 */
        hash.update(this.getHash256String(senha));
        let value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        };
    }
    getHash256String(senha) {
        return crypto.createHash('sha256').update(senha).digest('hex');
    }
    saltHashPassword(senha) {
        let salt = this.getSalt(16); /** Nos retorna o Sal com comprimento de 16 setado fixo */
        let passwordData = this.genSenhaComSalt(senha, salt);
        // console.log('UserPassword = '+senha)
        // console.log('Passwordhash = '+passwordData.passwordHash)
        // console.log('nSalt = '+passwordData.salt)
        return passwordData['passwordHash'] + "." + passwordData['salt'];
    }
    isPasswordCorrect(basePass, passRequest) {
        try {
            let passBase = basePass.split('.');
            let hashBase = passBase[0];
            let saltBase = passBase[1];
            let passwordData = this.genSenhaComSalt(passRequest, saltBase);
            return hashBase == passwordData.passwordHash;
        }
        catch (eror) {
            return false;
        }
    }
}
exports.default = new UtilService();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL3V0aWwvVXRpbFNlcnZpY2UudHMiLCJzb3VyY2VzIjpbIi92YXIvd3d3L1BTUC1iYWNrZW5kL3NyYy91dGlsL1V0aWxTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXVDO0FBQ3ZDLGlDQUFpQztBQUNqQywyQkFBMkI7QUFFM0I7SUFBQTtRQUVZLG1CQUFjLEdBQUcsUUFBUSxDQUFDO0lBNkp0QyxDQUFDO0lBM0pVLE9BQU8sQ0FBQyxJQUFTO1FBQ3BCLElBQUksQ0FBQztZQUNELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxvQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFFLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuRCxTQUFTLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBQ00sT0FBTyxDQUFDLFdBQWdCO1FBQzNCLElBQUksQ0FBQztZQUNELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxvQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1RCxTQUFTLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxNQUFNLENB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QUNMLENBQUM7Q0FFSjtBQUVELGtCQUFlLElBQUksV0FBVyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZWNyZXRUb2tlbiB9IGZyb20gJy4vVmFsdWVzJztcbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tIFwiY3J5cHRvXCI7XG5pbXBvcnQgKiBhcyB1cmwgZnJvbSAndXJsJztcblxuY2xhc3MgVXRpbFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBhbGdvcml0RW5jcnlwdCA9ICdhZXMyNTYnO1xuXG4gICAgcHVibGljIGVuY3J5cHQodGV4dDogYW55KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgY2lwaGVyID0gY3J5cHRvLmNyZWF0ZUNpcGhlcih0aGlzLmFsZ29yaXRFbmNyeXB0LCBzZWNyZXRUb2tlbi5TRUNSRVQpO1xuICAgICAgICAgICAgbGV0IGVuY3J5cHRlZCA9IGNpcGhlci51cGRhdGUodGV4dCwgJ3V0ZjgnLCAnaGV4Jyk7XG4gICAgICAgICAgICBlbmNyeXB0ZWQgKz0gY2lwaGVyLmZpbmFsKCdoZXgnKTtcbiAgICAgICAgICAgIHJldHVybiBlbmNyeXB0ZWQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGRlY3J5cHQodGV4dEVuY3JpcHQ6IGFueSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRlY2lwaGVyID0gY3J5cHRvLmNyZWF0ZURlY2lwaGVyKHRoaXMuYWxnb3JpdEVuY3J5cHQsIHNlY3JldFRva2VuLlNFQ1JFVCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRleHQ6IFwiICsgdGV4dEVuY3JpcHQpO1xuICAgICAgICAgICAgbGV0IGRlY3J5cHRlZCA9IGRlY2lwaGVyLnVwZGF0ZSh0ZXh0RW5jcmlwdCwgJ2hleCcsICd1dGY4Jyk7XG4gICAgICAgICAgICBkZWNyeXB0ZWQgKz0gZGVjaXBoZXIuZmluYWwoJ3V0ZjgnKTtcbiAgICAgICAgICAgIHJldHVybiBkZWNyeXB0ZWQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm8gYW8gZGVjcmlwdGFyOiBcIiArIHRleHRFbmNyaXB0KTtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGhNYWNTaGE1MTIodGV4dDogYW55KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBobWFjID0gY3J5cHRvLmNyZWF0ZUhtYWMoJ3NoYTUxMicsIHNlY3JldFRva2VuLlNFQ1JFVCk7XG4gICAgICAgICAgICBobWFjLnVwZGF0ZSh0ZXh0KTtcbiAgICAgICAgICAgIHJldHVybiBobWFjLmRpZ2VzdCgnaGV4Jyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm8gYW8gY3JpYXIgaE1hY1NoYTUxMjogXCIgKyB0ZXh0KTtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBmdWxsVXJsKHJlcSkge1xuICAgICAgICByZXR1cm4gdXJsLmZvcm1hdCh7XG4gICAgICAgICAgICBwcm90b2NvbDogcmVxLnByb3RvY29sLFxuICAgICAgICAgICAgaG9zdDogcmVxLmdldCgnaG9zdCcpLFxuICAgICAgICAgICAgcGF0aG5hbWU6IHJlcS5vcmlnaW5hbFVybFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2Vydmljb1VybChyZXEsIHNlcnZpY28pIHtcbiAgICAgICAgbGV0IHJlZyA9IG5ldyBSZWdFeHAoJ1thLXowLTlcXC86XSooJyArIHNlcnZpY28gKyAnKScpOyBcblxuICAgICAgICBsZXQgdXJsRm9ybWF0YWRhID0gdXJsLmZvcm1hdCh7XG4gICAgICAgICAgICBwcm90b2NvbDogcmVxLnByb3RvY29sLFxuICAgICAgICAgICAgaG9zdDogcmVxLmdldCgnaG9zdCcpLFxuICAgICAgICAgICAgcGF0aG5hbWU6IHJlcS5vcmlnaW5hbFVybFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVnLmV4ZWModXJsRm9ybWF0YWRhKVswXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGlua3NOYXZlZ2FjYW8oaW5pdDogbnVtYmVyLCBlbmQ6IG51bWJlciwgcXRkVG90YWwgOiBudW1iZXIsIGNvdW50IDogbnVtYmVyLCByZXEgOiBhbnksIHVsdGltb1JlZ2lzdHJvOiBudW1iZXIsIHNlcnZpY28gOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheSgpOyBcblxuICAgICAgICBjb25zdCBDT01QTEVNRU5UT19SQU5HRSA9ICc/cmFuZ2U9JztcblxuICAgICAgICBsZXQgdXJsRmlyc3QgPSAnJztcbiAgICAgICAgbGV0IHVybFByZXYgPSAnJztcbiAgICAgICAgbGV0IHVybE5leHQgPSAnJztcbiAgICAgICAgbGV0IHVybExhc3QgPSAnJzsgIFxuICAgICAgICBcbiAgICAgICAgbGV0IGluaXRQcmV2ID0gKGluaXQgLSBxdGRUb3RhbCk7XG4gICAgICAgIGxldCBlbmROZXh0ID0gKGVuZCArIHF0ZFRvdGFsKTtcblxuICAgICAgICB1cmxGaXJzdCA9IHF0ZFRvdGFsIDwgY291bnQgPyB0aGlzLnNlcnZpY29VcmwocmVxLCBzZXJ2aWNvKSArIENPTVBMRU1FTlRPX1JBTkdFICsgMCArICctJyArIChxdGRUb3RhbCAtIDEpIDogJyc7XG4gICAgICAgIHVybFByZXYgPSBpbml0UHJldiA+PSAwID8gdGhpcy5zZXJ2aWNvVXJsKHJlcSwgc2VydmljbykgKyBDT01QTEVNRU5UT19SQU5HRSArIGluaXRQcmV2ICsgJy0nICsgKGluaXQgLSAxKSA6ICcnO1xuICAgICAgICB1cmxOZXh0ID0gZW5kTmV4dCA8IGNvdW50ID8gdGhpcy5zZXJ2aWNvVXJsKHJlcSwgc2VydmljbykgKyBDT01QTEVNRU5UT19SQU5HRSArIChlbmQgKyAxKSArICctJyArIChlbmQgKyBxdGRUb3RhbCkgOiAnJztcbiAgICAgICAgdXJsTGFzdCA9IHRoaXMuc2Vydmljb1VybChyZXEsIHNlcnZpY28pICsgQ09NUExFTUVOVE9fUkFOR0UgKyAodWx0aW1vUmVnaXN0cm8gLSAocXRkVG90YWwgLSAxKSkgKyAnLScgKyB1bHRpbW9SZWdpc3RybztcblxuICAgICAgICByZXN1bHQucHVzaCh7dXJsOiB1cmxGaXJzdCwgcmVsOiAnZmlyc3QnfSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHt1cmw6IHVybFByZXYsIHJlbDogJ3ByZXYnfSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHt1cmw6IHVybE5leHQsIHJlbDogJ25leHQnfSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHt1cmw6IHVybExhc3QsIHJlbDogJ2xhc3QnfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDcml0ZXJpb3NPcmRlbmFjYW8oYXNjIDogQXJyYXk8YW55PiwgZGVzYyA6IEFycmF5PGFueT4sIG5vbWVDYW1wb0RlZmF1bHQ6IHN0cmluZykge1xuICAgICAgICBsZXQgb3JkZXJQYXJhbXMgPSBbXTtcbiAgICAgICAgaWYoYXNjICYmIGFzYy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBhc2MgPSBbXS5jb25jYXQoIGFzYyk7XG4gICAgICAgICAgICBhc2MuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBvcmRlclBhcmFtcy5wdXNoKFtlbGVtZW50LCAnQVNDJ10pOyAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKGRlc2MgJiYgZGVzYy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBkZXNjID0gW10uY29uY2F0KCBkZXNjKTtcbiAgICAgICAgICAgIGRlc2MuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBvcmRlclBhcmFtcy5wdXNoKFtlbGVtZW50LCAnREVTQyddKTsgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZihvcmRlclBhcmFtcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgb3JkZXJQYXJhbXMucHVzaChbbm9tZUNhbXBvRGVmYXVsdCwgJ0FTQyddKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JkZXJQYXJhbXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VyYSBjYXJhY3RlcmVzIHVzYWRvcyBubyBzYWx0XG4gICAgICogQGZ1bmN0aW9uIGdlblJhbmRvbVN0cmluZ1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBDb21waXJtZW50byBkZSBjYXJhY3RlcmVzLiBPYnMuIE7Do28gYWx0dWxpemFkYSBubyBtb21lbnRvXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTYWx0KHByZWNpc2FvKSB7XG4gICAgICAgIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoTWF0aC5jZWlsKDE2IC8gMikpXG4gICAgICAgICAgICAudG9TdHJpbmcoJ2hleCcpIC8qKiBjb252ZXJ0ZSBwYXJhIGZvcm1hdG8gaGV4YWRlY2ltYWwgKi9cbiAgICAgICAgICAgIC5zbGljZSgwLCAxNikgICAvKiogcmV0b3JuYXIgbyBuw7ptZXJvIG5lY2Vzc8OhcmlvIGRlIGNhcmFjdGVyZXMgKi9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5oYSBoYXNoIGNvbSBzaGE1MTIuXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbmhhIC0gU2VuaGEuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNhbHQgLSBkYWRvcyBwYXJhIHZhbGlkYWNhby5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdlblNlbmhhQ29tU2FsdChzZW5oYSwgc2FsdCl7XG4gICAgICAgIGxldCBoYXNoID0gY3J5cHRvLmNyZWF0ZUhtYWMoJ3NoYTUxMicsIHNhbHQpIC8qKiBBbGdvcml0bW8gSGFzaGluZyBzaGE1MTIgKi9cbiAgICAgICAgaGFzaC51cGRhdGUodGhpcy5nZXRIYXNoMjU2U3RyaW5nKHNlbmhhKSlcbiAgICAgICAgbGV0IHZhbHVlID0gaGFzaC5kaWdlc3QoJ2hleCcpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzYWx0OnNhbHQsXG4gICAgICAgICAgICBwYXNzd29yZEhhc2g6dmFsdWVcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdldEhhc2gyNTZTdHJpbmcoc2VuaGEpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUoc2VuaGEpLmRpZ2VzdCgnaGV4JylcbiAgICB9XG5cbiAgICBwdWJsaWMgc2FsdEhhc2hQYXNzd29yZChzZW5oYSkge1xuICAgICAgICBsZXQgc2FsdCA9IHRoaXMuZ2V0U2FsdCgxNikgLyoqIE5vcyByZXRvcm5hIG8gU2FsIGNvbSBjb21wcmltZW50byBkZSAxNiBzZXRhZG8gZml4byAqL1xuICAgICAgICBsZXQgcGFzc3dvcmREYXRhID0gdGhpcy5nZW5TZW5oYUNvbVNhbHQoc2VuaGEsIHNhbHQpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdVc2VyUGFzc3dvcmQgPSAnK3NlbmhhKVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnUGFzc3dvcmRoYXNoID0gJytwYXNzd29yZERhdGEucGFzc3dvcmRIYXNoKVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnblNhbHQgPSAnK3Bhc3N3b3JkRGF0YS5zYWx0KVxuICAgICAgICByZXR1cm4gcGFzc3dvcmREYXRhWydwYXNzd29yZEhhc2gnXSArIFwiLlwiICsgcGFzc3dvcmREYXRhWydzYWx0J11cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNQYXNzd29yZENvcnJlY3QoYmFzZVBhc3MsIHBhc3NSZXF1ZXN0KSB7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBwYXNzQmFzZSA9IGJhc2VQYXNzLnNwbGl0KCcuJykgXG4gICAgICAgICAgICBsZXQgaGFzaEJhc2UgPSBwYXNzQmFzZVswXVxuICAgICAgICAgICAgbGV0IHNhbHRCYXNlID0gcGFzc0Jhc2VbMV1cblxuICAgICAgICAgICAgbGV0IHBhc3N3b3JkRGF0YSA9IHRoaXMuZ2VuU2VuaGFDb21TYWx0KHBhc3NSZXF1ZXN0LCBzYWx0QmFzZSlcblxuICAgICAgICAgICAgcmV0dXJuIGhhc2hCYXNlID09IHBhc3N3b3JkRGF0YS5wYXNzd29yZEhhc2hcblxuICAgICAgICB9IGNhdGNoIChlcm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVXRpbFNlcnZpY2UoKTsiXX0=