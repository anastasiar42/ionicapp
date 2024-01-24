import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  async set(key: string, value: any) {
    const formattedValue = {
      ...value,
      name: value.name?.official || '',
    };
    try {
      await this._storage?.set(key, JSON.stringify(formattedValue));
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }
  async get(key: string): Promise<any> {
    const storedData = await this._storage?.get(key);
    return storedData ? JSON.parse(storedData) : null;
  }
  async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }
}