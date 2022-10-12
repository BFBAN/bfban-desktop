import http from 'axios';
import Conf from './conf';
import { account_storage } from "./index";
import store from '../../store/index';

const HTTP_ = http.create({
  timeout: 600000,
  withCredentials: true,
  headers: {
    // 'Content-type': 'application/json',
  },
  validateStatus(status) {
      return status <= 1000;
  }
})
HTTP_.interceptors.response.use(response => {
  const { data = {} } = response
  if(data.code == "user.tokenExpired") {
    account_storage.clearAll();
    store.dispatch('signout')
  }
  return response
}, error => {
  
  throw error
})
export default class Http extends Conf {
    GET = 'get';
    POST = 'post';
    PUT = 'put';
    DEL = 'del';
    //..

    GETURL = { protocol: '', request: '' };
    NODE;

    HTTP = HTTP_

    constructor() {
        super();
        super.initConf();

        this.NODE = process.env.NODE_ENV || 'development';
        this.HTTP.interceptors.request.use(config => {
            return config
        }, error=> {
            // 对请求错误做些什么
            return Promise.reject(error)
        })
    }

    location = () => {
        return new URL(this.globalUrl());
    }

    // 获取全局地址
    globalUrl() {
        switch (this.NODE) {
            case 'production': // 生产
                this.GETURL = this.CONF.child[this.CONF.requestProductionName];
                break;
            case 'development': // 开发
            default:
                this.GETURL = this.CONF.child[this.CONF.requestDevelopmentName];
                break;
        }
        return `${this.GETURL.protocol || 'http'}://${this.GETURL.host}${this.GETURL.pathname}`;
    }

    // 配置全局协议头
    setGlobalHeader (headers) {
        if (!headers) return;
        this.HTTP.headers = {...this.HTTP.headers, ...headers};
    }

    /**
     * 请求核心
     * @param url
     * @param requestData
     * @returns {Promise<AxiosResponse<any>>}
     */
    async request(url = '', requestData = {method: this.POST, data: {}, params: {}}) {
        let result = await this.HTTP({
            url: url,
            Origin: "",
            headers: Object.assign({}, requestData.headers),
            method: requestData.method,
            data: requestData.data,
            params: requestData.params,
            body: requestData.body
        });

        return result;
    }

    /**
     * post 请求
     * @param url
     * @param data
     * @returns {Promise<AxiosResponse<any>>}
     */
    async post(url, data = {data: {}, params: {}}) {
        const _url = this.globalUrl() + url;

        let result = await this.request(_url, {
            method: this.POST,
            headers: data.headers,
            params: data.params,
            data: data.data,
        });

        return result;
    }

    /**
     * get 请求
     * @returns {Promise<AxiosResponse<any>>}
     */
    async get(url = '', data = {data: {}, params: {}}) {
        const _url = this.globalUrl() + url;

        let result = await this.request(_url, {
            method: this.GET,
            headers: data.headers,
            params: data.params,
            data: data.data,
        });

        return result;
    }

    /**
     * put 请求
     * @returns {Promise<AxiosResponse<any>>}
     */
    async put(url = '', data = {data: {}, params: {}}) {
        const _url = this.globalUrl() + url;

        this.HTTP.headers = {...this.HTTP.headers, ...data.headers};

        let result = await this.HTTP({
            url:_url,
            method: this.PUT,
            headers: data.headers,
            params: data.params,
            data: data.data,
        })

        return result;
    }
}