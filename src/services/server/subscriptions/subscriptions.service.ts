import HTTPClient from '../../HTTPClient';

export class SubscriptionsService {
  private static v1 = '/api/v1';

  private static baseUrl = '/subscription';

  static async unsubscribe(feedId: string): Promise<any> {
    return HTTPClient.api
      .put(`${this.v1}${this.baseUrl}`, { feedId })
      .then((response) => response.data);
  }

  static async subscribe(feedId: string): Promise<any> {
    return HTTPClient.api
      .put(`${this.v1}${this.baseUrl}`, { feedId })
      .then((response) => response.data);
  }

  static async getSubscriptionData(): Promise<any> {
    return HTTPClient.api.get(`${this.v1}${this.baseUrl}`).then((response) => response.data);
  }
}
