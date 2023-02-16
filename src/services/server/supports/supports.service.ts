import { EStatus } from '../../../interfaces/EStatus';
import HTTPClient from '../../HTTPClient';

export class SupportsService {
  private static v1 = '/api/v1';

  private static baseUrl = '/support';

  static async submitRequest(receiptUrl: string, feedId: string): Promise<any> {
    return HTTPClient.api
      .post(`${this.v1}${this.baseUrl}`, { receiptUrl, feedId })
      .then((response) => response.data);
  }

  static async answerRequest(
    requestStatus: EStatus,
    feedId: string,
    supportId: string
  ): Promise<any> {
    return HTTPClient.api
      .put(`${this.v1}${this.baseUrl}`, { requestStatus, feedId, supportId })
      .then((response) => response.data);
  }

  static async updateReceipt(receiptUrl: string, feedId: string, supportId: string): Promise<any> {
    return HTTPClient.api
      .post(`${this.v1}${this.baseUrl}/receipt`, { receiptUrl, feedId, supportId })
      .then((response) => response.data);
  }

  static async revokeRequest(feedId: string, supportId: string): Promise<any> {
    return HTTPClient.api
      .put(`${this.v1}${this.baseUrl}/revoke`, { feedId, supportId })
      .then((response) => response.data);
  }

  static async fetchRequests(): Promise<any> {
    return HTTPClient.api.get(`${this.v1}${this.baseUrl}/fetch`).then((response) => response.data);
  }

  static async getUserSupports(): Promise<any> {
    return HTTPClient.api.get(`${this.v1}${this.baseUrl}/user`).then((response) => response.data);
  }
}
