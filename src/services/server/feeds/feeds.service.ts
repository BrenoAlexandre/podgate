import HTTPClient from '../../HTTPClient';
import { IHomeFeeds, IFeed } from '../../../interfaces/IFeeds';

export class FeedsService {
  private static v1 = '/api/v1';

  private static baseUrl = '/feed';

  static async submitFeed(url: string): Promise<IFeed> {
    return HTTPClient.api
      .post(`${this.v1}${this.baseUrl}`, { url })
      .then((response) => response.data);
  }

  static async fetchFeeds(): Promise<IHomeFeeds[]> {
    return HTTPClient.api
      .get(`${this.v1}${this.baseUrl}/category`)
      .then((response) => response.data);
  }

  static async fetchCategoryFeeds(category: string): Promise<IFeed[]> {
    return HTTPClient.api
      .get(`${this.v1}${this.baseUrl}/category/${category}`)
      .then((response) => response.data);
  }

  static async fetchFeedById(feedId: string): Promise<IFeed> {
    return HTTPClient.api
      .get(`${this.v1}${this.baseUrl}/${feedId}`)
      .then((response) => response.data);
  }

  static async updatePrivateFeed(isPrivate: boolean, feedId: string): Promise<IFeed> {
    return HTTPClient.api
      .put(`${this.v1}${this.baseUrl}/private`, { isPrivate, feedId })
      .then((response) => response.data);
  }

  static async changeFeedPrivacy(isPrivate: boolean, feedId: string): Promise<IFeed> {
    return HTTPClient.api
      .put(`${this.v1}${this.baseUrl}/private/${feedId}`, { isPrivate })
      .then((response) => response.data);
  }
}
