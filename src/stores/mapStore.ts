import { action, makeObservable, observable } from "mobx";
import mapService from "@/services/maps/mapService";
import settingService from "@/services/settings/settingService";
import eventService from "@/services/events/eventService";

import type { ICreateOrUpdateSettingInputDto } from "@/services/settings/dto";
import dayjs from "dayjs";

class MapStore {
  @observable maps!: any;
  @observable editMap!: any;
  @observable settings!: any;
  @observable events!: any;
  constructor() {
    makeObservable(this);
  }
  @action
  async create(createMapInput: any) {
    const result = await mapService.create(createMapInput);
    this.maps.items.push(result);
  }

  @action
  async update(id: any, updateMapInput: any) {
    updateMapInput["id"] = id;
    console.log(updateMapInput);
    const result = await mapService.update(id, updateMapInput);
    this.maps.items = this.maps.items.map((item) => {
      if (item?.id === updateMapInput?.id) item = result;
      return item;
    });
  }

  @action
  delete(id: number, userId: number) {
    const item: any = this.maps.items.find((x: any) => x.id === id);
    item.records = item.records.filter((item) => item.id !== userId);
    this.maps.items.map((value) => {
      // if (value.id === item.id)
    });
  }

  @action
  async deleteMap(id: string) {
    this.maps.items = this.maps.items.filter((item) => {
      return item.id !== id;
    });
    await mapService.delete(id);
  }

  @action
  async get(id: string) {
    let result: any;
    if (this.maps?.items) {
      result = this.maps.items.find((item) => item.id == id);
    } else {
      const res = await mapService.get(id);
      result = res.data;
    }
    console.log(result.records[0]);
    result.records = result.records.map((item) => {
      return {
        ...item,
        dob: item.dob ? dayjs(item.dob) : null,
      };
    });
    result.creationTime = dayjs(result.creationTime);
    this.editMap = result;
  }

  @action
  createMap() {
    this.editMap = {
      creatorName: "",
      clientName: "",
      numsOfMember: 1,
      objectTitle: "",
      creationTime: "",
      records: [
        {
          id: 1,
          name: "",
          dob: "",
          gender: 0,
          settings: this.settings,
          events: [],
        },
      ],
    };
  }
  @action
  async getEvents() {
    const result = await eventService.getAll();
    this.events = result;
  }

  @action
  async getAllAsync() {
    const mapRes = await mapService.getAll();
    const settingsResponse = await settingService.getAll();
    const eventsResponse = await eventService.getAll();
    this.maps = {
      totalCount: 10,
      items: mapRes,
    };
    this.settings = settingsResponse;
    this.events = eventsResponse;
  }

  @action
  async getMaps(clientName?: string, fromDate?: string) {
    const res = await mapService.getAll(clientName, fromDate);
    this.maps = {
      totalCount: 10,
      items: res,
    };
  }

  @action
  async getSettings() {
    const result = await settingService.getAll();
    this.settings = result;
  }

  @action
  async updateSettings(id: any, input: ICreateOrUpdateSettingInputDto) {
    settingService.update(id, input);
  }

  @action
  cleanUp() {
    this.editMap = null;
  }
}

export default MapStore;
