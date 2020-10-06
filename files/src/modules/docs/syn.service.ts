import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import { SynResponse, SynKeys } from './models/interfaces/syn-response';

@Injectable()
export class SynService {
  logger = new Logger(this.constructor.name);
  config = new ConfigService();

  constructor() {}

  url = this.config.get('SYN_URL');

  async getAuthRes(): Promise<SynResponse> {
    try {
      let path = '/query.cgi';
      const requestConf: AxiosRequestConfig = {
        method: 'get',
        url: path,
        baseURL: this.url,
        params: {
          api: 'SYNO.API.Info',
          version: 1,
          method: 'query',
          query: SynKeys.SYNOAPIAuth,
        },
      };

      const data = (await axios(requestConf)).data as SynResponse;

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  async login(): Promise<{ sid: string }> {
    try {
      const account = this.config.get('SYN_USER');
      const passwd = this.config.get('SYN_PASSWORD');

      this.logger.verbose(account);
      this.logger.verbose(passwd);

      const auth = await this.getAuthRes();

      this.logger.log(auth);

      const data = auth.data['SYNO.API.Auth'];

      this.logger.log(data);

      const requestConf: AxiosRequestConfig = {
        method: 'get',
        url: data.path,
        baseURL: this.url,
        params: {
          api: SynKeys.SYNOAPIAuth,
          version: data.maxVersion,
          method: 'login',
          account: account,
          passwd: 'sadf',
          session: 'FileStation',
          format: 'sid',
        },
      };

      const logData = (await axios(requestConf)).data;

      if (!logData.success) {
        throw new Error(logData.error);
      }

      return logData.data;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }
}
