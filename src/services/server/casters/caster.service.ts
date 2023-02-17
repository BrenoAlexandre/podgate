import { EStatus } from '../../../interfaces/EStatus';
import HTTPClient from '../../HTTPClient';

export class CastersService {
  private static v1 = '/api/v1';

  private static baseUrl = '/caster';

  static async answerRequest(
    requestStatus: EStatus,
    casterId: string,
    feedId: string
  ): Promise<any> {
    return HTTPClient.api
      .put(`${this.v1}${this.baseUrl}`, { requestStatus, casterId, feedId })
      .then((response) => response.data);
  }

  static async submitRequest(proofUrl: string, feedId: string): Promise<any> {
    return HTTPClient.api
      .post(`${this.v1}${this.baseUrl}`, { proofUrl, feedId })
      .then((response) => response.data);
  }

  static async fetchRequests(): Promise<any> {
    return HTTPClient.api.get(`${this.v1}${this.baseUrl}`).then((response) => response.data);
  }
}
