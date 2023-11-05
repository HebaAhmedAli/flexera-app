import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecureStorage {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }


  /**
   * Encrypt (any plainTextOrObjectData) to (encryptedText string)
   */
  public encrypt(plainTextOrObjectData : any): string {
    return CryptoJS.AES.encrypt(
      JSON.stringify(plainTextOrObjectData),
      environment.secretKeyStorage
    ).toString();
  }

  /**
   * Decrypt (encryptedText string) to (any plainTextOrObjectData)
   */
  private decrypt(encryptedText: string): unknown {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, environment.secretKeyStorage);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedText);
    } catch {
      return;
    }
  }

  /**
   * Override parent methods (get + set)
   * Decrypt returned data before get
   */
  async get(key: string): Promise<any> {
    let returnedPlainTextOrObjectData;
    const data = await this.storage.get(key);
    // data is encryptedText, so we will decrypt before return

    // decrypt ONLY when data is avaliable
    if (data) {
      returnedPlainTextOrObjectData = this.decrypt(data);
    }

    return returnedPlainTextOrObjectData;
  }

  /**
   * Encrypt value before save
   */
  async set(key: string, value: any): Promise<any> {
    // handle not encrypt null/undefined/emptyString
    let encryptedText = '';
    if (value !== null || value !== undefined) {
      encryptedText = this.encrypt(value);
    }
    return this.storage.set(key, encryptedText);
  }

  /**
   * Just override remove
   */
  async remove(key: string): Promise<any> {
    return this.storage.remove(key);
  }
}
