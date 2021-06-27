import { Inject, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import {
  deleteItem,
  documentId,
  findResult,
} from '@cahllagerfeld/nestjs-astra';
const DATASTAX_CLIENT = 'DATASTAX_CLIENT';

@Injectable()
export class AstraService {
  private collection: any;
  constructor(@Inject(DATASTAX_CLIENT) private readonly client: any) {}

  private setupClient(namespace: string, collection: string) {
    this.collection = this.client.namespace(namespace).collection(collection);
  }

  /**
   * Gets a document from a collection by its ID.
   * @param id ID of the document, that should be retrieved
   * @param namespace Namespace in Database
   * @param collection Collection-Name in Database
   * @returns
   */
  public get<T>(
    id: string,
    namespace: string,
    collection: string,
  ): Observable<T> {
    this.setupClient(namespace, collection);
    const response: Promise<T> = this.collection.get(id);
    return from(response);
  }

  /**
   * Creates a new Document
   * @param document The document that should be created
   * @param namespace Namespace in Database
   * @param collection Collection-Name in Database
   * @param id The desired ID *
   * @returns document ID of created document
   */
  public create<T>(
    document: T,
    namespace: string,
    collection: string,
    id?: string,
  ): Observable<documentId | null> {
    this.setupClient(namespace, collection);
    let promise: Promise<documentId | null>;
    if (!id) {
      promise = this.collection.create(document);
      return from(promise);
    }
    promise = this.collection.create(id, document);
    return from(promise);
  }

  /**
   * Search a collection
   * @param namespace Namespace in Database
   * @param collection Collection-Name in Database
   * @param query The query for searching the collection
   * @param options Possible searchoptions
   * @returns
   */
  public find<T>(
    namespace: string,
    collection: string,
    query?: any,
    options?: any,
  ): Observable<findResult<T> | null> {
    this.setupClient(namespace, collection);
    const promise: Promise<findResult<T> | null> = this.collection.find(
      query,
      options,
    );
    return from(promise);
  }

  /**
   * Find a single document
   * @param query The query for searching the collection
   * @param namespace Namespace in Database
   * @param collection Collection-Name in Database
   * @param options Possible searchoptions
   * @returns
   */
  public findOne<T>(
    query: any,
    namespace: string,
    collection: string,
    options?: any,
  ): Observable<T | null> {
    this.setupClient(namespace, collection);
    const promise: Promise<T | null> = this.collection.findOne(query, options);
    return from(promise);
  }

  /**
   * Partially update a existing document
   * @param path Path to document, may also be path to a subdocument
   * @param document Document with which the existing should be updated
   * @param namespace Namespace in Database
   * @param collection Collection-Name in Database
   * @returns
   */
  public update<T>(
    path: string,
    document: T,
    namespace: string,
    collection: string,
  ): Observable<documentId | null> {
    this.setupClient(namespace, collection);
    const promise: Promise<documentId | null> = this.collection.update(
      path,
      document,
    );
    return from(promise);
  }

  /**
   *
   * @param path Path to document, that should be replaced
   * @param document Document with which the specified docuent should be updated
   * @param namespace Namespace in Database
   * @param collection Collection-Name in Database
   * @returns
   */
  public replace<T>(
    path: string,
    document: T,
    namespace: string,
    collection: string,
  ): Observable<documentId | null> {
    this.setupClient(namespace, collection);
    const promise: Promise<documentId | null> = this.collection.replace(
      path,
      document,
    );
    return from(promise);
  }

  /**
   *
   * @param path Path to document, that should be deleted
   * @param namespace Namespace in Database
   * @param collection Collection-Name in Database
   * @returns
   */
  public delete(
    path: string,
    namespace: string,
    collection: string,
  ): Observable<deleteItem | null> {
    this.setupClient(namespace, collection);
    const promise: Promise<deleteItem | null> = this.collection.delete(path);
    return from(promise);
  }
}
