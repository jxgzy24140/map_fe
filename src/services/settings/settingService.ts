import http from "@/services/httpService";
import {
  ICreateOrUpdateSettingInputDto,
  SettingOutputDto,
} from "@/services/settings/dto";

class SettingService {
  public async get(id: any): Promise<SettingOutputDto> {
    const response = await http.post(`settings/${id}`);
    return response.data;
  }

  public async getAll(): Promise<SettingOutputDto[]> {
    const response = await http.get("settings");
    console.log("response", response);

    return response.data;
  }

  public async create(
    input: ICreateOrUpdateSettingInputDto
  ): Promise<SettingOutputDto> {
    const response = await http.post("settings", input);
    return response.data;
  }

  public async update(
    id: any,
    input: ICreateOrUpdateSettingInputDto
  ): Promise<SettingOutputDto> {
    const response = await http.put(`settings/${id}`, input);
    return response.data;
  }

  public async delete(id: any): Promise<SettingOutputDto> {
    const response = await http.delete(`settings/${id}`);
    return response.data;
  }
}

export default new SettingService();
