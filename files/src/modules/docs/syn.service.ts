import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import { SynResponse, SynKeys } from './models/interfaces/syn-response';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import http from 'http';
const request = require('request');

@Injectable()
export class SynService {
  logger = new Logger(this.constructor.name);
  config = new ConfigService();

  constructor() {}

  url = this.config.get('SYN_URL');

  async getAuthData(): Promise<SynResponse['data']> {
    this.logger.verbose('get-auth-data');

    const query = SynKeys.SYNOAPIAuth + ',SYNO.FileStation.';

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
          query,
        },
      };

      const res = (await axios(requestConf)).data as SynResponse;

      if (res.error) {
        throw new Error(JSON.stringify(res.error));
      }

      return res.data;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  async login(auth: SynResponse['data']): Promise<string> {
    this.logger.verbose('login');

    try {
      const account = this.config.get('SYN_USER');
      const passwd = this.config.get('SYN_PASSWORD');

      const data = auth['SYNO.API.Auth'];

      const requestConf: AxiosRequestConfig = {
        method: 'get',
        url: data.path,
        baseURL: this.url,
        params: {
          api: SynKeys.SYNOAPIAuth,
          version: data.maxVersion,
          method: 'login',
          account,
          passwd,
          session: 'FileStation',
          format: 'cookie',
        },
      };

      const logingData = (await axios(requestConf)).data;

      if (!logingData.success) {
        throw new Error(logingData.data.error);
      }

      return logingData.data.sid;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  async getListShare() {
    this.logger.verbose('get-list-share');

    try {
      const authData = await this.getAuthData();
      const sid = await this.login(authData);

      const requestConf: AxiosRequestConfig = {
        method: 'get',
        url: authData['SYNO.FileStation.List'].path,
        baseURL: this.url,
        params: {
          api: SynKeys.SYNOFileStationList,
          version: authData['SYNO.FileStation.List'].maxVersion,
          method: 'list_share',
          _sid: sid,
        },
      };

      const data = (await axios(requestConf)).data;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  async uploadFile(file: Buffer, filepath: string, name: string) {
    this.logger.verbose('upload-file');

    try {
      const auth = await this.getAuthData();
      const sid = await this.login(auth);

      this.logger.log(auth);
      this.logger.log(sid);

      //   const binFile = file.toString('binary');

      let d = new FormData();

      //   const data = {
      //     path: path,
      //       create_parents: true,
      //       overwrite: true,
      //       file: { file: (name, binFile, ) }
      //   }
      d.append('api', SynKeys.SYNOFileStationUpload);
      d.append(
        'version',
        auth['SYNO.FileStation.Upload'].maxVersion.toString(),
      );
      d.append('method', 'upload');
      d.append('path', '/Portal');
      d.append('create_parents', 'true');
      d.append('overwrite', 'true');
      const file = fs.createReadStream(
        path.join(__dirname, '../../../assets/pdf/TGU/air.pdf'),
      );
      d.append('_sid', sid);
      d.append('file', file, {
        // contentType: 'application/octet-stream',
        filename: 'air.pdf',
      });
      //   d.append('file', file, 'air.pdf');

      //   const dd = { file: [name, binFile, 'application/octet-stream'] };
      //   d.append('_sid', sid);
      //   d.append('file', binFile, name);

      const dd: AxiosRequestConfig['data'] = {
        path: '/Portal',
        create_parents: true,
        overwrite: true,
        file: ['air.pdf', 'application/octet-stream', file],
      };

      const requestConf: AxiosRequestConfig = {
        // method: 'POST',
        // url: auth['SYNO.FileStation.Upload'].path,
        // baseURL: this.url,
        // headers: { 'Content-Type': 'multipart/form-data' },
        // data: dd,
        params: {
          _sid: sid,
          api: SynKeys.SYNOFileStationUpload,
          method: 'upload',
          version: auth['SYNO.FileStation.Upload'].maxVersion,
        },
      };

      const uri = this.url + auth['SYNO.FileStation.Upload'].path;

      const res = await axios.post(uri, dd, requestConf);

      this.logger.log('after');

      this.logger.verbose(res.data);
      this.logger.verbose(res.headers);
      //   this.logger.verbose(res.config);
      //   };
    } catch (error) {
      if (error.response) {
        this.logger.error(JSON.stringify(error.response.data));
        this.logger.error(JSON.stringify(error.response.status));
        this.logger.error(JSON.stringify(error.response.headers));
      }
      this.logger.error(JSON.stringify(error.request));
      this.logger.error(JSON.stringify(error.message));
      this.logger.error(JSON.stringify(error));
    }
  }
}
